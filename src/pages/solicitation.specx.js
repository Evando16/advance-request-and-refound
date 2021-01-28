import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from 'react-dom';
import pretty from 'pretty';
import Solicitation from './solicitation';

// "LEAK" PROBLEM TO TEST THIS COMPONENT
// check about mock childrenComponents

describe('SolicitationPage', () => {
  let container = null;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.append(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  describe('Snapshot tests', () => {
    it('should render solicitation page', async () => {
      await act(async () => {
        render(<Solicitation setSnackbar={() => { }} />, container);
      });

      expect(pretty(container.innerHTML)).toMatchInlineSnapshot(
        '"Loading...<button class=\\"MuiButtonBase-root MuiButton-root MuiButton-outlined\\" tabindex=\\"0\\" type=\\"button\\"><span class=\\"MuiButton-label\\"><svg class=\\"MuiSvgIcon-root MuiSvgIcon-fontSizeSmall\\" focusable=\\"false\\" viewBox=\\"0 0 24 24\\" aria-hidden=\\"true\\"><path d=\\"M18 17H6v-2h12v2zm0-4H6v-2h12v2zm0-4H6V7h12v2zM3 22l1.5-1.5L6 22l1.5-1.5L9 22l1.5-1.5L12 22l1.5-1.5L15 22l1.5-1.5L18 22l1.5-1.5L21 22V2l-1.5 1.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2 4.5 3.5 3 2v20z\\"></path></svg>Adicionar Despesa</span><span class=\\"MuiTouchRipple-root\\"></span></button>No timeline content =("',
      );
    });
  });
});
