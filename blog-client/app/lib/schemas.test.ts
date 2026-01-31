import { postFormSchema } from "./schemas";

describe("postFormSchema", () => {
  describe("正常系", () => {
    it("有効なデータを受け入れる", () => {
      const validData = {
        title: "テストタイトル",
        content: "テスト本文",
      };

      const result = postFormSchema.safeParse(validData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    it("長いタイトルと本文を受け入れる", () => {
      const validData = {
        title: "あ".repeat(1000),
        content: "い".repeat(10000),
      };

      const result = postFormSchema.safeParse(validData);

      expect(result.success).toBe(true);
    });

    it("特殊文字を含むデータを受け入れる", () => {
      const validData = {
        title: "タイトル <script>alert('XSS')</script>",
        content: "本文に改行\nや特殊文字!@#$%^&*()を含む",
      };

      const result = postFormSchema.safeParse(validData);

      expect(result.success).toBe(true);
    });
  });

  describe("異常系 - title", () => {
    it("空文字列のタイトルを拒否する", () => {
      const invalidData = {
        title: "",
        content: "テスト本文",
      };

      const result = postFormSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        const titleError = result.error.issues.find(
          (issue) => issue.path[0] === "title",
        );
        expect(titleError).toBeDefined();
        expect(titleError?.message).toBe("タイトルを入力してください");
      }
    });

    it("空白のみのタイトルを拒否する", () => {
      const invalidData = {
        title: "   ",
        content: "テスト本文",
      };

      const result = postFormSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        const titleError = result.error.issues.find(
          (issue) => issue.path[0] === "title",
        );
        expect(titleError).toBeDefined();
        expect(titleError?.message).toBe("タイトルを入力してください");
      }
    });

    it("タブや改行のみのタイトルを拒否する", () => {
      const invalidData = {
        title: "\t\n  \t",
        content: "テスト本文",
      };

      const result = postFormSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
    });

    it("タイトルが欠落している場合を拒否する", () => {
      const invalidData = {
        content: "テスト本文",
      };

      const result = postFormSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        const titleError = result.error.issues.find(
          (issue) => issue.path[0] === "title",
        );
        expect(titleError).toBeDefined();
      }
    });

    it("タイトルがnullの場合を拒否する", () => {
      const invalidData = {
        title: null,
        content: "テスト本文",
      };

      const result = postFormSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
    });

    it("タイトルが数値の場合を拒否する", () => {
      const invalidData = {
        title: 123,
        content: "テスト本文",
      };

      const result = postFormSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
    });
  });

  describe("trim機能", () => {
    it("タイトルの前後の空白をトリムする", () => {
      const dataWithSpaces = {
        title: "  テストタイトル  ",
        content: "テスト本文",
      };

      const result = postFormSchema.safeParse(dataWithSpaces);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.title).toBe("テストタイトル");
      }
    });

    it("本文の前後の空白をトリムする", () => {
      const dataWithSpaces = {
        title: "テストタイトル",
        content: "  テスト本文  ",
      };

      const result = postFormSchema.safeParse(dataWithSpaces);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.content).toBe("テスト本文");
      }
    });

    it("タイトルと本文の両方の前後の空白をトリムする", () => {
      const dataWithSpaces = {
        title: "\n  テストタイトル\t  ",
        content: "  \tテスト本文\n  ",
      };

      const result = postFormSchema.safeParse(dataWithSpaces);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.title).toBe("テストタイトル");
        expect(result.data.content).toBe("テスト本文");
      }
    });

    it("文字列内の空白は保持される", () => {
      const dataWithInnerSpaces = {
        title: "  テスト   タイトル  ",
        content: "  テスト\n本文  ",
      };

      const result = postFormSchema.safeParse(dataWithInnerSpaces);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.title).toBe("テスト   タイトル");
        expect(result.data.content).toBe("テスト\n本文");
      }
    });
  });

  describe("異常系 - content", () => {
    it("空文字列の本文を拒否する", () => {
      const invalidData = {
        title: "テストタイトル",
        content: "",
      };

      const result = postFormSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        const contentError = result.error.issues.find(
          (issue) => issue.path[0] === "content",
        );
        expect(contentError).toBeDefined();
        expect(contentError?.message).toBe("本文を入力してください");
      }
    });

    it("空白のみの本文を拒否する", () => {
      const invalidData = {
        title: "テストタイトル",
        content: "   ",
      };

      const result = postFormSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        const contentError = result.error.issues.find(
          (issue) => issue.path[0] === "content",
        );
        expect(contentError).toBeDefined();
        expect(contentError?.message).toBe("本文を入力してください");
      }
    });

    it("タブや改行のみの本文を拒否する", () => {
      const invalidData = {
        title: "テストタイトル",
        content: "\n\t  \n",
      };

      const result = postFormSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
    });

    it("本文が欠落している場合を拒否する", () => {
      const invalidData = {
        title: "テストタイトル",
      };

      const result = postFormSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        const contentError = result.error.issues.find(
          (issue) => issue.path[0] === "content",
        );
        expect(contentError).toBeDefined();
      }
    });

    it("本文がnullの場合を拒否する", () => {
      const invalidData = {
        title: "テストタイトル",
        content: null,
      };

      const result = postFormSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
    });

    it("本文が数値の場合を拒否する", () => {
      const invalidData = {
        title: "テストタイトル",
        content: 456,
      };

      const result = postFormSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
    });
  });

  describe("異常系 - 複数エラー", () => {
    it("タイトルと本文の両方が空の場合、両方のエラーを返す", () => {
      const invalidData = {
        title: "",
        content: "",
      };

      const result = postFormSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(2);
        expect(result.error.issues[0].path).toEqual(["title"]);
        expect(result.error.issues[1].path).toEqual(["content"]);
      }
    });

    it("タイトルと本文の両方が欠落している場合、両方のエラーを返す", () => {
      const invalidData = {};

      const result = postFormSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(2);
      }
    });
  });

  describe("異常系 - 余分なフィールド", () => {
    it("スキーマに定義されていないフィールドは無視される", () => {
      const dataWithExtra = {
        title: "テストタイトル",
        content: "テスト本文",
        extraField: "これは無視される",
      };

      const result = postFormSchema.safeParse(dataWithExtra);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual({
          title: "テストタイトル",
          content: "テスト本文",
        });
        expect(result.data).not.toHaveProperty("extraField");
      }
    });
  });
});
