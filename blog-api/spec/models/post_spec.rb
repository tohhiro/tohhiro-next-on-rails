require 'rails_helper'

RSpec.describe Post, type: :model do
  it "有効なファクトリを持つこと" do
    post = build(:post)
    expect(post).to be_valid
  end
end
