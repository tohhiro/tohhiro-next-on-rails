import { fetchPosts } from "@/app/lib/api/fetchPosts";
import PostCard from "../PostCard";

export default async function PostList() {
  const posts = await fetchPosts();

  if (posts.length === 0) {
    return (
      <div className="text-center text-gray-500 py-12">投稿がありません</div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
