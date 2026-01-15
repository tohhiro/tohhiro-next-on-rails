import { fetchPost } from "@/app/posts/lib/fetchPost";
import { Post } from "@/app/lib/types";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let post: Post | null = null;
  try {
    post = await fetchPost(id);
  } catch (e) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 戻るボタン */}
        <Link
          href="/posts"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          投稿一覧に戻る
        </Link>

        {/* 記事カード */}
        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* ヘッダー部分 */}
          <div className="px-8 pt-10 pb-6 border-b border-gray-200">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center text-sm text-gray-600">
              <time className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {new Date(post.created_at).toLocaleDateString("ja-JP", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span className="mx-3">•</span>
              <span>ID: {post.id}</span>
            </div>
          </div>

          {/* コンテンツ部分 */}
          <div className="px-8 py-10">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {post.content}
              </p>
            </div>
          </div>

          {/* フッター部分 */}
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>
                最終更新:{" "}
                {new Date(post.updated_at).toLocaleDateString("ja-JP", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
