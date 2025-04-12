import * as React from 'react';
import { useState } from 'react';
import { BsImage } from "react-icons/bs";
import { CgDanger } from "react-icons/cg";
import { MdOutlineFileUpload } from "react-icons/md";
import { Box, Icon, VStack, HStack, ZStack, Text } from "@yamada-ui/react"
import {
Dropzone,
IMAGE_ACCEPT_TYPE,
DropzoneAccept,
DropzoneReject,
DropzoneIdle,
} from "@yamada-ui/dropzone"


export default function ImagePreview() {
    // アップロードされた画像を表示する
    const [image, setImage] = useState(null);
    const handleDrop = (acceptedFiles: any[]) => {
      const file = acceptedFiles[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => setImage(reader.result); //　あとでtypesフォルダにUploadedImageのクラスを追加して型指定エラーを消す
        reader.readAsDataURL(file);
      }
    };
    
    return (

        <Dropzone accept={IMAGE_ACCEPT_TYPE} maxSize={3 * 1024 ** 2} onDropAccepted={handleDrop}>
            {/* アップロードされた画像を表示する */}
            {image ? (
                <Box as="img" src={image} alt="Uploaded Preview" sx={{ maxWidth: '100%', maxHeight: '100%' }} />
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
}