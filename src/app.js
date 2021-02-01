import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Solicitation from './pages/solicitation/solicitation';

const GlobalStyle = createGlobalStyle`
body {
  padding: 0 2.5rem;
  margin: 0;
  background-color: #053d4e;
  font-family: 'Nunito Sans', sans-serif;

  @media screen and (max-width: 959px) {
    padding: 0 1.5rem;
  }
}
`;

const AppContainer = styled.div`
  background-color: #f4f6fa;
  padding: 1.5rem;
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
