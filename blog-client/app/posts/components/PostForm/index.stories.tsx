import preview from "@/.storybook/preview";
import PostForm from "./index";
import { Post } from "@/app/lib/types";

const meta = preview.meta({
  component: PostForm,
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/posts/new",
      },
    },
  },
});

const samplePost: Post = {
  id: 1,
  title: "既存の投稿タイトル",
  content:
    "これは既存の投稿内容です。編集モードで表示されます。\n\nNext.jsとRailsを使ったフルスタックアプリケーションの開発について説明します。",
  created_at: "2026-01-15T10:00:00Z",
  updated_at: "2026-01-15T10:00:00Z",
};

// 新規作成モード
export const CreateMode = meta.story({
  args: {
    mode: "create",
  },
});

// 編集モード
export const EditMode = meta.story({
  args: {
    mode: "edit",
    post: samplePost,
  },
});

// 編集モード - 長いコンテンツ
export const EditModeWithLongContent = meta.story({
  args: {
    mode: "edit",
    post: {
      ...samplePost,
      content:
        "これは非常に長い投稿内容です。\n\nNext.js 15がリリースされ、Promise-based paramsやServer Actionsなど、多くの新機能が追加されました。\n\nReact 19との統合により、Server Componentsの使い勝手がさらに向上し、データフェッチングのパターンも洗練されました。\n\nTurbopackやImage Optimizationの改善により、開発体験とプロダクション環境でのパフォーマンスが飛躍的に向上しています。\n\nさらに、App Routerの改善により、ルーティングがより直感的になり、ネストされたレイアウトの扱いも簡単になりました。\n\n特に注目すべきは、Server Actionsの安定化です。これにより、フォームの送信やデータの更新がよりシンプルに実装できるようになりました。",
    },
  },
});

// 編集モード - 短いタイトルとコンテンツ
export const EditModeWithShortContent = meta.story({
  args: {
    mode: "edit",
    post: {
      ...samplePost,
      title: "短い",
      content: "短い内容",
    },
  },
});

// 新規作成モード - 部分的に入力済み（バリデーションテスト用）
export const CreateModeWithPartialInput = meta.story({
  args: {
    mode: "create",
  },
  play: async ({ canvasElement }) => {
    // ストーリーでインタラクションをシミュレートする場合はここに記述
    // 例: ユーザーが入力を始めた状態をシミュレート
  },
});

// 保存中の状態（インタラクティブテスト用）
export const SavingState = meta.story({
  args: {
    mode: "edit",
    post: samplePost,
  },
  // 実際の保存状態をシミュレートするには、コンポーネントにmock機能が必要
});

// モバイルビュー - 新規作成
export const CreateModeOnMobile = meta.story({
  args: {
    mode: "create",
  },
  decorators: [
    (Story) => (
      <div className="max-w-[375px] mx-auto">
        <Story />
      </div>
    ),
  ],
});

// モバイルビュー - 編集
export const EditModeOnMobile = meta.story({
  args: {
    mode: "edit",
    post: samplePost,
  },
  decorators: [
    (Story) => (
      <div className="max-w-[375px] mx-auto">
        <Story />
      </div>
    ),
  ],
});
