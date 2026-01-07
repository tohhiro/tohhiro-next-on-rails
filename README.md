# Blog Monorepo (Next.js + Rails API)

Next.js フロントエンドと Ruby on Rails API バックエンドを使用したブログアプリケーションのモノレポです。

## プロジェクト構成

```
tohhiro-next-on-rails/
├── blog-client/          # Next.js フロントエンド
│   ├── app/
│   ├── public/
│   ├── Dockerfile
│   └── package.json
├── blog-api/             # Rails API バックエンド
│   ├── app/
│   ├── config/
│   ├── db/
│   ├── Dockerfile
│   └── Gemfile
└── docker-compose.yml    # Docker Compose設定
```

## 技術スタック

### フロントエンド (blog-client)

- **フレームワーク**: Next.js 16 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **Linter/Formatter**: Biome
- **ポート**: 3001

### バックエンド (blog-api)

- **フレームワーク**: Ruby on Rails 7.2 (API モード)
- **言語**: Ruby 3.3.6
- **データベース**: PostgreSQL 16
- **ポート**: 3000

### インフラ

- **コンテナ**: Docker & Docker Compose
- **データベース**: PostgreSQL (Docker コンテナ)

## セットアップ

### 前提条件

- Docker
- Docker Compose

### 起動方法

1. リポジトリのルートディレクトリで以下を実行：

```bash
docker compose up --build
```

2. アプリケーションにアクセス：
   - フロントエンド: http://localhost:3001
   - バックエンド API: http://localhost:3000

### 初回起動時

初回起動時は、データベースの作成とマイグレーションが自動的に実行されます。

### データベースのリセット

```bash
docker compose run blog-api rails db:reset
```

## 開発

### フロントエンド (blog-client)

```bash
cd blog-client
npm install
npm run dev
```

### バックエンド (blog-api)

```bash
cd blog-api
bundle install
rails db:create db:migrate
rails server
```

### Docker コンテナ内で Rails コマンドを実行

```bash
# マイグレーションの作成
docker compose run blog-api rails generate migration CreatePosts

# マイグレーションの実行
docker compose run blog-api rails db:migrate

# Railsコンソール
docker compose run blog-api rails console

# モデルの作成
docker compose run blog-api rails generate model Post title:string content:text
```

## CORS 設定

バックエンドでは、フロントエンドからのリクエストを受け入れるために CORS が有効化されています：

- `http://localhost:3001`
- `http://blog-client:3001`

## 環境変数

### blog-api

- `DATABASE_HOST`: データベースホスト (デフォルト: db)
- `DATABASE_USERNAME`: データベースユーザー (デフォルト: postgres)
- `DATABASE_PASSWORD`: データベースパスワード (デフォルト: postgres)
- `RAILS_ENV`: Rails 環境 (デフォルト: development)

### blog-client

- `NEXT_PUBLIC_API_URL`: バックエンド API の URL (デフォルト: http://localhost:3000)

## テスト

バックエンドのテストは現在省略されています。後で RSpec を追加する予定です。

## ライセンス

MIT
