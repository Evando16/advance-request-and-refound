import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Solicitation from './pages/solicitation/solicitation';

const GlobalStyle = createGlobalStyle`
body {
  padding: 0 40px;
  margin: 0;
  background-color: #053d4e;
  font-family: 'Nunito Sans', sans-serif;
}
`;

const AppContainer = styled.div`
  background-color: #f4f6fa;
  padding: 24px;
`;

export default function App() {
  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Solicitation />
      </AppContainer>
    </>
  );
}
