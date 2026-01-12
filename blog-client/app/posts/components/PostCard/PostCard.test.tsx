import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import PostCard from "./index";

describe("PostCard", () => {
  const mockPost = {
    id: 1,
    title: "テスト投稿",
    content: "これはテストの内容です",
    created_at: "2026-01-12T00:00:00.000Z",
    updated_at: "2026-01-12T00:00:00.000Z",
  };

  afterEach(() => {
    cleanup();
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
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/posts/1");
  });
});
