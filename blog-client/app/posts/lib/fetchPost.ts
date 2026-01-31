import type { Post } from "@/app/lib/types";

const API_URL = process.env.API_URL || "http://blog-api:3000";

export async function fetchPost(id: number | string): Promise<Post> {
  const url = `${API_URL}/api/v1/posts/${id}`;
  console.log("[fetchPost] GET", url);
  const res = await fetch(url);
  const text = await res.text();
  console.log("[fetchPost] status:", res.status, "body:", text);
  if (!res.ok) {
    throw new Error(`投稿の取得に失敗しました: ${res.status} ${text}`);
  }
  return JSON.parse(text);
}
