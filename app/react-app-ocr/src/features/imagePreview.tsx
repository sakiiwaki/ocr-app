import React, { useState } from 'react';

import { BsImage } from "react-icons/bs";
import { CgDanger } from "react-icons/cg";
import { MdOutlineFileUpload } from "react-icons/md";
import { Box, Icon, VStack, HStack, Text } from "@yamada-ui/react"
import {
Dropzone,
IMAGE_ACCEPT_TYPE,
DropzoneAccept,
DropzoneReject,
DropzoneIdle,
} from "@yamada-ui/dropzone"

type ImagePreviewProps = {
  setImage: (image: string | null) => void; // Home.tsxから渡される状態変更関数
};

const ImagePreview: React.FC<ImagePreviewProps> = ({ setImage }) => {
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    // アップロードされた画像を表示する
    const handleDrop = (acceptedFiles: any[]) => {
      const file = acceptedFiles[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          setImage(result); // 送信用画像のstateを更新
          setPreviewImage(result); // プレビュー用のstateを更新
      }
        reader.readAsDataURL(file);
      }
    };
    
    return (

        <Dropzone accept={IMAGE_ACCEPT_TYPE} maxSize={3 * 1024 ** 2} onDropAccepted={handleDrop}>
            {/* アップロードされた画像を表示する(Max 3MB) */}
            {previewImage ? (
                <Box as="img" src={previewImage} alt="Uploaded Preview" sx={{ maxWidth: '100%', maxHeight: '100%' }} />
            ) : (
            <HStack color={["blackAlpha.500", "whiteAlpha.500"]}>
                {/* icon */}
                <DropzoneAccept>
                <Icon as={MdOutlineFileUpload} fontSize="6xl"  color="success" />
                </DropzoneAccept>
                <DropzoneReject>
                <Icon as={CgDanger} fontSize="6xl" color="danger"/>
                </DropzoneReject>
                <DropzoneIdle>
                <Icon as={BsImage} fontSize="6xl"/>
                </DropzoneIdle>

                {/* message */}
                <VStack gap="2xs">
                <Text fontSize="xl">Drag images here or click to select files</Text>
                <Text fontSize="sm">
                    Attach as many files as you like, each file should not exceed 3mb
                </Text>
                </VStack>
            </HStack>
            )}
        </Dropzone>
  );
};

export default ImagePreview;