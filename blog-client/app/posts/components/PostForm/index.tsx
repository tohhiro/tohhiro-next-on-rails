"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Post } from "@/app/lib/types";
import { createPost } from "@/app/posts/lib/createPost";
import { updatePost } from "@/app/posts/lib/updatePost";

type PostFormProps = {
  post?: Post; // 編集時のみ渡される
  mode: "create" | "edit";
};

export default function PostForm({ post, mode }: PostFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (mode === "create") {
        const newPost = await createPost({ title, content });
        alert("投稿を作成しました");
        router.push(`/posts/${newPost.id}`);
      } else {
        await updatePost(post!.id, { title, content });
        alert("投稿を更新しました");
        router.push(`/posts/${post!.id}`);
      }
      router.refresh();
    } catch (error) {
      console.error(`Error ${mode === "create" ? "creating" : "updating"} post:`, error);
      alert(`投稿の${mode === "create" ? "作成" : "更新"}に失敗しました`);
    } finally {
      setSaving(false);
    }
  };

  const backLink = mode === "create" ? "/posts" : `/posts/${post!.id}`;
  const pageTitle = mode === "create" ? "新規投稿" : "投稿を編集";

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ヘッダー */}
        <div className="mb-8">
          <Link
            href={backLink}
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4 transition-colors"
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
            {mode === "create" ? "投稿一覧に戻る" : "詳細ページに戻る"}
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">{pageTitle}</h1>
        </div>

        {/* フォーム */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
          {/* タイトル */}
          <div className="mb-6">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              タイトル
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="投稿のタイトルを入力"
            />
          </div>

          {/* コンテンツ */}
          <div className="mb-6">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              本文
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={12}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-vertical"
              placeholder="投稿の本文を入力"
            />
          </div>

          {/* ボタン */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? (mode === "create" ? "作成中..." : "保存中...") : (mode === "create" ? "作成" : "保存")}
            </button>
            <Link
              href={backLink}
              className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors text-center"
            >
              キャンセル
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
