import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CURRENCY_OPTIONS = [
  { value: '', description: '' },
  { value: 'BRL', description: 'BRL' },
  { value: 'USD', description: 'USD' },
  { value: 'MXN', description: 'MXN' },
];

const EXPENSE_TYPE_OPTIONS = [
  { value: '', description: '' },
  { value: 'hotel-fee', description: 'Hotel' },
  { value: 'food', description: 'Food' },
  { value: 'transport', description: 'Transport' },
];

const NewExpenseContainer = styled.div`
  background-color: #fafbfc;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .14), 0 1px 3px 0 rgba(0, 0, 0, .12);
  border-radius: 6px;
  margin-bottom: 1.5rem;
`;

const NewExpenseTitle = styled.span`
  color: #353a40;
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0 0 0 3%;
`;

const NewExpenseForm = styled.form`
  margin-top: 3%;
`;

const NewExpenseFormActions = styled.div`
  display: flex;
  flex-direction: row;
  place-content: flex-end;
  margin-top: 1rem;
  padding: 2% 3%;
  background-color: #fff;

  @media (max-width: 599px) {
    place-content: space-around;
  }
`;

const NewExpenseFormButton = styled.button`
  border: none;
  padding: 1% 3%;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

const NewExpenseFormSaveButton = styled(NewExpenseFormButton)`
  color: #fff;
  background-color: #51c1c3;
`;

const NewExpenseFormCancelButton = styled(NewExpenseFormButton)`
  color: #6b7480;
  background-color: #fff;
  border: 1px solid #6b7480;
  
  @media (min-width: 599px) {
    margin-right: 1.5rem;
  }
`;

const NewExpenseFileContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 48%;
  background-color: #fff;
  place-content: center;
  align-items: center;

    
  @media (max-width: 599px) {
    width: unset;
    margin-bottom: 1rem;
  }
`;

const NewExpenseFile = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 50%;
`;

const NewExpenseFileButton = styled.label`
  display: flex;
  flex-direction: row;
  place-content: center;
  align-items: center;
  border: 1px dashed #dfe2e6;
  cursor: pointer;
  border-radius: 6px;
  height: 50%;
`;

const NewExpenseHint = styled.span`
  font-size: .75rem;
  color: ${(props) => (props.color ? props.color : '#848a91')};
`;

const NewExpenseContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 1rem 3% 0 3%;

  @media (max-width: 599px) {
    flex-direction: column;
  }
`;

const NewExpenseSpanFieldTitle = styled.span`
  margin-bottom: 6%;
  font-size: 1rem;
  font-weight: 700;
  color: #343a42;
`;

const NewExpenseField = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  font-weight: 700;
  color: #343a42;
  margin: ${(props) => props.margin};
  width: ${(props) => props.width};
`;

const NewExpenseFieldLabel = styled.span`
  margin: ${(props) => props.margin};
`;

const NewExpenseFieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 48%;
  
  @media (max-width: 599px) {
    width: unset;
  }
`;

const NewExpenseSelectField = styled.select`
  border: 1px solid #dfe2e6;
  background-color: #fff;
  border-radius: 6px;
  padding: 6px;
  font-size: 1rem;
  color: #343a42;
  font-family: 'Nunito Sans', sans-serif;

  &:focus {
    outline: none;
    border: 1px solid #6b7480;
  }
`;

const NewExpenseSelectOption = styled.option`
  font-size: 1rem;
  color: #343a42;
`;

const NewExpenseInputField = styled.input`
  border: 1px solid #dfe2e6;
  background-color: #fff;
  border-radius: 6px;
  padding: 6px;
  font-size: 1rem;
  color: #343a42;
  font-family: 'Nunito Sans', sans-serif;

  &:focus {
    outline: none;
    border: 1px solid #6b7480;
  }
`;

const NewExpenseCurrencyInfoFieldContainier = styled.div`
  display: flex;
  flex-direction: row;
  place-content: space-between;
`;

