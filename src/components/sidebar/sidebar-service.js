import axios from 'axios';

import { SIDEBAR_API_ROUTE } from '../../shared/api-constants';
import formatCurrency from '../../utils/currency';
import parseToPascalCase from '../../utils/text';

function parseSidebarInfo(data) {
  return data.map((item, index) => ({
    id: index,
    ...item,
    declared: formatCurrency(item.declared, item.currency.code),
    approved: formatCurrency(item.approved, item.currency.code),
    received: formatCurrency(item.received, item.currency.code),
    returned: formatCurrency(item.returned, item.currency.code),
    balance: formatCurrency(item.balance, item.currency.code),
    accountabilityStatus: parseToPascalCase(item.accountabilityStatus),
  }));
}

export default async function getSidebarInfo() {
  const response = await axios.get(SIDEBAR_API_ROUTE);
  return parseSidebarInfo(response.data.content);
}
