import axios from 'axios';

import requestHeaderData, { parseBreakfastFlag } from './header-service';

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
      budgetForBreakfast: 'Não',
      eventDate: '14/05/2020',
    },
    analyst: null,
    collaborator: {
      email: 'quickops-bs@hotmart.com',
      id: 10436247,
      name: 'Quickops BS',
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
    purpose: 'Confraternização',
    type: 'Reembolso',
  };

  describe('Unit tests', () => {
    it('should request header data', async () => {
      axios.get.mockResolvedValue({ data: headerDataHttpMock });

      const result = await requestHeaderData();

      expect(result).toEqual(expectedHeaderData);
    });

    it('should parse false breakfast flag to text', () => {
      expect(parseBreakfastFlag(false)).toEqual('Não');
    });

    it('should parse true breakfast flag to text', () => {
      expect(parseBreakfastFlag(true)).toEqual('Sim');
    });
  });
});
