import preview from "@/.storybook/preview";
import PostCard from "../PostCard";
import { Post } from "@/app/lib/types";

// PostListはServer Componentなので、Storybook用に同等のClient Componentを作成
function MockedPostList({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return (
      <div className="text-center text-gray-500 py-12">投稿がありません</div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

const meta = preview.meta({
  component: MockedPostList,
  parameters: {
    layout: "padded",
    nextjs: {
      appDirectory: true,
    },
  },
});

const mockPosts: Post[] = [
  {
    id: 1,
    title: "Next.js 15の新機能",
    content:
      "Next.js 15がリリースされました。Promise-based paramsやServer Actionsなど、多くの新機能が追加されています。",
    created_at: "2026-01-15T10:00:00Z",
    updated_at: "2026-01-15T10:00:00Z",
  },
  {
    id: 2,
    title: "React 19リリース",
    content:
      "React 19がリリースされました。新しいhooksやパフォーマンス改善が含まれています。",
    created_at: "2026-01-14T09:00:00Z",
    updated_at: "2026-01-14T09:00:00Z",
  },
  {
    id: 3,
    title: "TypeScript 5.5の新機能",
    content:
      "TypeScript 5.5がリリースされました。型推論の改善や新しい構文が追加されています。",
    created_at: "2026-01-13T08:00:00Z",
    updated_at: "2026-01-13T08:00:00Z",
  },
];

// デフォルト表示（3件の投稿）
export const Default = meta.story({
  args: {
    posts: mockPosts,
  },
});

// 投稿が多い場合（6件）
export const ManyPosts = meta.story({
  args: {
    posts: [
      ...mockPosts,
      {
        id: 4,
        title: "Tailwind CSS v4",
        content: "Tailwind CSSの新バージョンがリリースされました。",
        created_at: "2026-01-12T07:00:00Z",
        updated_at: "2026-01-12T07:00:00Z",
      },
      {
        id: 5,
        title: "Vite 6リリース",
        content: "Viteの新バージョンが登場しました。",
        created_at: "2026-01-11T06:00:00Z",
        updated_at: "2026-01-11T06:00:00Z",
      },
      {
        id: 6,
        title: "Bun 1.2リリース",
        content: "Bunの新バージョンがリリースされました。",
        created_at: "2026-01-10T05:00:00Z",
        updated_at: "2026-01-10T05:00:00Z",
      },
    ],
  },
});

// 投稿が1件の場合
export const SinglePost = meta.story({
  args: {
    posts: [mockPosts[0]],
  },
});

// 投稿が2件の場合
export const TwoPosts = meta.story({
  args: {
    posts: mockPosts.slice(0, 2),
  },
});

// 投稿がない場合（空状態）
export const EmptyState = meta.story({
  args: {
    posts: [],
  },
});

// モバイルビュー
export const Mobile = meta.story({
  args: {
    posts: mockPosts,
  },
  decorators: [
    (Story) => (
      <div className="max-w-[375px] mx-auto">
        <Story />
      </div>
    ),
  ],
});

// タブレットビュー（2カラムグリッド）
export const Tablet = meta.story({
  args: {
    posts: mockPosts,
  },
  decorators: [
    (Story) => (
      <div className="max-w-[768px] mx-auto">
        <Story />
      </div>
    ),
  ],
});

// デスクトップビュー（3カラムグリッド）
export const Desktop = meta.story({
  args: {
    posts: mockPosts,
  },
  decorators: [
    (Story) => (
      <div className="max-w-7xl mx-auto">
        <Story />
      </div>
    ),
  ],
});

// 長いタイトルと短いタイトルの混在
export const MixedContentLength = meta.story({
  args: {
    posts: [
      {
        id: 1,
        title:
          "非常に長いタイトルのテスト：Next.js 15の新機能とReact 19の統合による開発体験の向上とパフォーマンス改善について",
        content: "短いコンテンツ",
        created_at: "2026-01-15T10:00:00Z",
        updated_at: "2026-01-15T10:00:00Z",
      },
      {
        id: 2,
        title: "短い",
        content:
          "非常に長いコンテンツのテスト。Next.js 15がついにリリースされました。このバージョンでは、Promise-based paramsやServer Actionsなど、多くの画期的な新機能が追加されています。特にApp Routerの改善が素晴らしく、パフォーマンスも大幅に向上しています。",
        created_at: "2026-01-14T09:00:00Z",
        updated_at: "2026-01-14T09:00:00Z",
      },
      mockPosts[2],
    ],
  },
});
