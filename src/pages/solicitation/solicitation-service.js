import axios from 'axios';
import { HEADER_API_ROUTE } from '../../shared/api-constants';
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

export default async function requestHeaderData() {
  const response = await axios.get(HEADER_API_ROUTE);

  return parseHttpHeaderResponse(response.data);
}
