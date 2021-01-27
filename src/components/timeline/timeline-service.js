import axios from 'axios';

import { TIMELINE_API_ROUTE } from '../../shared/constants';
import formatCurrency from '../../utils/currency';
import parseDate from '../../utils/date';

function parseTimelineData(data) {
  return data.content.map((item) => ({
    ...item,
    cardDate: parseDate(item.cardDate),
    invoiceDate: parseDate(item.invoiceDate),
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
