import axios from 'axios';

import { TIMELINE_API_ROUTE } from '../../shared/api-constants';
import formatCurrency from '../../utils/currency';
import parseDate from '../../utils/date';
import parseToPascalCase from '../../utils/text';

const EXPENSE_TYPE = {
  'hotel-fee': 'Hotel',
  food: 'Food',
  transport: 'Transport',
};

function getEvaluationDescription(timeLineItem) {
  switch (timeLineItem.status) {
    case 'PENDING':
      return `Solicitation pendding with ${timeLineItem.author.name}`;
    case 'CANCELLED':
    case 'APPROVED':
      return `Solicitation ${timeLineItem.status.toLowerCase()} by ${timeLineItem.author.name}`;
    default:
      return '-';
  }
}

function getTypeDescription(timeLineItem) {
  switch (timeLineItem.cardType) {
    case 'EXPENSE':
      return EXPENSE_TYPE[timeLineItem.expenseTypeCode];
    case 'EVALUATION':
      return getEvaluationDescription(timeLineItem);
    case 'ACCOUNTABILITY_SUBMITTED':
      return `Solicitation submitted by ${timeLineItem.author.name}`;
    case 'ACCOUNTABILITY_CREATED':
      return `Solicitation created by ${timeLineItem.author.name}`;
    default:
      return '-';
  }
}

function parseTimelineData(data) {
  return data.content.map((item) => ({
    ...item,
    typeDescription: getTypeDescription(item),
    status: parseToPascalCase(item.status),
    cardDate: parseDate(item.cardDate),
    invoiceDate: item.invoiceDate ? parseDate(item.invoiceDate) : null,
    amountSpent: formatCurrency(item.amountSpent, item.currencyCode),
    amountTotal: formatCurrency(item.amountTotal, item.currencyCode),
  }));
}

export default async function requestTimelineData() {
  const response = await axios.get(TIMELINE_API_ROUTE);

  if (response.data) {
    return parseTimelineData(response.data);
  }
  return [];
}
