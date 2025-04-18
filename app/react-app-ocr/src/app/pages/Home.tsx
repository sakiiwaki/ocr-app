import React, { useState, useCallback } from "react";

import MenuAppBar from "@components/MenuAppBar";
import ImagePreview from "@features/ImagePreview";
import { Container, Text, Card, VStack } from "@yamada-ui/react";
import { Button } from "@yamada-ui/react";
import { convertImage } from "@api/ConvertImage";

const Home: React.FC = () => {
  const [smiles, setsmiles] = useState<string[]>([]); // テキストのリストを管理
  const [imagePreviews, setImagePreviews] = useState<(string | null)[]>([null]);

  // 画像を設定する関数
  const handleImageSet = useCallback(
    (index: number, newImage: string | null) => {
      setImagePreviews((prev) => {
        const updated = [...prev];
        updated[index] = newImage;
        // 新しい画像がセットされた場合のみ空のプレビューを追加
        if (!updated.includes(null)) {
          updated.push(null);
        }
        return updated;
      });
    },
    []
  );

  // convertImage API の呼び出しと逐次更新
  const callConvertImageApi = async () => {
    if (imagePreviews.filter((img) => img !== null).length > 0) {
      imagePreviews.forEach(async (image, index) => {
        if (image) {
          try {
            console.log("API CALL!");
            const result = await convertImage(image);
            console.log("API result:", result);
            setsmiles((prev) => {
              const updated = [...prev];
              updated[index] = result.smiles;
              return updated;
            });
          } catch (error) {
            setsmiles((prev) => {
              const updated = [...prev];
              updated[index] = "error";
              return updated;
            });
            console.error("API error:", error);
          }
        } else {
          setsmiles((prev) => {
            const updated = [...prev];
            updated[index] = ""; // 空の場合は空文字列
            return updated;
          });
        }
      });
    } else {
      console.warn("画像が選択されていません。");
    }
  };

  return (
    <>
      {/* ヘッダー */}
      <MenuAppBar />

      {/* 画像コンポーネントのインポートと表示 */}
      <Container centerContent size="sm">
        <VStack>
          {imagePreviews.map((image, index) => (
            <Card key={index}>
              <ImagePreview
                image={image}
                setImage={(newImage) => handleImageSet(index, newImage)}
              />
              {/* SMILES表示(変換ボタン押下時) */}
              {smiles[index] && <Text>{smiles[index]}</Text>}
            </Card>
          ))}
        </VStack>
      </Container>

      {/* 変換ボタン */}
      <Container centerContent>
        <Button colorScheme="emerald" onClick={callConvertImageApi}>
          変換
        </Button>
      </Container>
    </>
  );
};

export default Home;
