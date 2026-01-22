import { describe, it, expect, beforeEach, vi } from "vitest";
import { fetchPost } from "./fetchPost";
import { Post } from "@/app/lib/types";

describe("fetchPost", () => {
  const mockPost: Post = {
    id: 1,
    title: "テスト投稿",
    content: "これはテストの内容です",
    created_at: "2026-01-12T00:00:00.000Z",
    updated_at: "2026-01-12T00:00:00.000Z",
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

  it("投稿を正常に取得できる（数値ID）", async () => {
    mockFetch({
      ok: true,
      status: 200,
      text: async () => JSON.stringify(mockPost),
    });

    const result = await fetchPost(1);

    expect(result).toEqual(mockPost);
    expect(global.fetch).toHaveBeenCalledWith(
      "http://blog-api:3000/api/v1/posts/1"
    );
  });

  it("投稿を正常に取得できる（文字列ID）", async () => {
    mockFetch({
      ok: true,
      status: 200,
      text: async () => JSON.stringify(mockPost),
    });

    const result = await fetchPost("1");

    expect(result).toEqual(mockPost);
    expect(global.fetch).toHaveBeenCalledWith(
      "http://blog-api:3000/api/v1/posts/1"
    );
  });

  it("取得した投稿のプロパティが正しい", async () => {
    mockFetch({
      ok: true,
      status: 200,
      text: async () => JSON.stringify(mockPost),
    });

    const result = await fetchPost(1);

    expect(result.id).toBe(1);
    expect(result.title).toBe("テスト投稿");
    expect(result.content).toBe("これはテストの内容です");
    expect(result.created_at).toBe("2026-01-12T00:00:00.000Z");
    expect(result.updated_at).toBe("2026-01-12T00:00:00.000Z");
  });

  it("404エラー時にエラーをスローする", async () => {
    mockFetch({
      ok: false,
      status: 404,
      text: async () => "Not Found",
    });

    await expect(fetchPost(999)).rejects.toThrow(
      "投稿の取得に失敗しました: 404 Not Found"
    );
  });

  it("APIエラー時にエラーをスローする", async () => {
    mockFetch({
      ok: false,
      status: 500,
      text: async () => "Internal Server Error",
    });

    await expect(fetchPost(1)).rejects.toThrow(
      "投稿の取得に失敗しました: 500 Internal Server Error"
    );
  });

  it("ネットワークエラー時にエラーをスローする", async () => {
    mockFetchError(new Error("Network Error"));

    await expect(fetchPost(1)).rejects.toThrow("Network Error");
  });

  it("不正なJSON時にエラーをスローする", async () => {
    mockFetch({
      ok: true,
      status: 200,
      text: async () => "Invalid JSON",
    });

    await expect(fetchPost(1)).rejects.toThrow();
  });

  it("大きなIDでも取得できる", async () => {
    const largeIdPost = { ...mockPost, id: 999999 };

    mockFetch({
      ok: true,
      status: 200,
      text: async () => JSON.stringify(largeIdPost),
    });

    const result = await fetchPost(999999);

    expect(result.id).toBe(999999);
    expect(global.fetch).toHaveBeenCalledWith(
      "http://blog-api:3000/api/v1/posts/999999"
    );
  });
});
