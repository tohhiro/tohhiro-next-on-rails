FROM node:20-alpine

WORKDIR /app

# 依存関係のインストール
COPY package*.json ./
RUN npm ci

# アプリケーションのコードをコピー
COPY . .

# ポートを公開
EXPOSE 3001

# 開発サーバーを起動
CMD ["npm", "run", "dev"]
