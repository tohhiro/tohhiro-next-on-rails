import { createPost } from "./createPost";
import { Post } from "@/app/lib/types";

describe("createPost", () => {
  const mockPost: Post = {
    id: 1,
    title: "新規投稿",
    content: "新しい投稿の内容です",
    created_at: "2026-01-12T00:00:00.000Z",
    updated_at: "2026-01-12T00:00:00.000Z",
  };

  const createData = {
    title: "新規投稿",
    content: "新しい投稿の内容です",
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

  it("投稿を正常に作成できる", async () => {
    mockFetch({
      ok: true,
      status: 201,
      text: async () => JSON.stringify(mockPost),
    });

    const result = await createPost(createData);

    expect(result).toEqual(mockPost);
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:3000/api/v1/posts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          post: {
            title: createData.title,
            content: createData.content,
          },
        }),
      },
    );
  });

  it("タイトルと内容を正しく送信する", async () => {
    mockFetch({
      ok: true,
      status: 201,
      text: async () => JSON.stringify(mockPost),
    });

    await createPost(createData);

    const fetchCall = (global.fetch as any).mock.calls[0];
    const body = JSON.parse(fetchCall[1].body);

    expect(body.post.title).toBe("新規投稿");
    expect(body.post.content).toBe("新しい投稿の内容です");
  });

  it("APIエラー時にエラーをスローする", async () => {
    mockFetch({
      ok: false,
      status: 500,
      text: async () => "Internal Server Error",
    });

    await expect(createPost(createData)).rejects.toThrow(
      "投稿の作成に失敗しました: 500 Internal Server Error",
    );
  });

  it("バリデーションエラー時にエラーをスローする", async () => {
    mockFetch({
      ok: false,
      status: 422,
      text: async () => "Title can't be blank",
    });

    await expect(createPost(createData)).rejects.toThrow(
      "投稿の作成に失敗しました: 422 Title can't be blank",
    );
  });

  it("ネットワークエラー時にエラーをスローする", async () => {
    mockFetchError(new Error("Network Error"));

    await expect(createPost(createData)).rejects.toThrow("Network Error");
  });

  it("空のタイトルでも送信できる", async () => {
    const emptyTitleData = {
      title: "",
      content: "内容だけある投稿",
    };

    mockFetch({
      ok: true,
      status: 201,
      text: async () => JSON.stringify({ ...mockPost, ...emptyTitleData }),
    });

    const result = await createPost(emptyTitleData);

    expect(result.title).toBe("");
    expect(result.content).toBe("内容だけある投稿");
  });
});
