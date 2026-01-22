import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach, beforeEach, vi } from "vitest";
import PostCard from "./index";
import * as deletePostModule from "../../lib/deletePost";

describe("PostCard", () => {
  const mockPost = {
    id: 1,
    title: "テスト投稿",
    content: "これはテストの内容です",
    created_at: "2026-01-12T00:00:00.000Z",
    updated_at: "2026-01-12T00:00:00.000Z",
  };

  beforeEach(() => {
    // deletePostをspyOnでモック
    vi.spyOn(deletePostModule, "deletePost").mockResolvedValue();
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("投稿のタイトルが表示される", () => {
    render(<PostCard post={mockPost} />);
    expect(screen.getByText("テスト投稿")).toBeInTheDocument();
  });

  it("投稿の内容が表示される", () => {
    render(<PostCard post={mockPost} />);
    expect(screen.getByText("これはテストの内容です")).toBeInTheDocument();
  });

  it("投稿の日付が表示される", () => {
    render(<PostCard post={mockPost} />);
    expect(screen.getByText("2026/1/12")).toBeInTheDocument();
  });

  it("クリック可能なリンクである", () => {
    render(<PostCard post={mockPost} />);
    const links = screen.getAllByRole("link");
    // 投稿詳細へのメインリンクを確認
    expect(links[0]).toHaveAttribute("href", "/posts/1");
    // 編集リンクも確認
    expect(links[1]).toHaveAttribute("href", "/posts/1/edit");
  });
});
