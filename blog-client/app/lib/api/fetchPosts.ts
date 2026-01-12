import { Post } from "@/app/lib/types";

export async function fetchPosts(): Promise<Post[]> {
  const res = await fetch("http://localhost:3000/api/v1/posts", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  return res.json();
}