// TODO improve cancel action (if there is data)
export default function NewExpense({
  expense, setExpense, onCancel, onSubmit,
}) {
  const onChangeExpenseType = (event) => {
    setExpense({ ...expense, expenseType: event.target.value });
  };

  const onChangeCurrency = (event) => {
    setExpense({ ...expense, currency: event.target.value });
  };

  const onChangeDescription = (event) => {
    setExpense({ ...expense, description: event.target.value });
  };

  const onChangeReceiptDate = (event) => {
    setExpense({ ...expense, receiptDate: event.target.value });
  };

  const onChangeReceiptValue = (event) => {
    setExpense({ ...expense, receiptValue: event.target.value });
  };

  const onChangeValueToBePaid = (event) => {
    setExpense({ ...expense, valueToBePaid: event.target.value });
  };

  const onChangeReceiptImage = (event) => {
    const file = event.target.files[0];
    const fileExtetion = file.name.split('.').pop().toLowerCase();
    const maxFileSizeMB = 1048576;
    const receipt = {
      file: null,
      error: '',
    };

    if (fileExtetion !== 'jpg' && fileExtetion !== 'png') {
      receipt.error = 'File must be .jpg or .png';
    } else if (file.size > maxFileSizeMB) {
      receipt.error = 'File exceeds the max size of 1MB, please choose another file';
    } else {
      receipt.file = file;
    }

    setExpense({ ...expense, receiptImage: receipt });
  };

  return (
    <NewExpenseContainer data-testid="new-expense__containier">
      <NewExpenseForm onSubmit={onSubmit}>
        <NewExpenseTitle>New expense</NewExpenseTitle>
        <NewExpenseContent>
          <NewExpenseFileContainer>
            <NewExpenseFile>
              <NewExpenseSpanFieldTitle>Receipt or invoice*</NewExpenseSpanFieldTitle>
              <NewExpenseFileButton htmlFor="new-expense__file">
                <span>Select file</span>
                <input
                  id="new-expense__file"
                  data-testid="new-expense__file"
                  style={{ display: 'none' }}
                  onChange={onChangeReceiptImage}
                  accept=".jpg,.png"
                  type="file"
                />
              </NewExpenseFileButton>
              <NewExpenseHint>Just JPG or PNG images are accepted</NewExpenseHint>
              {!!expense.receiptImage.error
                && <NewExpenseHint color="#f44336">{expense.receiptImage.error}</NewExpenseHint>}
            </NewExpenseFile>
          </NewExpenseFileContainer>
          <NewExpenseFieldsContainer>
            <NewExpenseField htmlFor="new-expense__type-selec" margin="0 0 1rem 0">
              <NewExpenseFieldLabel margin="0 0 .5rem 0">Type*</NewExpenseFieldLabel>
              <NewExpenseSelectField
                id="new-expense__type-select"
                data-testid="new-expense__type-select"
                required
                value={expense.expenseType}
                onChange={onChangeExpenseType}
              >
                {EXPENSE_TYPE_OPTIONS.map((item) => (
                  <NewExpenseSelectOption
                    key={item.value}
                    value={item.value}
                  >
                    {item.description}
                  </NewExpenseSelectOption>
                ))}
              </NewExpenseSelectField>
            </NewExpenseField>
            <NewExpenseField htmlFor="new-expense__description" margin="0 0 1rem 0">
              <NewExpenseFieldLabel margin="0 0 .5rem 0">Expense description*</NewExpenseFieldLabel>
              <NewExpenseInputField
                required
                id="new-expense__description"
                data-testid="new-expense__description"
                value={expense.description}
                onChange={onChangeDescription}
              />
            </NewExpenseField>
            <NewExpenseField htmlFor="new-expense__receipt-date" margin="0 0 1rem 0">
              <NewExpenseFieldLabel margin="0 0 .5rem 0">Receipt date*</NewExpenseFieldLabel>
              <NewExpenseInputField
                required
                id="new-expense__receipt-date"
                data-testid="new-expense__receipt-date"
                value={expense.receiptDate}
                onChange={onChangeReceiptDate}
                pattern="\d{4}-\d{2}-\d{2}"
                type="date"
                min="1900-01-01"
                max="2077-01-01"
              />
            </NewExpenseField>
            <NewExpenseField htmlFor="new-expense__currency-select" margin="0 0 1rem 0">
              <NewExpenseFieldLabel margin="0 0 .5rem 0">Currency*</NewExpenseFieldLabel>
              <NewExpenseSelectField
                required
                data-testid="new-expense__currency-select"
                id="new-expense__currency-select"
                value={expense.currency}
                onChange={onChangeCurrency}
              >
                {CURRENCY_OPTIONS.map((item) => (
                  <NewExpenseSelectOption
                    key={item.value}
                    value={item.value}
                  >
                    {item.description}
                  </NewExpenseSelectOption>
                ))}
              </NewExpenseSelectField>
            </NewExpenseField>
            <NewExpenseCurrencyInfoFieldContainier>
              <NewExpenseField htmlFor="new-expense__receipt-value" width="45%">
                <NewExpenseFieldLabel margin="0 0 .5rem 0">Receipt value*</NewExpenseFieldLabel>
                <NewExpenseInputField
                  id="new-expense__receipt-value"
                  data-testid="new-expense__receipt-value"
                  type="number"
                  min="0"
                  required
                  value={expense.receiptValue}
                  onChange={onChangeReceiptValue}
                />
              </NewExpenseField>
              <NewExpenseField htmlFor="new-expense__value-to-be-paid" width="45%">
                <NewExpenseFieldLabel margin="0 0 .5rem 0">To be paid value*</NewExpenseFieldLabel>
                <NewExpenseInputField
                  id="new-expense__value-to-be-paid"
                  data-testid="new-expense__value-to-be-paid"
                  type="number"
                  min="0"
                  required
                  value={expense.valueToBePaid}
                  onChange={onChangeValueToBePaid}
                />
              </NewExpenseField>
            </NewExpenseCurrencyInfoFieldContainier>
          </NewExpenseFieldsContainer>
        </NewExpenseContent>
        <NewExpenseFormActions>
          <NewExpenseFormCancelButton
            id="new-expense__btn-cancel"
            data-testid="new-expense__btn-cancel"
            type="button"
            onClick={onCancel}
          >
            Cancelar
          </NewExpenseFormCancelButton>

          <NewExpenseFormSaveButton
            id="new-expense__btn-submit"
            data-testid="new-expense__btn-submit"
            type="submit"
          >
            Salvar
          </NewExpenseFormSaveButton>
        </NewExpenseFormActions>
      </NewExpenseForm>
    </NewExpenseContainer>
  );
}

NewExpense.propTypes = {
  setExpense: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  expense: PropTypes.shape({
    expenseType: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    receiptDate: PropTypes.string.isRequired,
    receiptValue: PropTypes.string.isRequired,
    valueToBePaid: PropTypes.string.isRequired,
    receiptImage: PropTypes.shape({
      error: PropTypes.string,
      file: PropTypes.shape({
        lastModified: PropTypes.number.isRequired,
        lastModifiedDate: PropTypes.objectOf(Date).isRequired,
        name: PropTypes.string.isRequired,
        size: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired,
        webkitRelativePath: PropTypes.string.isRequired,
      }),
    }),
  }).isRequired,
};
