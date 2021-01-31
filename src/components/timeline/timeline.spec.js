import React from 'react';
import { render, cleanup } from '@testing-library/react';
import pretty from 'pretty';
import {
  faUsers,
  faAsterisk,
  faConciergeBell,
  faUtensils,
} from '@fortawesome/free-solid-svg-icons';

import Timeline, { getCardIcon } from './timeline';

const expectedTimelineData = [
  {
    id: 545, cardDate: '04/01/2020', cardType: 'EXPENSE', typeDescription: 'Hotel', expenseTypeIcon: 'concierge-bell', resourceUrl: 'https://staging-backoffice-hotmart.s3.amazonaws.com/accountability/collaborator_6393359/accountability_742/expense_545_file_615_Captura%20de%20tela%20de%202019-11-24%2010-15-50.png', amountSpent: '11,11', amountTotal: '222,22', notes: 'sadasd', status: 'Pending',
  }, {
    id: 544, cardDate: '03/25/2020', cardType: 'EXPENSE', typeDescription: 'Food', expenseTypeIcon: 'utensils', resourceUrl: 'https://staging-backoffice-hotmart.s3.amazonaws.com/accountability/collaborator_6393359/accountability_742/expense_544_file_614_Captura%20de%20tela%20de%202019-11-21%2009-36-41.png', amountSpent: '1,11', amountTotal: '2,22', notes: 'dsfsdsffds', status: 'Pending',
  }, {
    id: 1371, cardDate: '03/24/2020', cardType: 'ACCOUNTABILITY_SUBMITTED', typeDescription: 'Solicitation submitted by Henrique Elias', notes: null, status: null, amountSpent: '0', amountTotal: '0',
  }, {
    id: 1372, cardDate: '03/24/2020', cardType: 'EVALUATION', typeDescription: 'Solicitation pendding with Henrique Elias', notes: null, status: 'Pending', amountSpent: '0', amountTotal: '0',
  }, {
    id: 1373, cardDate: '03/24/2020', cardType: 'EVALUATION', typeDescription: 'Solicitation cancelled by Henrique Elias', notes: null, status: 'Cancelled', amountSpent: '0', amountTotal: '0',
  }, {
    id: 1374, cardDate: '03/24/2020', cardType: 'EVALUATION', typeDescription: 'Solicitation approved by Henrique Elias', notes: null, status: 'Approved', amountSpent: '0', amountTotal: '0',
  }, {
    id: 1376, cardDate: '03/24/2020', cardType: 'ACCOUNTABILITY_CREATED', typeDescription: 'Solicitation created by Henrique Elias', notes: null, status: null, amountSpent: '0', amountTotal: '0',
  },
];

describe('TimelineComponent', () => {
  describe('Unit tests', () => {
    it('should get icon to EVALUATION card', () => {
      expect(
        getCardIcon({ ...expectedTimelineData[0], cardType: 'EVALUATION' }),
      ).toEqual(faUsers);
    });

    it('should get icon to ACCOUNTABILITY_SUBMITTED card', () => {
      expect(
        getCardIcon({
          ...expectedTimelineData[0],
          cardType: 'ACCOUNTABILITY_SUBMITTED',
        }),
      ).toEqual(faAsterisk);
    });

    it('should get icon to ACCOUNTABILITY_CREATED card', () => {
      expect(
        getCardIcon({
          ...expectedTimelineData[0],
          cardType: 'ACCOUNTABILITY_CREATED',
        }),
      ).toEqual(faAsterisk);
    });

    it('should get utensils icon to EXPENSE card', () => {
      expect(
        getCardIcon({
          ...expectedTimelineData[0],
          cardType: 'EXPENSE',
          expenseTypeIcon: 'utensils',
        }),
      ).toEqual(faUtensils);
    });

    it('should get concierge-bell icon to EXPENSE card', () => {
      expect(
        getCardIcon({
          ...expectedTimelineData[0],
          cardType: 'EXPENSE',
          expenseTypeIcon: 'concierge-bell',
        }),
      ).toEqual(faConciergeBell);
    });
  });

  describe('Snapshot tests', () => {
    let component = null;

    beforeEach(() => {
      component = render(<Timeline timelineData={expectedTimelineData} />);
    });

    afterEach(() => {
      cleanup();
    });

    it('should render timeline with all cards type', () => {
      expect(pretty(component.container.innerHTML)).toMatchSnapshot();
    });
  });
});
