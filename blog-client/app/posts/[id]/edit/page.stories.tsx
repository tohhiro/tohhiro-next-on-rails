import preview from "@/.storybook/preview";
import { Post } from "@/app/lib/types";
import PostForm from "@/app/posts/components/PostForm";

// EditPostPageはServer Componentなので、Storybook用にMock Componentを作成
function MockedEditPostPage({ post }: { post: Post }) {
  return <PostForm post={post} mode="edit" />;
}

const meta = preview.meta({
  component: MockedEditPostPage,
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/posts/1/edit",
      },
    },
  },
});

const samplePost: Post = {
  id: 1,
  title: "編集する投稿のタイトル",
  content:
    "これは編集モードで表示される投稿内容です。\n\nNext.jsとRailsを使ったフルスタックアプリケーションの開発について説明します。",
  created_at: "2026-01-15T10:00:00Z",
  updated_at: "2026-01-15T10:00:00Z",
};

// デフォルト
export const Default = meta.story({
  args: {
    post: samplePost,
  },
});

// 長いコンテンツの編集
export const LongContent = meta.story({
  args: {
    post: {
      ...samplePost,
      title: "詳細なチュートリアル: Next.js 15の新機能",
      content: `Next.js 15がリリースされ、多くの新機能が追加されました。

## Server Components

React Server Componentsは、サーバー側でレンダリングされるコンポーネントで、クライアントにJavaScriptを送信する必要がありません。

## Server Actions

Server Actionsは、フォームの送信やデータの更新を簡単に実装できる新しい機能です。

## Turbopack

開発環境でのビルド速度が大幅に向上しました。Webpackと比較して最大10倍高速になっています。

## Image Optimization

画像の最適化機能も改善され、自動的に適切なフォーマットとサイズに変換されます。

## まとめ

Next.js 15は、開発者体験とパフォーマンスの両面で大きな進化を遂げています。`,
    },
  },
});

// 短いコンテンツの編集
export const ShortContent = meta.story({
  args: {
    post: {
      ...samplePost,
      title: "簡単なメモ",
      content: "短い投稿内容です。",
    },
  },
});
