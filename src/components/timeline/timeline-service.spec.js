import axios from 'axios';

import requestTimelineData from './timeline-service';

const timelineDataHttpMock = {
  content: [{
    id: 545, cardDate: 1585710000000, cardType: 'EXPENSE', expenseId: 545, invoiceDate: 1585710000000, expenseTypeId: 5, expenseTypeCode: 'hotel-fee', expenseTypeIcon: 'concierge-bell', currencyId: 3, currencyCode: 'BRL', currencySymbol: 'R$', resourceUrl: 'https://staging-backoffice-hotmart.s3.amazonaws.com/accountability/collaborator_6393359/accountability_742/expense_545_file_615_Captura%20de%20tela%20de%202019-11-24%2010-15-50.png', contentType: 'image/png', amountSpent: 11.11, amountTotal: 222.22, notes: 'sadasd', status: 'PENDING', updatedOn: 1585069977693, expenseEvaluation: null,
  }, {
    id: 544, cardDate: 1585105200000, cardType: 'EXPENSE', expenseId: 544, invoiceDate: 1585105200000, expenseTypeId: 1, expenseTypeCode: 'food', expenseTypeIcon: 'utensils', currencyId: 3, currencyCode: 'BRL', currencySymbol: 'R$', resourceUrl: 'https://staging-backoffice-hotmart.s3.amazonaws.com/accountability/collaborator_6393359/accountability_742/expense_544_file_614_Captura%20de%20tela%20de%202019-11-21%2009-36-41.png', contentType: 'image/png', amountSpent: 1.11, amountTotal: 2.22, notes: 'dsfsdsffds', status: 'PENDING', updatedOn: 1585069977693, expenseEvaluation: null,
  }, {
    id: 1374, cardDate: 1585069978256, cardType: 'ACCOUNTABILITY_SUBMITTED', author: { id: 6393359, name: 'Henrique Elias', email: 'henrique.elias@hotmart.com' }, notes: null, status: null,
  }, {
    id: 1373, cardDate: 1585069977972, cardType: 'EVALUATION', author: { id: 6393359, name: 'Henrique Elias', email: 'henrique.elias@hotmart.com' }, notes: null, status: 'PENDING',
  }, {
    id: 1373, cardDate: 1585069977972, cardType: 'EVALUATION', author: { id: 6393359, name: 'Henrique Elias', email: 'henrique.elias@hotmart.com' }, notes: null, status: 'CANCELLED',
  }, {
    id: 1373, cardDate: 1585069977972, cardType: 'EVALUATION', author: { id: 6393359, name: 'Henrique Elias', email: 'henrique.elias@hotmart.com' }, notes: null, status: 'APPROVED',
  }, {
    id: 1373, cardDate: 1585069977972, cardType: 'EVALUATION', author: { id: 6393359, name: 'Henrique Elias', email: 'henrique.elias@hotmart.com' }, notes: null, status: 'INVALID',
  }, {
    id: 1372, cardDate: 1585059146350, cardType: 'ACCOUNTABILITY_CREATED', author: { id: 6393359, name: 'Henrique Elias', email: 'henrique.elias@hotmart.com' }, notes: null, status: null,
  }, {
    id: 1372, cardDate: 1585059146350, cardType: 'INVALID', author: { id: 6393359, name: 'Henrique Elias', email: 'henrique.elias@hotmart.com' }, notes: null, status: null,
  }],
};

