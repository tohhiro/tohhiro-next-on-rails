.PHONY: help rubocop rubocop-fix test shell up down build

help: ## このヘルプを表示
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

rubocop: ## RuboCopでコードチェック
	docker compose run --rm blog-api bin/rubocop

rubocop-fix: ## RuboCopで自動修正
	docker compose run --rm blog-api bin/rubocop -a

test: ## RSpecでテスト実行（未実装）
	docker compose run --rm blog-api bundle exec rspec

shell: ## Railsコンソールを起動
	docker compose run --rm blog-api bin/rails console

up: ## コンテナを起動
	docker compose up -d

down: ## コンテナを停止
	docker compose down

build: ## Dockerイメージを再ビルド
	docker compose build blog-api
