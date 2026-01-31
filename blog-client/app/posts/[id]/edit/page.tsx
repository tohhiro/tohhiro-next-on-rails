import { notFound } from "next/navigation";
import type { Post } from "@/app/lib/types";
import PostForm from "@/app/posts/components/PostForm";
import { fetchPost } from "@/app/posts/lib/fetchPost";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let post: Post;
  try {
    post = await fetchPost(id);
  } catch (error) {
    console.error("Error fetching post:", error);
    return notFound();
  }

  return <PostForm post={post} mode="edit" />;
}
