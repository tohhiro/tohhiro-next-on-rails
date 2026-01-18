import { Post } from "@/app/lib/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function createPost(data: {
  title: string;
  content: string;
}): Promise<Post> {
  const url = `${API_URL}/api/v1/posts`;
  console.log("[createPost] POST", url, data);

  const res = await fetch(url, {
    method: "POST",
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
  console.log("[createPost] status:", res.status, "body:", text);

  if (!res.ok) {
    throw new Error(`投稿の作成に失敗しました: ${res.status} ${text}`);
  }

  return JSON.parse(text);
}
