import React from 'react';

import MenuAppBar from '../components/menuAppBar';
import ImagePreview from '../features/imagePreview';
import { Container } from "@yamada-ui/react"

const Home: React.FC = () => {
  return (
    <>
      <MenuAppBar/>

      <Container centerContent>
        <ImagePreview/>
      </Container>
    </>
  );
};

export default Home;