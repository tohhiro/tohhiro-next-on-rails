"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { type PostFormData, postFormSchema } from "../../../lib/schemas";
import type { Post } from "../../../lib/types";
import { createPost } from "../../lib/createPost";
import { updatePost } from "../../lib/updatePost";

type PostFormProps =
  | { mode: "create"; post?: never }
  | { mode: "edit"; post: Post };

export default function PostForm({ post, mode }: PostFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PostFormData>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: post?.title || "",
      content: post?.content || "",
    },
  });

  const onSubmit = async (data: PostFormData) => {
    try {
      if (mode === "create") {
        const newPost = await createPost(data);
        alert("投稿を作成しました");
        router.push(`/posts/${newPost.id}`);
      } else {
        await updatePost(post.id, data);
        alert("投稿を更新しました");
        router.push(`/posts/${post.id}`);
      }
      router.refresh();
    } catch (error) {
      console.error(
        `Error ${mode === "create" ? "creating" : "updating"} post:`,
        error,
      );
      alert(`投稿の${mode === "create" ? "作成" : "更新"}に失敗しました`);
    }
  };

  const backLink = mode === "create" ? "/posts" : `/posts/${post?.id}`;
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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          {/* タイトル */}
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              タイトル
            </label>
            <input
              type="text"
              id="title"
              {...register("title")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="投稿のタイトルを入力"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* コンテンツ */}
          <div className="mb-6">
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              本文
            </label>
            <textarea
              id="content"
              {...register("content")}
              rows={12}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-vertical"
              placeholder="投稿の本文を入力"
            />
            {errors.content && (
              <p className="mt-1 text-sm text-red-600">
                {errors.content.message}
              </p>
            )}
          </div>

          {/* ボタン */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting
                ? mode === "create"
                  ? "作成中..."
                  : "保存中..."
                : mode === "create"
                  ? "作成"
                  : "保存"}
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
