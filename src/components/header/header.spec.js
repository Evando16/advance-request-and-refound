import React from 'react';
import { render, cleanup } from '@testing-library/react';
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

  describe('Snapshot tests', () => {
    let component = null;

    beforeEach(() => {
      component = render(<Header headerData={headerDataMock} />);
    });

    afterEach(() => {
      cleanup();
    });

    it('should render header component', () => {
      expect(pretty(component.container.innerHTML)).toMatchSnapshot();
    });

    it('should render header component with conditional fields', () => {
      component = render(<Header headerData={{ ...headerDataMock, project: null }} />);

      expect(pretty(component.container.innerHTML)).toMatchSnapshot();
    });
  });
});
