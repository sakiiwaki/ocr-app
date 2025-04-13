# ベースイメージを指定
FROM continuumio/miniconda3:latest

# システム依存パッケージのインストール(DECIMER用にOpenGLライブラリを追加)
RUN apt-get update && apt-get install -y \
    build-essential \
    libgl1-mesa-glx \
    && rm -rf /var/lib/apt/lists/*

# 作業ディレクトリを設定
WORKDIR /usr/src/app

# Conda環境の設定
RUN conda create -n DECIMER python=3.10.0 -y
ENV PATH /opt/conda/envs/DECIMER/bin:$PATH

# Conda環境をアクティベートして、以降のコマンドで有効にする
SHELL ["conda", "run", "-n", "DECIMER", "/bin/bash", "-c"]

# TensorFlowをインストール (AVX2とFMAを有効にする)
RUN pip uninstall -y tensorflow  # 既存のTensorFlowをアンインストール
RUN pip install --no-cache-dir tensorflow==2.10.0  # バージョンを指定してインストール

# 依存関係のインストール
COPY ./app/requirements.txt .
RUN /opt/conda/envs/DECIMER/bin/pip install --no-cache-dir -r requirements.txt

# DECIMERのインストール
RUN /opt/conda/envs/DECIMER/bin/pip install decimer

# ソースコードをコピー
COPY app ./app

# 開発用サーバを起動
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]