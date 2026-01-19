const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function deletePost(id: number | string): Promise<void> {
  const url = `${API_URL}/api/v1/posts/${id}`;
  console.log("[deletePost] DELETE", url);

  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log("[deletePost] status:", res.status);

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`投稿の削除に失敗しました: ${res.status} ${text}`);
  }

  // 204 No Content なので何も返さない
}
