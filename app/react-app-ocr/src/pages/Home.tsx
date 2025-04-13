import React, { useState, useCallback } from 'react';

import MenuAppBar from '../components/menuAppBar';
import ImagePreview from '../features/imagePreview';
import { Container,Text, Card, VStack } from "@yamada-ui/react"
import { Button } from "@yamada-ui/react"
import { convertImage } from '../api/convertImage';

const Home: React.FC = () => {
  const [texts, setTexts] = useState<string[]>([]); // テキストのリストを管理
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleImageSet = useCallback((newImage: string) => {
      setImagePreviews((prevImagePreviews) => [...prevImagePreviews, newImage]);
  }, [imagePreviews]);
  
  // convertImage API の呼び出し
  const callConvertImageApi = async () => {
    if (imagePreviews.length > 0) {
      try {
        console.log('API CALL!');
        const newTexts: string[] = []; // テキストのリストを初期化
        // 画像を1つずつAPIに送信
        for (const image of imagePreviews) {
            const result = await convertImage(image);
            console.log('API result:', result);
            newTexts.push(result.smiles); // APIの結果をリストに追加
        }
        setTexts(newTexts); // テキストのリストを更新
      } catch (error) {
        console.error('APIエラー:', error);
      }
    } else {
      console.warn('画像が選択されていません。');
    }
  };

    // 画像リストを更新する関数
  //   const handleImagesChange = (newImages: string[]) => {
  //     setImages(newImages);
  //     setTexts([]); // 画像が更新されたらテキストをクリア
  // };

  // const addImage = () => {
  //   setImages([...images, `Image ${images.length + 1}`]);
  // };

    // 画像リストに新しい画像を追加
  //   const handleAddImage = (newImage: string) => {
  //     setImages((prevImages) => [...prevImages, newImage]);
  // };

  return (
    <>
     {/* ヘッダーの表示 */}
      <MenuAppBar/>

      {/* 画像コンポーネントのインポートと表示 */}
      <Container centerContent>
        <VStack>
          <Card  maxW="md">
            <Text>aaa</Text>
            <ImagePreview setImage={handleImageSet}/>
          </Card>

          {/* 追加画像のインポートと表示 */}
          {imagePreviews.map((index) => (
            <Card key={index} maxW="md">
            <Text>kako</Text>
              <ImagePreview key={index} setImage={handleImageSet} />
            </Card>
          ))}
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