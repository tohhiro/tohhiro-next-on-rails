import { deletePost } from "./deletePost";

describe("deletePost", () => {
  // fetchのモックヘルパー関数
  const mockFetch = (response: {
    ok: boolean;
    status: number;
    text?: () => Promise<string>;
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

  it("投稿を正常に削除できる（数値ID）", async () => {
    mockFetch({
      ok: true,
      status: 204,
      text: async () => "",
    });

    await expect(deletePost(1)).resolves.toBeUndefined();

    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:3000/api/v1/posts/1",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  });

  it("投稿を正常に削除できる（文字列ID）", async () => {
    mockFetch({
      ok: true,
      status: 204,
      text: async () => "",
    });

    await expect(deletePost("123")).resolves.toBeUndefined();

    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:3000/api/v1/posts/123",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  });

  it("204 No Contentを返す", async () => {
    mockFetch({
      ok: true,
      status: 204,
      text: async () => "",
    });

    const result = await deletePost(1);

    expect(result).toBeUndefined();
  });

  it("404エラー時にエラーをスローする", async () => {
    mockFetch({
      ok: false,
      status: 404,
      text: async () => "Not Found",
    });

    await expect(deletePost(999)).rejects.toThrow(
      "投稿の削除に失敗しました: 404 Not Found",
    );
  });

  it("APIエラー時にエラーをスローする", async () => {
    mockFetch({
      ok: false,
      status: 500,
      text: async () => "Internal Server Error",
    });

    await expect(deletePost(1)).rejects.toThrow(
      "投稿の削除に失敗しました: 500 Internal Server Error",
    );
  });

  it("ネットワークエラー時にエラーをスローする", async () => {
    mockFetchError(new Error("Network Error"));

    await expect(deletePost(1)).rejects.toThrow("Network Error");
  });

  it("権限エラー時にエラーをスローする", async () => {
    mockFetch({
      ok: false,
      status: 403,
      text: async () => "Forbidden",
    });

    await expect(deletePost(1)).rejects.toThrow(
      "投稿の削除に失敗しました: 403 Forbidden",
    );
  });
});
