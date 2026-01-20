import preview from "@/.storybook/preview";
import PostListSkeleton from "./index";

const meta = preview.meta({
  component: PostListSkeleton,
  parameters: {
    layout: "padded",
  },
});

// デフォルト表示（6枚のスケルトンカード）
export const Default = meta.story({});

// グリッドレイアウトの確認
export const GridLayout = meta.story({
  decorators: [
    (Story) => (
      <div className="max-w-7xl mx-auto">
        <Story />
      </div>
    ),
  ],
});

// モバイルビュー
export const Mobile = meta.story({
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
  decorators: [
    (Story) => (
      <div className="max-w-[768px] mx-auto">
        <Story />
      </div>
    ),
  ],
});

// デスクトップビュー
export const Desktop = meta.story({
  decorators: [
    (Story) => (
      <div className="max-w-7xl mx-auto">
        <Story />
      </div>
    ),
  ],
});
