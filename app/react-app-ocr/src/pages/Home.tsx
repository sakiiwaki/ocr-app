import React, { useState } from 'react';

import MenuAppBar from '../components/menuAppBar';
import ImagePreview from '../features/imagePreview';
import { Container,Text, Card, VStack } from "@yamada-ui/react"
import { Button } from "@yamada-ui/react"
import { convertImage } from '../api/convertImage';

const Home: React.FC = () => {
  const [image, setImage] = useState<string | null>(null); // 画像の状態を管理

  
  // convertImage API の呼び出し
  const callConvertImageApi = async () => {
    if (image) {
      try {
        console.log('API CALL!');
        const formData = new FormData();
        formData.append('image', dataURLtoBlob(image), 'image.png'); // 画像データをFormDataに追加
        const result = await convertImage(formData);
        console.log('API result:', result);
      } catch (error) {
        console.error('APIエラー:', error);
      }
    } else {
      console.warn('画像が選択されていません。');
    }
  };

  // Data URLをBlobオブジェクトに変換する関数
  const dataURLtoBlob = (dataurl: string) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1] || '';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  return (
    <>
     {/* ヘッダーの表示 */}
      <MenuAppBar/>

      {/* 画像コンポーネントのインポートと表示 */}
      <Container centerContent>
        <VStack>
          <Card  maxW="md">
            <Text>aaa</Text>
            <ImagePreview setImage={setImage}/>
          </Card>
        </VStack>
      </Container>

      {/* 変換ボタンの表示 */}
      <Container centerContent>
        <Button colorScheme="emerald" onClick={callConvertImageApi}>変換</Button>
      </Container>
    </>
  );
};

export default Home;