import axios from 'axios';
import { HEADER_API_ROUTE, SIDEBAR_API_ROUTE, TIMELINE_API_ROUTE } from '../../shared/api-constants';
import { requestSidebarInfo, requestHeaderData, requestTimelineData } from './solicitation-service';

jest.mock('axios');

describe('SolicitationService', () => {
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

  const timelineDataHttpMock = {
    content: [{
      id: 545, cardDate: 1585710000000, cardType: 'EXPENSE', expenseId: 545, invoiceDate: 1585710000000, expenseTypeId: 5, expenseTypeCode: 'hotel-fee', expenseTypeIcon: 'concierge-bell', currencyId: 3, currencyCode: 'BRL', currencySymbol: 'R$', resourceUrl: 'https://staging-backoffice-hotmart.s3.amazonaws.com/accountability/collaborator_6393359/accountability_742/expense_545_file_615_Captura%20de%20tela%20de%202019-11-24%2010-15-50.png', contentType: 'image/png', amountSpent: 11.11, amountTotal: 222.22, notes: 'sadasd', status: 'PENDING', updatedOn: 1585069977693, expenseEvaluation: null,
    }, {
      id: 544, cardDate: 1585105200000, cardType: 'EXPENSE', expenseId: 544, invoiceDate: 1585105200000, expenseTypeId: 1, expenseTypeCode: 'food', expenseTypeIcon: 'utensils', currencyId: 3, currencyCode: 'BRL', currencySymbol: 'R$', resourceUrl: 'https://staging-backoffice-hotmart.s3.amazonaws.com/accountability/collaborator_6393359/accountability_742/expense_544_file_614_Captura%20de%20tela%20de%202019-11-21%2009-36-41.png', contentType: 'image/png', amountSpent: 1.11, amountTotal: 2.22, notes: 'dsfsdsffds', status: 'PENDING', updatedOn: 1585069977693, expenseEvaluation: null,
    }, {
      id: 1374, cardDate: 1585069978256, cardType: 'ACCOUNTABILITY_SUBMITTED', author: { id: 6393359, name: 'Henrique Elias', email: 'henrique.elias@hotmart.com' }, notes: null, status: null,
    }, {
      id: 1373, cardDate: 1585069977972, cardType: 'EVALUATION', author: { id: 6393359, name: 'Henrique Elias', email: 'henrique.elias@hotmart.com' }, notes: null, status: 'PENDING',
    }, {
      id: 1373, cardDate: 1585069977972, cardType: 'EVALUATION', author: { id: 6393359, name: 'Henrique Elias', email: 'henrique.elias@hotmart.com' }, notes: null, status: 'CANCELLED',
    }, {
      id: 1373, cardDate: 1585069977972, cardType: 'EVALUATION', author: { id: 6393359, name: 'Henrique Elias', email: 'henrique.elias@hotmart.com' }, notes: null, status: 'APPROVED',
    }, {
      id: 1373, cardDate: 1585069977972, cardType: 'EVALUATION', author: { id: 6393359, name: 'Henrique Elias', email: 'henrique.elias@hotmart.com' }, notes: null, status: 'INVALID',
    }, {
      id: 1372, cardDate: 1585059146350, cardType: 'ACCOUNTABILITY_CREATED', author: { id: 6393359, name: 'Henrique Elias', email: 'henrique.elias@hotmart.com' }, notes: null, status: null,
    }, {
      id: 1372, cardDate: 1585059146350, cardType: 'INVALID', author: { id: 6393359, name: 'Henrique Elias', email: 'henrique.elias@hotmart.com' }, notes: null, status: null,
    }],
  };

  const expectedTimelineData = [
    {
      id: 545, cardDate: '04/01/2020', cardType: 'EXPENSE', typeDescription: 'Hotel', expenseTypeIcon: 'concierge-bell', resourceUrl: 'https://staging-backoffice-hotmart.s3.amazonaws.com/accountability/collaborator_6393359/accountability_742/expense_545_file_615_Captura%20de%20tela%20de%202019-11-24%2010-15-50.png', amountSpent: '11,11', amountTotal: '222,22', notes: 'sadasd', status: 'Pending',
    }, {
      id: 544, cardDate: '03/25/2020', cardType: 'EXPENSE', typeDescription: 'Food', expenseTypeIcon: 'utensils', resourceUrl: 'https://staging-backoffice-hotmart.s3.amazonaws.com/accountability/collaborator_6393359/accountability_742/expense_544_file_614_Captura%20de%20tela%20de%202019-11-21%2009-36-41.png', amountSpent: '1,11', amountTotal: '2,22', notes: 'dsfsdsffds', status: 'Pending',
    }, {
      id: 1374, cardDate: '03/24/2020', cardType: 'ACCOUNTABILITY_SUBMITTED', typeDescription: 'Solicitation submitted by Henrique Elias', notes: null, status: null, amountSpent: '0', amountTotal: '0',
    }, {
      id: 1373, cardDate: '03/24/2020', cardType: 'EVALUATION', typeDescription: 'Solicitation pendding with Henrique Elias', notes: null, status: 'Pending', amountSpent: '0', amountTotal: '0',
    }, {
      id: 1373, cardDate: '03/24/2020', cardType: 'EVALUATION', typeDescription: 'Solicitation cancelled by Henrique Elias', notes: null, status: 'Cancelled', amountSpent: '0', amountTotal: '0',
    }, {
      id: 1373, cardDate: '03/24/2020', cardType: 'EVALUATION', typeDescription: 'Solicitation approved by Henrique Elias', notes: null, status: 'Approved', amountSpent: '0', amountTotal: '0',
    }, {
      id: 1373, cardDate: '03/24/2020', cardType: 'EVALUATION', typeDescription: '-', notes: null, status: 'Invalid', amountSpent: '0', amountTotal: '0',
    }, {
      id: 1372, cardDate: '03/24/2020', cardType: 'ACCOUNTABILITY_CREATED', typeDescription: 'Solicitation created by Henrique Elias', notes: null, status: null, amountSpent: '0', amountTotal: '0',
    }, {
      id: 1372, cardDate: '03/24/2020', cardType: 'INVALID', typeDescription: '-', notes: null, status: null, amountSpent: '0', amountTotal: '0',
    },
  ];

  const sidebarHttpMock = {
    content: [
      {
        accountabilityId: 16,
        accountabilityStatus: 'OPEN',
        currency: {
          id: 1,
          name: 'Argentine peso',
          code: 'ARS',
          symbol: 'ARS$',
        },
        declared: 123213.21,
        approved: 0,
        received: 0,
        returned: 0,
        balance: 0,
        updatedOn: 1590525677543,
      },
    ],
  };

  const expectedSidebar = [
    {
      id: 0,
      accountabilityStatus: 'Open',
      currencyCode: 'ARS',
      declared: '123.213,21',
      approved: '0',
      received: '0',
      returned: '0',
      balance: '0',
    },
  ];

  describe('Unit tests', () => {
    it('should request header data', async () => {
      axios.get.mockResolvedValue({ data: headerDataHttpMock });

      await expect(requestHeaderData()).resolves.toEqual(expectedHeaderData);
      expect(axios.get).toHaveBeenCalledWith(HEADER_API_ROUTE);
    });

    it('should got failt to request header data', async () => {
      axios.get.mockImplementation(() => Promise.reject(new Error('erro to test catch')));

      await expect(requestHeaderData()).rejects.toThrow('Ops... Fail to recovery Header data :(');
      expect(axios.get).toHaveBeenCalledWith(HEADER_API_ROUTE);
    });

    it('should request timeline data', async () => {
      axios.get.mockResolvedValue({ data: timelineDataHttpMock });

      await expect(requestTimelineData()).resolves.toEqual(expectedTimelineData);
      expect(axios.get).toHaveBeenCalledWith(TIMELINE_API_ROUTE);
    });

    it('should return empty array when fail to get timeline data', async () => {
      axios.get.mockResolvedValue({ data: null });

      await expect(requestTimelineData()).resolves.toEqual([]);
      expect(axios.get).toHaveBeenCalledWith(TIMELINE_API_ROUTE);
    });

    it('should got fail to request timeline data', async () => {
      axios.get.mockImplementation(() => Promise.reject(new Error('erro to test catch')));

      await expect(requestTimelineData()).rejects.toThrow('Ops... Fail to recovery Timeline data :(');
      expect(axios.get).toHaveBeenCalledWith(TIMELINE_API_ROUTE);
    });

    it('should request sidebar data', async () => {
      axios.get.mockResolvedValue({ data: sidebarHttpMock });

      await expect(requestSidebarInfo()).resolves.toEqual(expectedSidebar);
      expect(axios.get).toHaveBeenCalledWith(SIDEBAR_API_ROUTE);
    });

    it('should got fail to request sidebar data', async () => {
      axios.get.mockImplementation(() => Promise.reject(new Error('erro to test catch')));

      await expect(requestSidebarInfo()).rejects.toThrow('Ops... Fail to recovery Sidebard data :(');
      expect(axios.get).toHaveBeenCalledWith(SIDEBAR_API_ROUTE);
    });
  });
});
