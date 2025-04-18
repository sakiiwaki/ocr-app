import * as React from "react";
import {
  Box,
  Flex,
  IconButton,
  Text,
  useColorModeValue,
} from "@yamada-ui/react";
import { FaBars } from "react-icons/fa";

export default function MenuAppBar() {
  return (
    <Box bg={useColorModeValue("blue.500", "blue.800")} p="1">
      {/* アプリバー */}
      <Flex align="center" justify="space-between" p="4" borderRadius="md">
        {/* メニューボタン */}
        <IconButton
          aria-label="menu"
          icon={<FaBars />}
          size="lg"
          colorScheme="whiteAlpha"
        />

        {/* タイトル */}
        <Text fontSize="xl" fontWeight="bold" color="white">
          読み取るさん
        </Text>
      </Flex>
    </Box>
  );
}
