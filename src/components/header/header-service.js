import axios from 'axios';
import { HEADER_API_ROUTE } from '../../shared/api-constants';
import parseDate from '../../utils/date';

const DATA_TYPE = {
  REFUND: 'Reembolso',
};

const PURPOSE_TYPE = {
  FRATERNIZATION: 'Confraternização',
};

export function parseBreakfastFlag(flag) {
  return flag ? 'Sim' : 'Não';
}

function parseHttpResponse(data) {
  return {
    id: data.id,
    type: DATA_TYPE[data.type],
    collaborator: {
      id: data.collaborator.id,
      name: data.collaborator.name,
      email: data.collaborator.email,
    },
    justification: data.justification,
    purpose: PURPOSE_TYPE[data.purpose],
    project: {
      id: data.project.id,
      title: data.project.title,
    },
    accountabilityExtraInfo: {
      budgetForBreakfast: parseBreakfastFlag(data.accountabilityExtraInfo.budgetForBreakfast),
      eventDate: parseDate(data.accountabilityExtraInfo.eventDate),
      amountOfPeople: data.accountabilityExtraInfo.amountOfPeople,
    },
    analyst: data.analyst,
    costCenters: data.costCenters
      .map((constCenter) => ({ id: constCenter.id, name: constCenter.name })),
  };
}

export default async function requestHeaderData() {
  const response = await axios.get(HEADER_API_ROUTE);

  return parseHttpResponse(response.data);
}
