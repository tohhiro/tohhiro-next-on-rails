import { notFound } from "next/navigation";
import { fetchPost } from "@/app/posts/lib/fetchPost";
import PostForm from "@/app/posts/components/PostForm";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let post;
  try {
    post = await fetchPost(id);
  } catch (error) {
    console.error("Error fetching post:", error);
    return notFound();
  }

  return <PostForm post={post} mode="edit" />;
}
