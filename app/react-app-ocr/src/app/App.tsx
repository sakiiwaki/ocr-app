import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Home from '@app/pages/Home.tsx';
import { UIProvider } from "@yamada-ui/react"

const App: React.FC = () => {
  return (
    <UIProvider>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </UIProvider>
  );
};

export default App