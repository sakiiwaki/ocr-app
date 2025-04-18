import axios from "axios";

const API_URL = "http://localhost:8000/convert"; // FastAPIのエンドポイント

export const convertImage = async (image: string) => {
  try {
    const formData = new FormData();
    formData.append("image", dataURLtoBlob(image), "image.png");
    const response = await axios.post(API_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message || error;
  }
};

// Data URLをBlobオブジェクトに変換する関数
const dataURLtoBlob = (dataurl: string) => {
  const arr = dataurl.split(",");
  const mime = arr[0].match(/:(.*?);/)?.[1] || "";
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};
