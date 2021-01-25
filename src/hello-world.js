import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from '@material-ui/core';

const HelloWorldText = styled.div`
  display: flex;
  justify-content: center;
  color: red;
  font-size: 50px;
  font-weight: 600;
`;

export default function HelloWorld({ title }) {
  return (
    <HelloWorldText>
      <span>{title}</span>
      <Button variant="contained" color="primary">Material Button</Button>
    </HelloWorldText>
  );
}

HelloWorld.propTypes = {
  title: PropTypes.string.isRequired,
};
