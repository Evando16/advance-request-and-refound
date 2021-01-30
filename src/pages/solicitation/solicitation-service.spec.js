import axios from 'axios';
import requestHeaderData from './solicitation-service';

jest.mock('axios');

describe('HeaderService', () => {
  const headerDataHttpMock = {
    id: 756,
    createdOn: 1588613238775,
    title: '-----teste',
    type: 'REFUND',
    collaborator: { id: 10436247, name: 'Quickops BS', email: 'quickops-bs@hotmart.com' },
    purpose: 'FRATERNIZATION',
    project: { id: 41, title: 'Afiliados Brasil' },
    justification: 'f',
    deadline: null,
    fraternizationEducationBudget: false,
    analyst: null,
    status: 'OPEN',
    canceled: false,
    submittedOn: null,
    evaluatedOn: null,
    accountabilityExtraInfo: {
      departureOn: null,
      arrivalOn: null,
      budgetForBreakfast: null,
      eventDate: 1589425200000,
      amountOfPeople: 1,
      requestedCurrency: null,
      amountRequested: null,
      destination: null,
    },
    costCenters: [{
      id: 88, percentage: 100, name: '01 - Sem manager', manager: { id: null, name: null, email: null }, reviser: { id: 2584825, name: 'Backoffice Team', email: 'backoffice@hotmart.com' }, talentPartner: { id: 10177641, name: 'Michael Jackson', email: 'michael.jackson@hotmart.com' },
    }],
  };

  const expectedHeaderData = {
    accountabilityExtraInfo: {
      amountOfPeople: 1,
      eventDate: '05/14/2020',
    },
    costCenters: [
      {
        id: 88,
        name: '01 - Sem manager',
      },
    ],
    id: 756,
    justification: 'f',
    project: {
      id: 41,
      title: 'Afiliados Brasil',
    },
    purpose: 'Fraternization',
    type: 'Refund',
  };

  describe('Unit tests', () => {
    it('should request header data', async () => {
      axios.get.mockResolvedValue({ data: headerDataHttpMock });

      const result = await requestHeaderData();

      expect(result).toEqual(expectedHeaderData);
    });
  });
});
