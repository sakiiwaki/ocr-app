# ベースイメージを指定
FROM node:22-slim

# 作業ディレクトリを設定
WORKDIR /usr/src/app

# package.json と package-lock.json をコピー
COPY app/react-app-ocr/package*.json ./react-app-ocr/

# 依存関係をインストール
RUN cd react-app-ocr && npm install

# アプリケーションのソースコードをコピー
COPY app/react-app-ocr ./react-app-ocr

# 開発用サーバを起動
CMD cd react-app-ocr && npm run dev -- --host