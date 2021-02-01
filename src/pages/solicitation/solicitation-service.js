import axios from 'axios';
import {
  EXPENSE_API_ROUTE, HEADER_API_ROUTE, SIDEBAR_API_ROUTE, TIMELINE_API_ROUTE,
} from '../../shared/api-constants';
import formatCurrency from '../../shared/utils/currency';
import parseDate from '../../shared/utils/date';
import parseToPascalCase from '../../shared/utils/text';

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

function parseHttpHeaderResponse(data) {
  return {
    id: data.id,
    type: parseToPascalCase(data.type),
    justification: data.justification,
    purpose: parseToPascalCase(data.purpose),
    project: {
      id: data.project.id,
      title: data.project.title,
    },
    accountabilityExtraInfo: {
      eventDate: parseDate(data.accountabilityExtraInfo.eventDate),
      amountOfPeople: data.accountabilityExtraInfo.amountOfPeople,
    },
    costCenters: data.costCenters
      .map((constCenter) => ({ id: constCenter.id, name: constCenter.name })),
  };
}

function parseTimelineData(data) {
  return data.content.map((item) => ({
    id: item.id,
    cardType: item.cardType,
    expenseTypeIcon: item.expenseTypeIcon,
    notes: item.notes,
    typeDescription: getTypeDescription(item),
    status: parseToPascalCase(item.status),
    cardDate: parseDate(item.cardDate),
    amountSpent: formatCurrency(item.amountSpent, item.currencyCode),
    amountTotal: formatCurrency(item.amountTotal, item.currencyCode),
    resourceUrl: item.resourceUrl,
  }));
}

function parseSidebarInfo(data) {
  return data.map((item, index) => ({
    id: index,
    currencyCode: item.currency.code,
    declared: formatCurrency(item.declared, item.currency.code),
    approved: formatCurrency(item.approved, item.currency.code),
    received: formatCurrency(item.received, item.currency.code),
    returned: formatCurrency(item.returned, item.currency.code),
    balance: formatCurrency(item.balance, item.currency.code),
    accountabilityStatus: parseToPascalCase(item.accountabilityStatus),
  }));
}

export async function requestHeaderData() {
  return axios.get(HEADER_API_ROUTE)
    .then((response) => Promise.resolve(parseHttpHeaderResponse(response.data)))
    .catch(() => Promise.reject(new Error('Ops... Fail to recovery Header data :(')));
}

export async function requestTimelineData() {
  return axios.get(TIMELINE_API_ROUTE)
    .then((response) => {
      if (response.data) {
        return Promise.resolve(parseTimelineData(response.data));
      }
      return Promise.resolve([]);
    })
    .catch(() => Promise.reject(new Error('Ops... Fail to recovery Timeline data :(')));
}

export async function requestSidebarInfo() {
  return axios.get(SIDEBAR_API_ROUTE)
    .then((response) => Promise.resolve(parseSidebarInfo(response.data.content)))
    .catch(() => Promise.reject(new Error('Ops... Fail to recovery Sidebard data :(')));
}

export async function saveExpense({
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
    cardDate: new Date(receiptDate).getTime(),
  };

  return axios.post(EXPENSE_API_ROUTE, expense)
    .then(() => Promise.resolve('Expense saved with success :)'))
    .catch(() => Promise.reject(new Error('Ops... An error has occurred while save your new expense :(')));
}
