import axios from 'axios';
import { HEADER_API_ROUTE, TIMELINE_API_ROUTE } from '../../shared/api-constants';
import formatCurrency from '../../utils/currency';
import parseDate from '../../utils/date';
import parseToPascalCase from '../../utils/text';

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
