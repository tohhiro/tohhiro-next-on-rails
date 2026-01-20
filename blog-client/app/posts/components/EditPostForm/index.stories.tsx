import preview from "@/.storybook/preview";
import EditPostForm from "./index";
import { Post } from "@/app/lib/types";

const meta = preview.meta({
  component: EditPostForm,
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
  title: "既存の投稿タイトル",
  content:
    "これは既存の投稿内容です。編集モードで表示されます。\n\nNext.jsとRailsを使ったフルスタックアプリケーションの開発について説明します。",
  created_at: "2026-01-15T10:00:00Z",
  updated_at: "2026-01-15T10:00:00Z",
};

// デフォルト表示
export const Default = meta.story({
  args: {
    post: samplePost,
  },
});

// 長いコンテンツ
export const WithLongContent = meta.story({
  args: {
    post: {
      ...samplePost,
      content:
        "これは非常に長い投稿内容です。\n\nNext.js 15がリリースされ、Promise-based paramsやServer Actionsなど、多くの新機能が追加されました。\n\nReact 19との統合により、Server Componentsの使い勝手がさらに向上し、データフェッチングのパターンも洗練されました。\n\nTurbopackやImage Optimizationの改善により、開発体験とプロダクション環境でのパフォーマンスが飛躍的に向上しています。\n\nさらに、App Routerの改善により、ルーティングがより直感的になり、ネストされたレイアウトの扱いも簡単になりました。\n\n特に注目すべきは、Server Actionsの安定化です。これにより、フォームの送信やデータの更新がよりシンプルに実装できるようになりました。",
    },
  },
});

// 長いタイトル
export const WithLongTitle = meta.story({
  args: {
    post: {
      ...samplePost,
      title:
        "非常に長いタイトルのテスト：Next.js 15の新機能とReact 19の統合による開発体験の向上とパフォーマンス改善についての詳細なレポート",
    },
  },
});

// 短いタイトルとコンテンツ
export const WithShortContent = meta.story({
  args: {
    post: {
      ...samplePost,
      title: "短い",
      content: "短い内容",
    },
  },
});

// 日本語のみ
export const JapaneseOnly = meta.story({
  args: {
    post: {
      ...samplePost,
      title: "日本語のタイトル",
      content:
        "これは日本語のみの投稿です。改行もテストします。\n\n2段落目です。",
    },
  },
});

// 英語のみ
export const EnglishOnly = meta.story({
  args: {
    post: {
      ...samplePost,
      title: "English Title",
      content:
        "This is an English-only post. Testing line breaks.\n\nSecond paragraph here.",
    },
  },
});

// マークダウン風のコンテンツ
export const MarkdownLikeContent = meta.story({
  args: {
    post: {
      ...samplePost,
      title: "マークダウン風コンテンツ",
      content:
        "# 見出し1\n\n## 見出し2\n\n- リスト1\n- リスト2\n- リスト3\n\n**太字のテキスト**\n\n*イタリックのテキスト*\n\n```code block```",
    },
  },
});

// 特殊文字を含むコンテンツ
export const WithSpecialCharacters = meta.story({
  args: {
    post: {
      ...samplePost,
      title: "特殊文字: <>&\"'",
      content: "特殊文字のテスト: <>&\"' 絵文字も: 🎉 📝 ✨",
    },
  },
});

// モバイルビュー
export const Mobile = meta.story({
  args: {
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

// タブレットビュー
export const Tablet = meta.story({
  args: {
    post: samplePost,
  },
  decorators: [
    (Story) => (
      <div className="max-w-[768px] mx-auto">
        <Story />
      </div>
    ),
  ],
});
