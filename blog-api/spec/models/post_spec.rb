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

    # パラメータライズドテスト: 無効な値のパターンをテスト
    context "無効な値の場合" do
      [
        { attribute: :title, value: nil, description: "nilの場合" },
        { attribute: :title, value: "   ", description: "空白文字のみの場合" },
        { attribute: :content, value: nil, description: "nilの場合" },
        { attribute: :content, value: "   ", description: "空白文字のみの場合" }
      ].each do |test_case|
        it "#{test_case[:attribute]}が#{test_case[:description]} 無効であること" do
          post = build(:post, test_case[:attribute] => test_case[:value])
          expect(post).not_to be_valid
        end
      end
    end
  end
end
