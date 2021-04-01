import React from 'react';
import { findByTestId, fireEvent, render, screen } from '@testing-library/react';

import Solicitation from './solicitation';

import {
    requestSidebarInfo, requestHeaderData, requestTimelineData
} from './solicitation-service';

jest.mock('./solicitation-service');

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

const expectedTimelineData = [
    {
        id: 545, cardDate: '04/01/2020', cardType: 'EXPENSE', typeDescription: 'Hotel', expenseTypeIcon: 'concierge-bell', currencyCode: 'BRL', resourceUrl: 'https://staging-backoffice-hotmart.s3.amazonaws.com/accountability/collaborator_6393359/accountability_742/expense_545_file_615_Captura%20de%20tela%20de%202019-11-24%2010-15-50.png', amountSpent: '11,11', amountTotal: '222,22', notes: 'sadasd', status: 'Pending',
    }, {
        id: 544, cardDate: '03/25/2020', cardType: 'EXPENSE', typeDescription: 'Food', expenseTypeIcon: 'utensils', currencyCode: 'BRL', resourceUrl: 'https://staging-backoffice-hotmart.s3.amazonaws.com/accountability/collaborator_6393359/accountability_742/expense_544_file_614_Captura%20de%20tela%20de%202019-11-21%2009-36-41.png', amountSpent: '1,11', amountTotal: '2,22', notes: 'dsfsdsffds', status: 'Pending',
    }, {
        id: 1371, cardDate: '03/24/2020', cardType: 'ACCOUNTABILITY_SUBMITTED', typeDescription: 'Solicitation submitted by Henrique Elias', notes: null, status: null, amountSpent: '0', amountTotal: '0',
    }, {
        id: 1372, cardDate: '03/24/2020', cardType: 'EVALUATION', typeDescription: 'Solicitation pendding with Henrique Elias', notes: null, status: 'Pending', amountSpent: '0', amountTotal: '0',
    }, {
        id: 1373, cardDate: '03/24/2020', cardType: 'EVALUATION', typeDescription: 'Solicitation cancelled by Henrique Elias', notes: null, status: 'Cancelled', amountSpent: '0', amountTotal: '0',
    }, {
        id: 1374, cardDate: '03/24/2020', cardType: 'EVALUATION', typeDescription: 'Solicitation approved by Henrique Elias', notes: null, status: 'Approved', amountSpent: '0', amountTotal: '0',
    }, {
        id: 1375, cardDate: '03/24/2020', cardType: 'EVALUATION', typeDescription: '-', notes: null, status: 'Invalid', amountSpent: '0', amountTotal: '0',
    }, {
        id: 1376, cardDate: '03/24/2020', cardType: 'ACCOUNTABILITY_CREATED', typeDescription: 'Solicitation created by Henrique Elias', notes: null, status: null, amountSpent: '0', amountTotal: '0',
    }, {
        id: 1377, cardDate: '03/24/2020', cardType: 'INVALID', typeDescription: '-', notes: null, status: null, amountSpent: '0', amountTotal: '0',
    },
];

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


describe('Solicitation component', () => {
    beforeEach(() => {
        requestHeaderData.mockResolvedValue(expectedHeaderData);
        requestSidebarInfo.mockResolvedValue(expectedSidebar);
        requestTimelineData.mockResolvedValue(expectedTimelineData)
    });
    it('should render solicitation page', async () => {
        render(<Solicitation />)

        expect(await screen.findByTestId('solicitation__header')).not.toBeNull();
        expect((await screen.findAllByTestId('solicitation__timeline')).length).toEqual(9);
        expect(await screen.findByTestId('solicitation__sidebar')).not.toBeNull();
    });

    it('should show add new expense form', async () => {
        render(<Solicitation />)

        fireEvent.click(await screen.findByTestId('solicitation__new-expense-button'));
        
        expect(await screen.findByTestId('new-expense__containier')).not.toBeNull();
    });
});