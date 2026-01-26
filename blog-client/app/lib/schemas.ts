import { z } from "zod";

// 投稿フォーム用のZodスキーマ
export const postFormSchema = z.object({
  title: z.string().trim().min(1, "タイトルを入力してください"),
  content: z.string().trim().min(1, "本文を入力してください"),
});

export type PostFormData = z.infer<typeof postFormSchema>;
