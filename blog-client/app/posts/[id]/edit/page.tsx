import { notFound } from "next/navigation";
import { fetchPost } from "@/app/posts/lib/fetchPost";
import EditPostForm from "@/app/posts/components/EditPostForm";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  let post;
  try {
    post = await fetchPost(id);
  } catch (error) {
    console.error("Error fetching post:", error);
    return notFound();
  }

  return <EditPostForm post={post} />;
}
