import preview from "@/.storybook/preview";
import PostCard from "./index";
import { Post } from "@/app/lib/types";

const meta = preview.meta({
  component: PostCard,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
});

const basePost: Post = {
  id: 1,
  title: "Next.js 15の新機能",
  content:
    "Next.js 15がリリースされました。Promise-based paramsやServer Actionsなど、多くの新機能が追加されています。特にApp Routerの改善が素晴らしく、パフォーマンスも大幅に向上しています。",
  created_at: "2026-01-15T10:00:00Z",
  updated_at: "2026-01-15T10:00:00Z",
};

// 基本表示
export const Default = meta.story({
  args: {
    post: basePost,
  },
});

// 長いタイトル
export const LongTitle = meta.story({
  args: {
    post: {
      ...basePost,
      title:
        "Next.js 15の新機能とReact 19の統合による開発体験の向上とパフォーマンス改善についての詳細なレポート",
    },
  },
});

// 長いコンテンツ
export const LongContent = meta.story({
  args: {
    post: {
      ...basePost,
      content:
        "Next.js 15がついにリリースされました。このバージョンでは、Promise-based paramsやServer Actionsなど、多くの画期的な新機能が追加されています。特にApp Routerの改善が素晴らしく、パフォーマンスも大幅に向上しています。React 19との統合により、Server Componentsの使い勝手がさらに向上し、データフェッチングのパターンも洗練されました。さらに、TurbopackやImage Optimizationの改善により、開発体験とプロダクション環境でのパフォーマンスが飛躍的に向上しています。",
    },
  },
});

// 短いコンテンツ
export const ShortContent = meta.story({
  args: {
    post: {
      ...basePost,
      title: "Hello World",
      content: "短い投稿です。",
    },
  },
});

// 古い投稿
export const OldPost = meta.story({
  args: {
    post: {
      ...basePost,
      created_at: "2020-01-01T00:00:00Z",
      updated_at: "2020-01-01T00:00:00Z",
    },
  },
});

// 最近の投稿
export const RecentPost = meta.story({
  args: {
    post: {
      ...basePost,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  },
});
