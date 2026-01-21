import preview from "@/.storybook/preview";
import PostsPage from "./page";

const meta = preview.meta({
  component: PostsPage,
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/posts",
      },
    },
  },
});

// 投稿一覧ページ
export const Default = meta.story({});

// 投稿一覧ページ (ローディング表示)
export const Loading = meta.story({
  parameters: {
    async beforeEach() {
      // Suspenseのfallbackを表示するため、意図的に遅延させる
      await new Promise((resolve) => setTimeout(resolve, 5000));
    },
  },
});
