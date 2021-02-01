import React from 'react';
import pretty from 'pretty';
import { render, cleanup } from '@testing-library/react';
import Sidebar from './sidebar';

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

describe('SidebarComponent', () => {
  describe('Snapshot tests', () => {
    let component = null;

    beforeEach(() => {
      component = render(<Sidebar sidebarData={expectedSidebar} />);
    });

    afterEach(() => {
      cleanup();
    });

    it('should render sidebar', () => {
      expect(pretty(component.container.innerHTML)).toMatchSnapshot();
    });

    it('should render sidebar with conditional layouts', () => {
      const sidebarWithConditionalLayout = [
        {
          ...expectedSidebar[0],
          balance: '213,21',
          approved: '213,21',
          returned: '213,21',
        },
      ];
      component = render(<Sidebar sidebarData={sidebarWithConditionalLayout} />);

      expect(pretty(component.container.innerHTML)).toMatchSnapshot();
    });
  });
});
