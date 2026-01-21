import preview from "@/.storybook/preview";
import { Post } from "@/app/lib/types";

// PostDetailPageはServer Componentなので、Storybook用にMock Componentを作成
function MockedPostDetailPage({ post }: { post: Post }) {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 戻るボタン */}
        <a
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
        </a>

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

const meta = preview.meta({
  component: MockedPostDetailPage,
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/posts/1",
      },
    },
  },
});

const samplePost: Post = {
  id: 1,
  title: "Next.js 15とRailsで構築するモダンなWebアプリケーション",
  content:
    "Next.js 15がリリースされ、多くの新機能が追加されました。\n\nReact 19との統合により、Server Componentsの使い勝手がさらに向上し、データフェッチングのパターンも洗練されました。\n\nRailsのAPIモードと組み合わせることで、強力なフルスタックアプリケーションを構築できます。",
  created_at: "2026-01-15T10:00:00Z",
  updated_at: "2026-01-15T10:00:00Z",
};

// デフォルト
export const Default = meta.story({
  args: {
    post: samplePost,
  },
});

// 短いコンテンツ
export const ShortContent = meta.story({
  args: {
    post: {
      ...samplePost,
      title: "シンプルな投稿",
      content: "これは短い投稿です。",
    },
  },
});

// 長いコンテンツ
export const LongContent = meta.story({
  args: {
    post: {
      ...samplePost,
      title: "詳細なチュートリアル: Next.js 15の新機能を徹底解説",
      content: `Next.js 15がリリースされ、多くの革新的な機能が追加されました。このチュートリアルでは、それらの機能を詳しく見ていきます。

## Server Components

React Server Componentsは、サーバー側でレンダリングされるコンポーネントで、クライアントにJavaScriptを送信する必要がありません。これにより、バンドルサイズが削減され、パフォーマンスが向上します。

## Server Actions

Server Actionsは、フォームの送信やデータの更新を簡単に実装できる新しい機能です。クライアント側のコードを書く必要がなく、サーバー側で処理を完結できます。

## Turbopack

開発環境でのビルド速度が大幅に向上しました。Webpackと比較して最大10倍高速になっています。

## Image Optimization

画像の最適化機能も改善され、自動的に適切なフォーマットとサイズに変換されます。これにより、ページの読み込み速度が向上し、ユーザー体験が向上します。

## まとめ

Next.js 15は、開発者体験とパフォーマンスの両面で大きな進化を遂げています。これらの新機能を活用することで、より高品質なWebアプリケーションを構築できます。`,
    },
  },
});

// 長いタイトル
export const LongTitle = meta.story({
  args: {
    post: {
      ...samplePost,
      title:
        "Next.js 15とReact 19、そしてRails 7.2を使用した最新のフルスタックWebアプリケーション開発: モダンな技術スタックで構築する完全ガイド",
    },
  },
});
