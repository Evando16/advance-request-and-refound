import React from 'react';
import { faUsers, faAsterisk, faConciergeBell } from '@fortawesome/free-solid-svg-icons';
import { act } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from 'react-dom';
import pretty from 'pretty';
import Timeline, { getCardIcon } from './timeline';

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

describe('Unit tests', () => {
  it('should get icon to EVALUATION card', () => {
    expect(getCardIcon('EVALUATION')).toEqual(faUsers);
  });

  it('should get icon to ACCOUNTABILITY_SUBMITTED card', () => {
    expect(getCardIcon('ACCOUNTABILITY_SUBMITTED')).toEqual(faAsterisk);
  });

  it('should get icon to ACCOUNTABILITY_CREATED card', () => {
    expect(getCardIcon('ACCOUNTABILITY_CREATED')).toEqual(faAsterisk);
  });

  it('should get icon to EXPENSE card', () => {
    expect(getCardIcon('EXPENSE')).toEqual(faConciergeBell);
  });

  it('should get null icon to ivalid card type', () => {
    expect(getCardIcon('invalid')).toEqual(null);
  });

  it('should render no result while requesting timeline data', async () => {
    requestTimelineData.mockImplementation(() => Promise.resolve([]));

    await act(async () => {
      render(<Timeline />, container);
    });

    expect(container.textContent).toEqual('No timeline content =(');
  });

  it('should render timeline', async () => {
    requestTimelineData.mockImplementation(() => Promise.resolve(timelineDataMock));

    await act(async () => {
      render(<Timeline />, container);
    });

    expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
      "<div class=\\"MuiPaper-root MuiCard-root MuiPaper-elevation1 MuiPaper-rounded\\" style=\\"margin-top: 24px; padding: 16px;\\">
        <div><svg aria-hidden=\\"true\\" focusable=\\"false\\" data-prefix=\\"fas\\" data-icon=\\"concierge-bell\\" class=\\"svg-inline--fa fa-concierge-bell fa-w-16 \\" role=\\"img\\" xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 512 512\\">
            <path fill=\\"currentColor\\" d=\\"M288 130.54V112h16c8.84 0 16-7.16 16-16V80c0-8.84-7.16-16-16-16h-96c-8.84 0-16 7.16-16 16v16c0 8.84 7.16 16 16 16h16v18.54C115.49 146.11 32 239.18 32 352h448c0-112.82-83.49-205.89-192-221.46zM496 384H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h480c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z\\"></path>
          </svg><span>01/04/2020</span></div>
        <div><span>TIPO</span><span>Aprovação da Solicitação Henrique Elias</span></div>
        <div><span>VALOR</span><span>11.11</span><span>222.22</span></div>
        <div><span>STATUS</span><span>PENDING</span><span>sadasd</span></div>
        <div><button class=\\"MuiButtonBase-root MuiButton-root MuiButton-text\\" tabindex=\\"0\\" type=\\"button\\"><span class=\\"MuiButton-label\\"><svg aria-hidden=\\"true\\" focusable=\\"false\\" data-prefix=\\"fas\\" data-icon=\\"receipt\\" class=\\"svg-inline--fa fa-receipt fa-w-12 \\" role=\\"img\\" xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 384 512\\"><path fill=\\"currentColor\\" d=\\"M358.4 3.2L320 48 265.6 3.2a15.9 15.9 0 0 0-19.2 0L192 48 137.6 3.2a15.9 15.9 0 0 0-19.2 0L64 48 25.6 3.2C15-4.7 0 2.8 0 16v480c0 13.2 15 20.7 25.6 12.8L64 464l54.4 44.8a15.9 15.9 0 0 0 19.2 0L192 464l54.4 44.8a15.9 15.9 0 0 0 19.2 0L320 464l38.4 44.8c10.5 7.9 25.6.4 25.6-12.8V16c0-13.2-15-20.7-25.6-12.8zM320 360c0 4.4-3.6 8-8 8H72c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h240c4.4 0 8 3.6 8 8v16zm0-96c0 4.4-3.6 8-8 8H72c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h240c4.4 0 8 3.6 8 8v16zm0-96c0 4.4-3.6 8-8 8H72c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h240c4.4 0 8 3.6 8 8v16z\\"></path></svg>Ver nota fiscal</span><span class=\\"MuiTouchRipple-root\\"></span></button></div>
      </div>"
    `);
  });
});
