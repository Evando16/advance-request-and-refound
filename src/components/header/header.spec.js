import React from 'react';
import { render } from '@testing-library/react';
import pretty from 'pretty';
import Header from './header';

describe('HeaderComponent', () => {
  const headerDataMock = {
    accountabilityExtraInfo: {
      amountOfPeople: 1,
      budgetForBreakfast: 'Não',
      eventDate: '05/14/2020',
    },
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
    purpose: 'Fraternization',
    type: 'Refund',
  };

  let container = null;

  beforeEach(() => {
    container = render(<Header headerData={headerDataMock} />);
  });

  describe('Snapshot tests', () => {
    it('should render header component', async () => {
      expect(pretty(container.innerHTML)).toMatchSnapshot();
    });

    it('should render header component with conditional fields', async () => {
      container = render(<Header headerData={{ ...headerDataMock, project: null }} />);

      expect(pretty(container.innerHTML)).toMatchSnapshot();
    });
  });
});
