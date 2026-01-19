"use client";

import Link from "next/link";
import { Post } from "@/app/lib/types";
import { deletePost } from "@/app/posts/lib/deletePost";

type PostCardProps = {
  post: Post;
};

export default function PostCard({ post }: PostCardProps) {
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    // TODO: 削除機能の実装
    if (window.confirm("この投稿を削除しますか？")) {
      console.log("Delete post:", post.id);
      deletePost(post.id)
        .then(() => {
          alert("投稿を削除しました");
          // 投稿一覧ページにリダイレクト
          window.location.href = "/posts";
        })
        .catch((error) => {
          console.error("Error deleting post:", error);
          alert("投稿の削除に失敗しました");
        });
    }
  };

  return (
    <article className="border rounded-lg p-6 hover:shadow-lg transition-shadow bg-white relative">
      <Link href={`/posts/${post.id}`} className="block">
        <h2 className="text-xl font-semibold mb-2 text-gray-900">
          {post.title}
        </h2>
        <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>
        <time className="text-sm text-gray-400">
          {new Date(post.created_at).toLocaleDateString("ja-JP")}
        </time>
      </Link>

      {/* ボタンエリア */}
      <div className="mt-4 pt-4 border-t border-gray-200 flex gap-2">
        <Link
          href={`/posts/${post.id}/edit`}
          className="flex-1 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          編集
        </Link>
        <button
          onClick={handleDelete}
          className="flex-1 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          削除
        </button>
      </div>
    </article>
  );
}
