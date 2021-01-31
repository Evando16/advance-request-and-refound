import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Solicitation from './pages/solicitation/solicitation';

import CustomSnackbar from './components/snackbar/snackbar';

const GlobalStyle = createGlobalStyle`
body {
  padding: 0 2vw;
  margin: 0;
  background-color: #053d4e;
  font-family: 'Nunito Sans', sans-serif;
}
`;

const AppContainer = styled.div`
  background-color: #f4f6fa;
  padding: 4vh 1vw 0 1vw;
`;

export default function App() {
  const [snackbar, setSnackbar] = useState({ open: false, message: '', type: '' });

  return (
    <>
      <GlobalStyle />
      {/* needs to be general in the application */}
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        type={snackbar.type}
        setSnackbar={setSnackbar}
      />
      <AppContainer>
        <Solicitation />
      </AppContainer>
    </>
  );
}
