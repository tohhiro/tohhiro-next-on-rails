import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PostForm from "./index";
import * as createPostModule from "../../lib/createPost";
import * as updatePostModule from "../../lib/updatePost";
import { Post } from "@/app/lib/types";
import mockRouter from "next-router-mock";

vi.mock("next/navigation", () => require("next-router-mock"));

// window.alertをモック
const mockAlert = vi.fn();
global.alert = mockAlert;

describe("PostForm", () => {
  const mockPost: Post = {
    id: 1,
    title: "既存の投稿",
    content: "既存の投稿内容です",
    created_at: "2026-01-12T00:00:00.000Z",
    updated_at: "2026-01-12T00:00:00.000Z",
  };

  beforeEach(() => {
    vi.spyOn(createPostModule, "createPost").mockResolvedValue({
      ...mockPost,
      id: 99,
      title: "新規投稿",
      content: "新しい内容",
    });
    vi.spyOn(updatePostModule, "updatePost").mockResolvedValue(mockPost);
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("createモード", () => {
    it("新規投稿フォームが表示される", () => {
      render(<PostForm mode="create" />);

      expect(screen.getByText("新規投稿")).toBeInTheDocument();
      expect(screen.getByLabelText("タイトル")).toBeInTheDocument();
      expect(screen.getByLabelText("本文")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "作成" })).toBeInTheDocument();
    });

    it("空のフォームが表示される", () => {
      render(<PostForm mode="create" />);

      const titleInput = screen.getByLabelText("タイトル") as HTMLInputElement;
      const contentInput = screen.getByLabelText("本文") as HTMLTextAreaElement;

      expect(titleInput.value).toBe("");
      expect(contentInput.value).toBe("");
    });

    it("タイトルと本文を入力できる", async () => {
      const user = userEvent.setup();
      render(<PostForm mode="create" />);

      const titleInput = screen.getByLabelText("タイトル");
      const contentInput = screen.getByLabelText("本文");

      await user.type(titleInput, "テストタイトル");
      await user.type(contentInput, "テスト本文");

      expect(titleInput).toHaveValue("テストタイトル");
      expect(contentInput).toHaveValue("テスト本文");
    });

    it("フォーム送信時にcreatePostが呼ばれる", async () => {
      const user = userEvent.setup();
      render(<PostForm mode="create" />);

      const titleInput = screen.getByLabelText("タイトル");
      const contentInput = screen.getByLabelText("本文");
      const submitButton = screen.getByRole("button", { name: "作成" });

      await user.type(titleInput, "新規投稿");
      await user.type(contentInput, "新しい内容");
      await user.click(submitButton);

      await waitFor(() => {
        expect(createPostModule.createPost).toHaveBeenCalledWith({
          title: "新規投稿",
          content: "新しい内容",
        });
      });
    });

    it("投稿作成成功時にアラートとリダイレクトが実行される", async () => {
      const user = userEvent.setup();
      render(<PostForm mode="create" />);

      await user.type(screen.getByLabelText("タイトル"), "新規投稿");
      await user.type(screen.getByLabelText("本文"), "新しい内容");
      await user.click(screen.getByRole("button", { name: "作成" }));

      await waitFor(() => {
        expect(mockAlert).toHaveBeenCalledWith("投稿を作成しました");
        expect(mockRouter).toMatchObject({ pathname: "/posts/99" });
      });
    });

    it("投稿中はボタンが無効化される", async () => {
      const user = userEvent.setup();
      vi.spyOn(createPostModule, "createPost").mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 100)),
      );

      render(<PostForm mode="create" />);

      await user.type(screen.getByLabelText("タイトル"), "新規投稿");
      await user.type(screen.getByLabelText("本文"), "新しい内容");

      const submitButton = screen.getByRole("button", { name: "作成" });
      await user.click(submitButton);

      expect(screen.getByRole("button", { name: "作成中..." })).toBeDisabled();
    });

    it("投稿作成失敗時にエラーアラートが表示される", async () => {
      const user = userEvent.setup();
      vi.spyOn(createPostModule, "createPost").mockRejectedValue(
        new Error("API Error"),
      );

      render(<PostForm mode="create" />);

      await user.type(screen.getByLabelText("タイトル"), "新規投稿");
      await user.type(screen.getByLabelText("本文"), "新しい内容");
      await user.click(screen.getByRole("button", { name: "作成" }));

      await waitFor(() => {
        expect(mockAlert).toHaveBeenCalledWith("投稿の作成に失敗しました");
      });
    });

    it("投稿一覧に戻るリンクが表示される", () => {
      render(<PostForm mode="create" />);

      const backLink = screen.getByText("投稿一覧に戻る");
      expect(backLink).toBeInTheDocument();
      expect(backLink.closest("a")).toHaveAttribute("href", "/posts");
    });
  });

  describe("editモード", () => {
    it("編集フォームが表示される", () => {
      render(<PostForm mode="edit" post={mockPost} />);

      expect(screen.getByText("投稿を編集")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "保存" })).toBeInTheDocument();
    });

    it("既存の投稿データが表示される", () => {
      render(<PostForm mode="edit" post={mockPost} />);

      const titleInput = screen.getByLabelText("タイトル") as HTMLInputElement;
      const contentInput = screen.getByLabelText("本文") as HTMLTextAreaElement;

      expect(titleInput.value).toBe("既存の投稿");
      expect(contentInput.value).toBe("既存の投稿内容です");
    });

    it("投稿を編集できる", async () => {
      const user = userEvent.setup();
      render(<PostForm mode="edit" post={mockPost} />);

      const titleInput = screen.getByLabelText("タイトル");
      const contentInput = screen.getByLabelText("本文");

      await user.clear(titleInput);
      await user.type(titleInput, "更新後のタイトル");
      await user.clear(contentInput);
      await user.type(contentInput, "更新後の内容");

      expect(titleInput).toHaveValue("更新後のタイトル");
      expect(contentInput).toHaveValue("更新後の内容");
    });

    it("フォーム送信時にupdatePostが呼ばれる", async () => {
      const user = userEvent.setup();
      render(<PostForm mode="edit" post={mockPost} />);

      const titleInput = screen.getByLabelText("タイトル");
      const contentInput = screen.getByLabelText("本文");

      await user.clear(titleInput);
      await user.type(titleInput, "更新後のタイトル");
      await user.clear(contentInput);
      await user.type(contentInput, "更新後の内容");
      await user.click(screen.getByRole("button", { name: "保存" }));

      await waitFor(() => {
        expect(updatePostModule.updatePost).toHaveBeenCalledWith(1, {
          title: "更新後のタイトル",
          content: "更新後の内容",
        });
      });
    });

    it("投稿更新成功時にアラートとリダイレクトが実行される", async () => {
      const user = userEvent.setup();
      render(<PostForm mode="edit" post={mockPost} />);

      await user.type(screen.getByLabelText("タイトル"), "追加");
      await user.click(screen.getByRole("button", { name: "保存" }));

      await waitFor(() => {
        expect(mockAlert).toHaveBeenCalledWith("投稿を更新しました");
        expect(mockRouter).toMatchObject({ pathname: "/posts/1" });
      });
    });

    it("更新中はボタンが無効化される", async () => {
      const user = userEvent.setup();
      vi.spyOn(updatePostModule, "updatePost").mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 100)),
      );

      render(<PostForm mode="edit" post={mockPost} />);

      await user.type(screen.getByLabelText("タイトル"), "追加");

      const submitButton = screen.getByRole("button", { name: "保存" });
      await user.click(submitButton);

      expect(screen.getByRole("button", { name: "保存中..." })).toBeDisabled();
    });

    it("投稿更新失敗時にエラーアラートが表示される", async () => {
      const user = userEvent.setup();
      vi.spyOn(updatePostModule, "updatePost").mockRejectedValue(
        new Error("API Error"),
      );

      render(<PostForm mode="edit" post={mockPost} />);

      await user.type(screen.getByLabelText("タイトル"), "追加");
      await user.click(screen.getByRole("button", { name: "保存" }));

      await waitFor(() => {
        expect(mockAlert).toHaveBeenCalledWith("投稿の更新に失敗しました");
      });
    });

    it("詳細ページに戻るリンクが表示される", () => {
      render(<PostForm mode="edit" post={mockPost} />);

      const backLink = screen.getByText("詳細ページに戻る");
      expect(backLink).toBeInTheDocument();
      expect(backLink.closest("a")).toHaveAttribute("href", "/posts/1");
    });
  });

  describe("キャンセルボタン", () => {
    it("createモード時は投稿一覧へのリンク", () => {
      render(<PostForm mode="create" />);

      const cancelButton = screen.getByText("キャンセル");
      expect(cancelButton).toHaveAttribute("href", "/posts");
    });

    it("editモード時は詳細ページへのリンク", () => {
      render(<PostForm mode="edit" post={mockPost} />);

      const cancelButton = screen.getByText("キャンセル");
      expect(cancelButton).toHaveAttribute("href", "/posts/1");
    });
  });
});
