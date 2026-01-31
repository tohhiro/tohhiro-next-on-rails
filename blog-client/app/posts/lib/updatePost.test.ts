import type { Post } from "@/app/lib/types";
import { updatePost } from "./updatePost";

describe("updatePost", () => {
  const mockPost: Post = {
    id: 1,
    title: "更新後のタイトル",
    content: "更新後の内容です",
    created_at: "2026-01-12T00:00:00.000Z",
    updated_at: "2026-01-12T10:00:00.000Z",
  };

  const updateData = {
    title: "更新後のタイトル",
    content: "更新後の内容です",
  };

  // fetchのモックヘルパー関数
  const mockFetch = (response: {
    ok: boolean;
    status: number;
    text?: () => Promise<string>;
    json?: () => Promise<any>;
  }) => {
    global.fetch = vi.fn().mockResolvedValue(response);
  };

  const mockFetchError = (error: Error) => {
    global.fetch = vi.fn().mockRejectedValue(error);
  };

  beforeEach(() => {
    vi.resetAllMocks();
    // console.logをモック
    vi.spyOn(console, "log").mockImplementation(() => {});
  });

  it("投稿を正常に更新できる（数値ID）", async () => {
    mockFetch({
      ok: true,
      status: 200,
      text: async () => JSON.stringify(mockPost),
    });

    const result = await updatePost(1, updateData);

    expect(result).toEqual(mockPost);
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:3000/api/v1/posts/1",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          post: {
            title: updateData.title,
            content: updateData.content,
          },
        }),
      },
    );
  });

  it("投稿を正常に更新できる（文字列ID）", async () => {
    mockFetch({
      ok: true,
      status: 200,
      text: async () => JSON.stringify(mockPost),
    });

    const result = await updatePost("1", updateData);

    expect(result).toEqual(mockPost);
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:3000/api/v1/posts/1",
      expect.any(Object),
    );
  });

  it("タイトルのみ更新できる", async () => {
    const titleOnlyUpdate = {
      title: "新しいタイトル",
      content: "元の内容",
    };

    mockFetch({
      ok: true,
      status: 200,
      text: async () =>
        JSON.stringify({ ...mockPost, title: titleOnlyUpdate.title }),
    });

    const result = await updatePost(1, titleOnlyUpdate);

    expect(result.title).toBe("新しいタイトル");
  });

  it("内容のみ更新できる", async () => {
    const contentOnlyUpdate = {
      title: "元のタイトル",
      content: "新しい内容",
    };

    mockFetch({
      ok: true,
      status: 200,
      text: async () =>
        JSON.stringify({ ...mockPost, content: contentOnlyUpdate.content }),
    });

    const result = await updatePost(1, contentOnlyUpdate);

    expect(result.content).toBe("新しい内容");
  });

  it("404エラー時にエラーをスローする", async () => {
    mockFetch({
      ok: false,
      status: 404,
      text: async () => "Not Found",
    });

    await expect(updatePost(999, updateData)).rejects.toThrow(
      "投稿の更新に失敗しました: 404 Not Found",
    );
  });

  it("APIエラー時にエラーをスローする", async () => {
    mockFetch({
      ok: false,
      status: 500,
      text: async () => "Internal Server Error",
    });

    await expect(updatePost(1, updateData)).rejects.toThrow(
      "投稿の更新に失敗しました: 500 Internal Server Error",
    );
  });

  it("バリデーションエラー時にエラーをスローする", async () => {
    mockFetch({
      ok: false,
      status: 422,
      text: async () => "Title can't be blank",
    });

    await expect(updatePost(1, updateData)).rejects.toThrow(
      "投稿の更新に失敗しました: 422 Title can't be blank",
    );
  });

  it("ネットワークエラー時にエラーをスローする", async () => {
    mockFetchError(new Error("Network Error"));

    await expect(updatePost(1, updateData)).rejects.toThrow("Network Error");
  });

  it("空のタイトルで更新できる", async () => {
    const emptyTitleData = {
      title: "",
      content: "内容は残す",
    };

    mockFetch({
      ok: true,
      status: 200,
      text: async () => JSON.stringify({ ...mockPost, ...emptyTitleData }),
    });

    const result = await updatePost(1, emptyTitleData);

    expect(result.title).toBe("");
    expect(result.content).toBe("内容は残す");
  });

  it("長い内容で更新できる", async () => {
    const longContent = "あ".repeat(10000);
    const longContentData = {
      title: "タイトル",
      content: longContent,
    };

    mockFetch({
      ok: true,
      status: 200,
      text: async () => JSON.stringify({ ...mockPost, content: longContent }),
    });

    const result = await updatePost(1, longContentData);

    expect(result.content).toHaveLength(10000);
  });
});
