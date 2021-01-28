import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from 'react-dom';
import pretty from 'pretty';
import Timeline from './timeline';

import requestTimelineData from './timeline-service';

const timelineDataMock = [
  {
    id: 545,
    cardDate: '01/04/2020',
    cardType: 'EXPENSE',
    expenseId: 545,
    invoiceDate: '01/04/2020',
    expenseTypeId: 5,
    expenseTypeCode: 'hotel-fee',
    expenseTypeIcon: 'concierge-bell',
    currencyId: 3,
    currencyCode: 'BRL',
    currencySymbol: 'R$',
    resourceUrl:
      'https://staging-backoffice-hotmart.s3.amazonaws.com/accountability/collaborator_6393359/accountability_742/expense_545_file_615_Captura%20de%20tela%20de%202019-11-24%2010-15-50.png',
    contentType: 'image/png',
    amountSpent: 11.11,
    amountTotal: 222.22,
    notes: 'sadasd',
    status: 'PENDING',
    updatedOn: 1585069977693,
    expenseEvaluation: null,
  },
];

jest.mock('./timeline-service');
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

describe('TimelineComponent', () => {
  describe('Unit tests', () => {
    // it('should get icon to EVALUATION card', () => {
    //   expect(getCardIcon('EVALUATION')).toEqual(faUsers);
    // });

    // it('should get icon to ACCOUNTABILITY_SUBMITTED card', () => {
    //   expect(getCardIcon('ACCOUNTABILITY_SUBMITTED')).toEqual(faAsterisk);
    // });

    // it('should get icon to ACCOUNTABILITY_CREATED card', () => {
    //   expect(getCardIcon('ACCOUNTABILITY_CREATED')).toEqual(faAsterisk);
    // });

    // it('should get icon to EXPENSE card', () => {
    //   expect(getCardIcon('EXPENSE')).toEqual(faConciergeBell);
    // });

    // it('should get null icon to ivalid card type', () => {
    //   expect(getCardIcon('invalid')).toEqual(null);
    // });

    it('should render no result while requesting timeline data', async () => {
      requestTimelineData.mockImplementation(() => Promise.resolve([]));

      await act(async () => {
        render(<Timeline />, container);
      });

      expect(container.textContent).toEqual('No timeline content =(');
    });
  });

  describe('Snapshot tests', () => {
    it('should render timeline', async () => {
      requestTimelineData.mockImplementation(() => Promise.resolve(timelineDataMock));

      await act(async () => {
        render(<Timeline />, container);
      });

      expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
      "<div class=\\"MuiPaper-root MuiCard-root MuiPaper-elevation1 MuiPaper-rounded\\" style=\\"margin-top: 24px; padding: 16px;\\">
        <div><svg class=\\"MuiSvgIcon-root MuiSvgIcon-fontSizeSmall\\" focusable=\\"false\\" viewBox=\\"0 0 24 24\\" aria-hidden=\\"true\\">
            <path d=\\"M2 17h20v2H2zm11.84-9.21c.1-.24.16-.51.16-.79 0-1.1-.9-2-2-2s-2 .9-2 2c0 .28.06.55.16.79C6.25 8.6 3.27 11.93 3 16h18c-.27-4.07-3.25-7.4-7.16-8.21z\\"></path>
          </svg><span>01/04/2020</span></div>
        <div><span>TIPO</span><span>Aprovação da Solicitação Henrique Elias</span></div>
        <div><span>VALOR</span><span>11.11</span><span>222.22</span></div>
        <div><span>STATUS</span><span>PENDING</span><span>sadasd</span></div>
        <div><button class=\\"MuiButtonBase-root MuiButton-root MuiButton-text\\" tabindex=\\"0\\" type=\\"button\\"><span class=\\"MuiButton-label\\"><svg class=\\"MuiSvgIcon-root MuiSvgIcon-fontSizeSmall\\" focusable=\\"false\\" viewBox=\\"0 0 24 24\\" aria-hidden=\\"true\\"><path d=\\"M18 17H6v-2h12v2zm0-4H6v-2h12v2zm0-4H6V7h12v2zM3 22l1.5-1.5L6 22l1.5-1.5L9 22l1.5-1.5L12 22l1.5-1.5L15 22l1.5-1.5L18 22l1.5-1.5L21 22V2l-1.5 1.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2 4.5 3.5 3 2v20z\\"></path></svg>Ver nota fiscal</span><span class=\\"MuiTouchRipple-root\\"></span></button></div>
      </div>"
    `);
    });
  });
});
