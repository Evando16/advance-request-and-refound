import axios from 'axios';

import requestTimelineData from './timeline-service';

const timelineDataHttpMock = {
  content: [
    {
      id: 545,
      cardDate: 1585710000000,
      cardType: 'EXPENSE',
      expenseId: 545,
      invoiceDate: 1585710000000,
      expenseTypeId: 5,
      expenseTypeCode: 'hotel-fee',
      expenseTypeIcon: 'concierge-bell',
      currencyId: 3,
      currencyCode: 'BRL',
      currencySymbol: 'R$',
      resourceUrl: 'https://staging-backoffice-hotmart.s3.amazonaws.com/accountability/collaborator_6393359/accountability_742/expense_545_file_615_Captura%20de%20tela%20de%202019-11-24%2010-15-50.png',
      contentType: 'image/png',
      amountSpent: 11.11,
      amountTotal: 222.22,
      notes: 'sadasd',
      status: 'PENDING',
      updatedOn: 1585069977693,
      expenseEvaluation: null,
    },
  ],
};

const expectedTimelineData = [
  {
    id: 545,
    cardDate: '04/01/2020',
    cardType: 'EXPENSE',
    expenseId: 545,
    invoiceDate: '04/01/2020',
    expenseTypeId: 5,
    expenseTypeCode: 'hotel-fee',
    expenseTypeIcon: 'concierge-bell',
    currencyId: 3,
    currencyCode: 'BRL',
    currencySymbol: 'R$',
    resourceUrl: 'https://staging-backoffice-hotmart.s3.amazonaws.com/accountability/collaborator_6393359/accountability_742/expense_545_file_615_Captura%20de%20tela%20de%202019-11-24%2010-15-50.png',
    contentType: 'image/png',
    amountSpent: '11,11',
    amountTotal: '222,22',
    notes: 'sadasd',
    status: 'PENDING',
    updatedOn: 1585069977693,
    expenseEvaluation: null,
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
