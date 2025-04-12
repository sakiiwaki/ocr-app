## コマンド
```shell
#(新しい環境)アプリの作成
$ docker-compose run --rm app sh -c 'npm create vite@latest react-app-ocr -- --template react-ts'

#主に初回のコンテナ起動時、すでにあるイメージを使用してコンテナを起動する時に使用
$ docker compose up -d

#Dockerfileやcompose.ymlを編集した時に使用
$ docker compose up -d --build

#コンテナに入る時に使用 appはcompose.ymlのservicesの名前
$ docker compose exec app bash

#コンテナを修了する時に使用
$ docker compose down
```