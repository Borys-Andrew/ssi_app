import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import { Container } from '@mui/material';

const Layout: React.FC = () => {
  return (
    <div>
      <Header />
      <main>
        <Container>
          <Outlet />
        </Container>
      </main>
    </div>
  );
};

export default Layout;
