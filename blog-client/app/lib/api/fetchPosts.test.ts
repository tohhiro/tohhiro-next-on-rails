import { describe, it, expect, beforeEach, vi } from "vitest";
import { fetchPosts } from "./fetchPosts";
import { Post } from "@/app/lib/types";

describe("fetchPosts", () => {
  const mockPosts: Post[] = [
    {
      id: 1,
      title: "テスト投稿1",
      content: "これはテストの内容です",
      created_at: "2026-01-12T00:00:00.000Z",
      updated_at: "2026-01-12T00:00:00.000Z",
    },
    {
      id: 2,
      title: "テスト投稿2",
      content: "二番目の投稿です",
      created_at: "2026-01-13T00:00:00.000Z",
      updated_at: "2026-01-13T00:00:00.000Z",
    },
  ];

  // fetchのモックヘルパー関数
  const mockFetch = (response: {
    ok: boolean;
    status?: number;
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
  });

  it("投稿一覧を正常に取得できる", async () => {
    mockFetch({
      ok: true,
      json: async () => mockPosts,
    });

    const result = await fetchPosts();

    expect(result).toEqual(mockPosts);
    expect(global.fetch).toHaveBeenCalledWith(
      "http://blog-api:3000/api/v1/posts",
      { cache: "no-store" }
    );
  });

  it("空の配列を返すことができる", async () => {
    mockFetch({
      ok: true,
      json: async () => [],
    });

    const result = await fetchPosts();

    expect(result).toEqual([]);
    expect(result).toHaveLength(0);
  });

  it("APIエラー時にエラーをスローする", async () => {
    mockFetch({
      ok: false,
      status: 500,
      text: async () => "Internal Server Error",
    });

    await expect(fetchPosts()).rejects.toThrow(
      "投稿の取得に失敗しました: 500 Internal Server Error"
    );
  });

  it("404エラー時にエラーをスローする", async () => {
    mockFetch({
      ok: false,
      status: 404,
      text: async () => "Not Found",
    });

    await expect(fetchPosts()).rejects.toThrow(
      "投稿の取得に失敗しました: 404 Not Found"
    );
  });

  it("ネットワークエラー時にエラーをスローする", async () => {
    mockFetchError(new Error("Network Error"));

    await expect(fetchPosts()).rejects.toThrow("Network Error");
  });
});
