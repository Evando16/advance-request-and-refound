import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';

import requestHeaderData from './header-service';
import Header from './header';

jest.mock('./header-service');

const headerDataMock = {
  accountabilityExtraInfo: {
    amountOfPeople: 1,
    budgetForBreakfast: 'Não',
    eventDate: '14/05/2020',
  },
  analyst: null,
  collaborator: {
    email: 'quickops-bs@hotmart.com',
    id: 10436247,
    name: 'Quickops BS',
  },
  costCenters: [
    {
      id: 88,
      name: '01 - Sem manager',
    },
  ],
  id: 756,
  justification: 'f',
  project: {
    id: 41,
    title: 'Afiliados Brasil',
  },
  purpose: 'Confraternização',
  type: 'Reembolso',
};

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

describe('Unit tests', () => {
  it('should render loading while requesting header data', async () => {
    requestHeaderData.mockImplementation(() => Promise.resolve(null));

    await act(async () => {
      render(<Header />, container);
    });

    expect(container.textContent).toEqual('Loading...');
  });

  it('should render header', async () => {
    requestHeaderData.mockImplementation(() => Promise.resolve(headerDataMock));

    await act(async () => {
      render(<Header />, container);
    });

    expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
    "<div class=\\"MuiPaper-root MuiCard-root makeStyles-cardContainier-4 MuiPaper-elevation1 MuiPaper-rounded\\">
      <div><span>Reembolso</span><span>#756</span><span>f</span></div>
      <div class=\\"makeStyles-cardContent-5\\">
        <div>
          <div><span>Nome</span><span>Quickops BS</span></div>
          <div><span>E-mail</span><span>quickops-bs@hotmart.com</span></div>
          <div><span>Justificativa</span><span>f</span></div>
          <div><span>Finalidade</span><span>Confraternização</span></div>
          <div><span>Projeto</span><span></span></div>
          <div><span>Data</span><span>14/05/2020</span></div>
          <div><span>Quantidade</span><span>1</span></div>
          <div><span>Inclui café da manhã</span><span>Não</span></div>
        </div>
        <div>
          <div class=\\"MuiFormControl-root MuiTextField-root\\"><label class=\\"MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-filled\\" data-shrink=\\"false\\">Atribuir analista</label>
            <div class=\\"MuiInputBase-root MuiFilledInput-root MuiFilledInput-underline MuiInputBase-formControl\\"><input aria-invalid=\\"false\\" type=\\"text\\" class=\\"MuiInputBase-input MuiFilledInput-input\\" value=\\"\\"></div>
          </div>
          <div><span>Centro de Custo</span><span>01 - Sem manager</span></div>
        </div>
      </div>
    </div>"
  `);
  });
});
