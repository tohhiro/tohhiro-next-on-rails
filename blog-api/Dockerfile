FROM ruby:3.3.6

# 必要なパッケージをインストール
RUN apt-get update -qq && \
    apt-get install -y build-essential libpq-dev nodejs && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# 作業ディレクトリを設定
WORKDIR /app

# GemfileとGemfile.lockをコピー
COPY Gemfile Gemfile.lock ./

# bundlerをインストールしてgemをインストール
RUN gem install bundler && bundle install

# アプリケーションのコードをコピー
COPY . .

# ポートを公開
EXPOSE 3000

# サーバーを起動
CMD ["rails", "server", "-b", "0.0.0.0"]
