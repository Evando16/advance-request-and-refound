import axios from 'axios';
import { HEADER_API_ROUTE } from '../../shared/constants';

function parseBreakfastFlag(flag) {
  return flag ? 'Sim' : 'Não';
}

function pardeDate(date) {
  return new Date(date).toLocaleString('br', { year: 'numeric', month: 'numeric', day: 'numeric' });
}

function parseHttpResponse(data) {
  return {
    id: data.id,
    type: data.type,
    collaborator: {
      id: data.collaborator.id,
      name: data.collaborator.name,
      email: data.collaborator.email,
    },
    justification: data.justification,
    purpose: data.purpose,
    project: {
      id: data.project.id,
      title: data.project.title,
    },
    accountabilityExtraInfo: {
      budgetForBreakfast: parseBreakfastFlag(data.accountabilityExtraInfo.budgetForBreakfast),
      eventDate: pardeDate(data.accountabilityExtraInfo.eventDate),
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
