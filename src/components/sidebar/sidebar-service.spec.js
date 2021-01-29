import axios from 'axios';
import { SIDEBAR_API_ROUTE } from '../../shared/api-constants';

import getSidebarInfo from './sidebar-service';

jest.mock('axios');

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
    accountabilityId: 16,
    accountabilityStatus: 'Open',
    currency: {
      id: 1,
      name: 'Argentine peso',
      code: 'ARS',
      symbol: 'ARS$',
    },
    declared: '123.213,21',
    approved: '0',
    received: '0',
    returned: '0',
    balance: '0',
    updatedOn: 1590525677543,
  },
];

describe('SidebarService', () => {
  describe('Unit tests', () => {
    fit('should request sidebar data', async () => {
      axios.get.mockResolvedValue({ data: sidebarHttpMock });
      const result = await getSidebarInfo();

      expect(axios.get).toHaveBeenCalledWith(SIDEBAR_API_ROUTE);
      expect(result).toEqual(expectedSidebar);
    });
  });
});
