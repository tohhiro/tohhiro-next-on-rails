require 'rails_helper'

RSpec.describe Post, type: :model do
  it "有効なファクトリを持つこと" do
    post = build(:post)
    expect(post).to be_valid
  end

  describe "バリデーション" do
    # NOTE: このテストは冗長（上の「有効なファクトリを持つこと」と重複）だが、
    # 正常系テストの書き方を学習するために残している。
    # 実際のプロジェクトでは、異常系（エラーケース）のテストに集中し、
    # 正常系は最初のファクトリテストで十分カバーされる。
    it "titleがあれば有効であること" do
      post = build(:post, title: "テストタイトル")
      expect(post).to be_valid
    end

    it "titleがなければ無効であること" do
      post = build(:post, title: nil)
      expect(post).not_to be_valid
    end

    it "contentがなければ無効であること" do
      post = build(:post, content: nil)
      expect(post).not_to be_valid
    end
  end
end