const expectedTimelineData = [
  {
    id: 545, cardDate: '04/01/2020', cardType: 'EXPENSE', typeDescription: 'Hotel', expenseId: 545, invoiceDate: '04/01/2020', expenseTypeId: 5, expenseTypeCode: 'hotel-fee', expenseTypeIcon: 'concierge-bell', currencyId: 3, currencyCode: 'BRL', currencySymbol: 'R$', resourceUrl: 'https://staging-backoffice-hotmart.s3.amazonaws.com/accountability/collaborator_6393359/accountability_742/expense_545_file_615_Captura%20de%20tela%20de%202019-11-24%2010-15-50.png', contentType: 'image/png', amountSpent: '11,11', amountTotal: '222,22', notes: 'sadasd', status: 'Pending', updatedOn: 1585069977693, expenseEvaluation: null,
  }, {
    id: 544, cardDate: '03/25/2020', cardType: 'EXPENSE', typeDescription: 'Food', expenseId: 544, invoiceDate: '03/25/2020', expenseTypeId: 1, expenseTypeCode: 'food', expenseTypeIcon: 'utensils', currencyId: 3, currencyCode: 'BRL', currencySymbol: 'R$', resourceUrl: 'https://staging-backoffice-hotmart.s3.amazonaws.com/accountability/collaborator_6393359/accountability_742/expense_544_file_614_Captura%20de%20tela%20de%202019-11-21%2009-36-41.png', contentType: 'image/png', amountSpent: '1,11', amountTotal: '2,22', notes: 'dsfsdsffds', status: 'Pending', updatedOn: 1585069977693, expenseEvaluation: null,
  }, {
    id: 1374, cardDate: '03/24/2020', cardType: 'ACCOUNTABILITY_SUBMITTED', typeDescription: 'Solicitation submitted by Henrique Elias', invoiceDate: null, author: { id: 6393359, name: 'Henrique Elias', email: 'henrique.elias@hotmart.com' }, notes: null, status: null, amountSpent: '0', amountTotal: '0',
  }, {
    id: 1373, cardDate: '03/24/2020', cardType: 'EVALUATION', typeDescription: 'Solicitation pendding with Henrique Elias', invoiceDate: null, author: { id: 6393359, name: 'Henrique Elias', email: 'henrique.elias@hotmart.com' }, notes: null, status: 'Pending', amountSpent: '0', amountTotal: '0',
  }, {
    id: 1373, cardDate: '03/24/2020', cardType: 'EVALUATION', typeDescription: 'Solicitation cancelled by Henrique Elias', invoiceDate: null, author: { id: 6393359, name: 'Henrique Elias', email: 'henrique.elias@hotmart.com' }, notes: null, status: 'Cancelled', amountSpent: '0', amountTotal: '0',
  }, {
    id: 1373, cardDate: '03/24/2020', cardType: 'EVALUATION', typeDescription: 'Solicitation approved by Henrique Elias', invoiceDate: null, author: { id: 6393359, name: 'Henrique Elias', email: 'henrique.elias@hotmart.com' }, notes: null, status: 'Approved', amountSpent: '0', amountTotal: '0',
  }, {
    id: 1373, cardDate: '03/24/2020', cardType: 'EVALUATION', typeDescription: '-', invoiceDate: null, author: { id: 6393359, name: 'Henrique Elias', email: 'henrique.elias@hotmart.com' }, notes: null, status: 'Invalid', amountSpent: '0', amountTotal: '0',
  }, {
    id: 1372, cardDate: '03/24/2020', cardType: 'ACCOUNTABILITY_CREATED', typeDescription: 'Solicitation created by Henrique Elias', invoiceDate: null, author: { id: 6393359, name: 'Henrique Elias', email: 'henrique.elias@hotmart.com' }, notes: null, status: null, amountSpent: '0', amountTotal: '0',
  }, {
    id: 1372, cardDate: '03/24/2020', cardType: 'INVALID', typeDescription: '-', invoiceDate: null, author: { id: 6393359, name: 'Henrique Elias', email: 'henrique.elias@hotmart.com' }, notes: null, status: null, amountSpent: '0', amountTotal: '0',
  },
];

jest.mock('axios');
describe('TimelineService', () => {
  describe('Unit tests', () => {
    it('should request timeline data', async () => {
      axios.get.mockResolvedValue({ data: timelineDataHttpMock });

      const result = await requestTimelineData();

      expect(result).toEqual(expectedTimelineData);
    });

    it('should return empty array when file to get timeline data', async () => {
      axios.get.mockResolvedValue({ data: null });

      const result = await requestTimelineData();

      expect(result).toEqual([]);
    });
  });
});
