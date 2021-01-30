import axios from 'axios';
import { EXPENSE_API_ROUTE } from '../../shared/api-constants';

export default function saveExpense({
  expenseType,
  currency,
  description,
  receiptDate,
  receiptValue,
  valueToBePaid,
  receiptImage,
}) {
  const expense = {
    expenseTypeCode: expenseType,
    currencyCode: currency,
    amountSpent: Number(valueToBePaid),
    amountTotal: Number(receiptValue),
    notes: description,
    resourceUrl: receiptImage.file,
    cardDate: receiptDate.getTime(),
  };

  return axios.post(EXPENSE_API_ROUTE, expense);
}
