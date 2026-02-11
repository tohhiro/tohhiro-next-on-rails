require 'rails_helper'

RSpec.describe "Api::V1::Posts", type: :request do
  # ============================================
  # GET /api/v1/posts（一覧取得）
  # ============================================
  describe "GET /api/v1/posts" do
    context "投稿が存在する場合" do
      # let! は遅延評価せず、テスト実行前に即時実行される
      # FactoryBot の create はDBに保存する（build は保存しない）
      let!(:post1) { create(:post, title: "最初の投稿", created_at: 1.day.ago) }
      let!(:post2) { create(:post, title: "2番目の投稿", created_at: Time.current) }

      it "投稿一覧を取得できること" do
        # APIリクエストを送信
        get "/api/v1/posts"

        # ステータスコードの検証
        expect(response).to have_http_status(:ok)

        # レスポンスボディをJSONとしてパース
        json = JSON.parse(response.body)

        # 件数の検証
        expect(json.length).to eq(2)

        # 作成日時の昇順で返却されることを検証
        expect(json[0]["title"]).to eq("最初の投稿")
        expect(json[1]["title"]).to eq("2番目の投稿")
      end
    end

    context "投稿が存在しない場合" do
      it "空の配列を返すこと" do
        get "/api/v1/posts"

        expect(response).to have_http_status(:ok)

        json = JSON.parse(response.body)
        expect(json).to eq([])
      end
    end
  end

  # ============================================
  # GET /api/v1/posts/:id（単一取得）
  # ============================================
  describe "GET /api/v1/posts/:id" do
    context "投稿が存在する場合" do
      let!(:post) { create(:post, title: "テスト投稿", content: "テスト内容") }

      it "指定した投稿を取得できること" do
        get "/api/v1/posts/#{post.id}"

        expect(response).to have_http_status(:ok)

        json = JSON.parse(response.body)
        expect(json["id"]).to eq(post.id)
        expect(json["title"]).to eq("テスト投稿")
        expect(json["content"]).to eq("テスト内容")
      end
    end

    context "投稿が存在しない場合" do
      it "404エラーを返すこと" do
        get "/api/v1/posts/99999"

        expect(response).to have_http_status(:not_found)
      end
    end
  end

  # ============================================
  # POST /api/v1/posts（新規作成）
  # ============================================
  describe "POST /api/v1/posts" do
    context "有効なパラメータの場合" do
      let(:valid_params) do
        {
          post: {
            title: "新しい投稿",
            content: "新しい内容"
          }
        }
      end

      it "投稿が作成されること" do
        # DBのレコード数が1増えることを検証
        expect {
          post "/api/v1/posts", params: valid_params
        }.to change(Post, :count).by(1)

        expect(response).to have_http_status(:created)

        json = JSON.parse(response.body)
        expect(json["title"]).to eq("新しい投稿")
        expect(json["content"]).to eq("新しい内容")
      end
    end

    context "無効なパラメータの場合" do
      let(:invalid_params) do
        {
          post: {
            title: "",  # 空のタイトルは無効
            content: "内容だけ"
          }
        }
      end

      it "投稿が作成されないこと" do
        expect {
          post "/api/v1/posts", params: invalid_params
        }.not_to change(Post, :count)

        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  # ============================================
  # PATCH /api/v1/posts/:id（更新）
  # ============================================
  describe "PATCH /api/v1/posts/:id" do
    let!(:existing_post) { create(:post, title: "元のタイトル", content: "元の内容") }

    context "有効なパラメータの場合" do
      let(:update_params) do
        {
          post: {
            title: "更新後のタイトル"
          }
        }
      end

      it "投稿が更新されること" do
        patch "/api/v1/posts/#{existing_post.id}", params: update_params

        expect(response).to have_http_status(:ok)

        json = JSON.parse(response.body)
        expect(json["title"]).to eq("更新後のタイトル")
        expect(json["content"]).to eq("元の内容")  # 更新していない項目は変わらない

        # DBの値も更新されていることを確認
        existing_post.reload
        expect(existing_post.title).to eq("更新後のタイトル")
      end
    end

    context "無効なパラメータの場合" do
      let(:invalid_params) do
        {
          post: {
            title: ""  # 空のタイトルは無効
          }
        }
      end

      it "投稿が更新されないこと" do
        patch "/api/v1/posts/#{existing_post.id}", params: invalid_params

        expect(response).to have_http_status(:unprocessable_entity)

        # DBの値は変わっていないことを確認
        existing_post.reload
        expect(existing_post.title).to eq("元のタイトル")
      end
    end
  end

  # ============================================
  # DELETE /api/v1/posts/:id（削除）
  # ============================================
  describe "DELETE /api/v1/posts/:id" do
    let!(:existing_post) { create(:post) }

    it "投稿が削除されること" do
      expect {
        delete "/api/v1/posts/#{existing_post.id}"
      }.to change(Post, :count).by(-1)

      expect(response).to have_http_status(:no_content)
    end
  end
end
