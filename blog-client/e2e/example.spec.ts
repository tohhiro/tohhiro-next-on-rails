import { expect, test } from "@playwright/test";

test("ホームページが表示される", async ({ page }) => {
  await page.goto("/");

  // ページタイトルを確認
  await expect(
    page.getByRole("heading", { name: "Blog Monorepo" }),
  ).toBeVisible();
});

test("投稿一覧ページに遷移できる", async ({ page }) => {
  await page.goto("/posts");

  // 投稿一覧のタイトルを確認
  await expect(
    page.getByRole("heading", { name: "ブログ投稿一覧" }),
  ).toBeVisible();
});
