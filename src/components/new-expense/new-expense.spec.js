import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import pretty from 'pretty';

import NewExpense from './new-expense';

jest.mock('./new-expense-service.js');

describe('NewExpenseComponent', () => {
  const fileMock = {
    file: {
      lastModified: 1588893767728,
      lastModifiedDate: new Date('2020-10-10'),
      name: 'image_test.png',
      size: 377755,
      type: 'image/png',
      webkitRelativePath: '',
    },
    error: '',
  };

  const emptyExpenseMock = {
    expenseType: '',
    currency: '',
    description: '',
    receiptDate: '',
    receiptValue: '',
    valueToBePaid: '',
    receiptImage: {},
  };

  const setExpense = jest.fn();
  const onSubmit = jest.fn((event) => event.preventDefault());

  let component = null;

  describe('Component tests', () => {
    beforeEach(() => {
      component = render(
        <NewExpense expense={emptyExpenseMock} setExpense={setExpense} onSubmit={onSubmit} />,
      );
    });
    it('should render receipt value field when chose currency', () => {
      component = render(
        <NewExpense
          expense={{ ...emptyExpenseMock, currency: 'BRL' }}
          setExpense={setExpense}
          onSubmit={onSubmit}
        />,
      );

      const receiptValue = component.getByTestId('new-expense__receipt-value');
      expect(receiptValue).not.toBeNull();
    });

    it('should render to be paid field when chose currency', () => {
      component = render(
        <NewExpense
          expense={{ ...emptyExpenseMock, currency: 'BRL' }}
          setExpense={setExpense}
          onSubmit={onSubmit}
        />,
      );

      const receiptValue = component.getByTestId('new-expense__value-to-be-paid');
      expect(receiptValue).not.toBeNull();
    });

    it('should set new expense on selecting file ', () => {
      const fileInput = component.getByTestId('new-expense__file');
      fireEvent.change(fileInput, { target: { files: [fileMock.file] } });

      expect(setExpense).toHaveBeenCalledWith({ ...emptyExpenseMock, receiptImage: fileMock });
    });

    it('should file erro when file is not a .png or .jpg ', () => {
      const invalidFile = { ...fileMock.file, name: 'invalid.txt' };
      const fileInput = component.getByTestId('new-expense__file');
      fireEvent.change(fileInput, { target: { files: [invalidFile] } });

      expect(setExpense).toHaveBeenCalledWith({ ...emptyExpenseMock, receiptImage: { error: 'Arquivo deve ser .jpg ou .png', file: null } });
    });

    it('should file erro when file is not a .png or .jpg ', () => {
      const invalidFile = { ...fileMock.file, size: 2048576 };
      const fileInput = component.getByTestId('new-expense__file');
      fireEvent.change(fileInput, { target: { files: [invalidFile] } });

      expect(setExpense).toHaveBeenCalledWith({ ...emptyExpenseMock, receiptImage: { error: 'Tamanho da imagem deve ser menor que 1MB', file: null } });
    });

    it('should set new expense on change expense type ', () => {
      const typeInput = component.getByTestId('new-expense__type-select');
      fireEvent.change(typeInput, { target: { value: 'hotel-fee' } });

      expect(setExpense).toHaveBeenCalledWith({ ...emptyExpenseMock, expenseType: 'hotel-fee' });
    });

    it('should set new expense on change description ', () => {
      const descriptionInput = component.getByTestId('new-expense__description');
      fireEvent.change(descriptionInput, { target: { value: 'description value' } });

      expect(setExpense).toHaveBeenCalledWith({ ...emptyExpenseMock, description: 'description value' });
    });

    it('should set new expense on change receipt date ', () => {
      const receiptDateInput = component.getByTestId('new-expense__receipt-date');
      fireEvent.change(receiptDateInput, { target: { value: '2020-01-10' } });

      expect(setExpense).toHaveBeenCalledWith({ ...emptyExpenseMock, receiptDate: '2020-01-10' });
    });

    it('should set new expense on change currency ', () => {
      const currencyInput = component.getByTestId('new-expense__currency-select');
      fireEvent.change(currencyInput, { target: { value: 'BRL' } });

      expect(setExpense).toHaveBeenCalledWith({ ...emptyExpenseMock, currency: 'BRL' });
    });

    it('should set new expense on change receipt value ', () => {
      component = render(
        <NewExpense
          expense={{ ...emptyExpenseMock, currency: 'BRL' }}
          setExpense={setExpense}
          onSubmit={onSubmit}
        />,
      );

      const receiptValueInput = component.getByTestId('new-expense__receipt-value');
      fireEvent.change(receiptValueInput, { target: { value: '1616.16' } });

      expect(setExpense).toHaveBeenCalledWith({ ...emptyExpenseMock, currency: 'BRL', receiptValue: '1616.16' });
    });

    it('should set new expense on change value to be paid', () => {
      component = render(
        <NewExpense
          expense={{ ...emptyExpenseMock, currency: 'BRL' }}
          setExpense={setExpense}
          onSubmit={onSubmit}
        />,
      );

      const valueToBePaidInput = component.getByTestId('new-expense__value-to-be-paid');
      fireEvent.change(valueToBePaidInput, { target: { value: '100.16' } });

      expect(setExpense).toHaveBeenCalledWith({ ...emptyExpenseMock, currency: 'BRL', valueToBePaid: '100.16' });
    });

    it('should save new expense', () => {
      const btn = component.getByTestId('new-expense__btn-submit');
      expect(onSubmit).not.toHaveBeenCalled();
      fireEvent.click(btn);

      expect(onSubmit).toHaveBeenCalled();
    });
  });

  describe('Snapshot tests', () => {
    it('should render new expense component without conditional fields', () => {
      const expenseMock = {
        expenseType: 'food',
        currency: '',
        description: 'description',
        receiptDate: '2020-10-10',
        receiptValue: '',
        valueToBePaid: '',
        receiptImage: fileMock,
      };
      component = render(
        <NewExpense expense={expenseMock} setExpense={setExpense} onSubmit={onSubmit} />,
      );

      expect(pretty(component.container.innerHTML)).toMatchSnapshot();
    });

    it('should render new expense component with conditional fields', () => {
      const expenseMock = {
        expenseType: 'food',
        currency: 'BRL',
        description: 'description',
        receiptDate: '2020-10-10',
        receiptValue: '16',
        valueToBePaid: '10',
        receiptImage: fileMock,
      };
      component = render(
        <NewExpense expense={expenseMock} setExpense={setExpense} onSubmit={onSubmit} />,
      );

      const input = component.getByTestId('new-expense__currency-select');
      fireEvent.change(input, { target: { value: 'BRL' } });

      expect(pretty(component.container.innerHTML)).toMatchSnapshot();
    });
  });
});
