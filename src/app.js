import React, { useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import Solicitation from './pages/solicitation/solicitation';

import CustomSnackbar from './components/snackbar/snackbar';

const GlobalStyle = createGlobalStyle`
body {
  padding: 2vh 4vw 0 4vw;
  background-color: #053d4e;
  font-family: 'Nunito Sans', sans-serif;
}
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
      <Solicitation />
    </>
  );
}
