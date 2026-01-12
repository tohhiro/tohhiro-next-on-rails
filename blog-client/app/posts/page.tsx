import { Suspense } from "react";
import PostList from "./components/PostList";
import PostListSkeleton from "./components/PostListSkeleton";

export default function PostsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">ブログ投稿一覧</h1>

      <Suspense fallback={<PostListSkeleton />}>
        <PostList />
      </Suspense>
    </div>
  );
}
