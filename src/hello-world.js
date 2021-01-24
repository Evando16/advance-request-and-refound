import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const HelloWorldText = styled.div`
  display: flex;
  justify-content: center;
  background-color: black;
  color: red;
  font-size: 50px;
  font-weight: 600;
`;

export default function HelloWorld({ title }) {
  console.log(title);
  return (
    <HelloWorldText>
      <span>{title}</span>
    </HelloWorldText>
  );
}

HelloWorld.propTypes = {
  title: PropTypes.string.isRequired,
};
