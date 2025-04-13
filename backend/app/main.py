from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import tempfile
from DECIMER import predict_SMILES
import os

app = FastAPI()

# CORS設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/convert")
async def convert_image(image: UploadFile = File(...)):
    try:
        # 一時ファイルに画像を保存
        with tempfile.NamedTemporaryFile(delete=False, suffix=".png") as tmp:
            content = await image.read()
            tmp.write(content)
            tmp_path = tmp.name

        # SMILES変換処理
        SMILES = predict_SMILES(tmp_path)
        print(f"🎉 Decoded SMILES: {SMILES}")
        
        # 一時ファイルの削除
        os.unlink(tmp_path)

        return {"smiles": SMILES}
    except Exception as e:
        return {"error": str(e)}
