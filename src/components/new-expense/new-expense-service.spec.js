import axios from 'axios';
import { EXPENSE_API_ROUTE } from '../../shared/api-constants';

import saveExpense from './new-expense-service';

const newExpenseMock = {
  expenseType: 'food',
  currency: 'USD',
  description: 'this is just a test',
  receiptDate: new Date('20/01/2015'),
  receiptValue: '1616.16',
  valueToBePaid: '20.50',
  receiptImage: { file: {} },
};

const expectedExpenseBody = {
  expenseTypeCode: 'food',
  currencyCode: 'USD',
  notes: 'this is just a test',
  cardDate: new Date('20/01/2015').getTime(),
  amountTotal: 1616.16,
  amountSpent: 20.50,
  resourceUrl: {},
};

jest.mock('axios');

describe('NewExpenseService', () => {
  describe('Unit tests', () => {
    it('should save a new expense', async () => {
      axios.post.mockResolvedValue({ data: {} });

      saveExpense(newExpenseMock);

      expect(axios.post).toHaveBeenCalledWith(EXPENSE_API_ROUTE, expectedExpenseBody);
    });
  });
});
