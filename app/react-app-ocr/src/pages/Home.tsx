import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Card,
  CardContent,
  TextField,
  Box,
} from '@mui/material';

const Home: React.FC = () => {
  return (
    <>
      {/* ヘッダー */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            読み取るさん
          </Typography>
        </Toolbar>
      </AppBar>

      {/* メインコンテンツ */}
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="body1">
              画像→化学構造式の変換アプリ
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default Home;