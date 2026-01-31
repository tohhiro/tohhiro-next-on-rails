import type { Post } from "@/app/lib/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function updatePost(
  id: number | string,
  data: { title: string; content: string },
): Promise<Post> {
  const url = `${API_URL}/api/v1/posts/${id}`;
  console.log("[updatePost] PATCH", url, data);

  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      post: {
        title: data.title,
        content: data.content,
      },
    }),
  });

  const text = await res.text();
  console.log("[updatePost] status:", res.status, "body:", text);

  if (!res.ok) {
    throw new Error(`投稿の更新に失敗しました: ${res.status} ${text}`);
  }

  return JSON.parse(text);
}
