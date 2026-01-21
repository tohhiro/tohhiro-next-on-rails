import preview from "@/.storybook/preview";
import NewPostPage from "./page";

const meta = preview.meta({
  component: NewPostPage,
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

// 新規投稿ページ
export const Default = meta.story({});
