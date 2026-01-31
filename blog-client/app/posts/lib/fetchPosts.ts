import type { Post } from "@/app/lib/types";

const API_URL = process.env.API_URL || "http://blog-api:3000";

export async function fetchPosts(): Promise<Post[]> {
  // サーバーサイドで実行されるのでAPI_URLを使用
  const res = await fetch(`${API_URL}/api/v1/posts`, {
    cache: "no-store",
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("API Error:", res.status, errorText);
    throw new Error(`投稿の取得に失敗しました: ${res.status} ${errorText}`);
  }

  return res.json();
}
