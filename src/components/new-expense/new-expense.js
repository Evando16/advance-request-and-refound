import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

const CURRENCY_OPTIONS = [
  { value: '', description: '' },
  { value: 'BRL', description: 'BRL' },
  { value: 'USD', description: 'USD' },
  { value: 'MXN', description: 'MXN' },
];

const EXPENSE_TYPE_OPTIONS = [
  { value: '', description: '' },
  { value: 'hotel-fee', description: 'Hotel' },
  { value: 'food', description: 'Alimentação' },
  { value: 'transport', description: 'Transporte' },
];

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
      receipt.error = 'Arquivo deve ser .jpg ou .png';
    } else if (file.size > maxFileSizeMB) {
      receipt.error = 'Tamanho da imagem deve ser menor que 1MB';
    } else {
      receipt.file = file;
    }

    setExpense({ ...expense, receiptImage: receipt });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <div>
            <span>Nova despesa</span>
          </div>
          <div>
            <div>
              <div>
                <span>Recibo, cupom ou nota fiscal*</span>
                <FontAwesomeIcon icon={faQuestionCircle} />
              </div>
              <label htmlFor="new-expense__file" style={{ border: '1px dashed black', cursor: 'pointer' }}>
                Select file
                <input
                  id="new-expense__file"
                  data-testid="new-expense__file"
                  style={{ display: 'none' }}
                  onChange={onChangeReceiptImage}
                  accept=".jpg,.png"
                  type="file"
                />
              </label>
              <span>A imagem deve estar no formato JPG ou PNG.</span>
            </div>
            <div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label htmlFor="new-expense__type-selec">
                  Tipo
                  <select
                    id="new-expense__type-select"
                    data-testid="new-expense__type-select"
                    required
                    value={expense.expenseType}
                    onChange={onChangeExpenseType}
                  >
                    {EXPENSE_TYPE_OPTIONS.map((item) => (
                      <option key={item.value} value={item.value}>{item.description}</option>
                    ))}
                  </select>
                </label>
                <label htmlFor="new-expense__description">
                  Descrição da despesa
                  <input
                    required
                    id="new-expense__description"
                    data-testid="new-expense__description"
                    value={expense.description}
                    onChange={onChangeDescription}
                  />
                </label>
                <label htmlFor="new-expense__receipt-date">
                  Data do comprovante
                  <input
                    required
                    id="new-expense__receipt-date"
                    data-testid="new-expense__receipt-date"
                    value={expense.receiptDate}
                    onChange={onChangeReceiptDate}
                    type="date"
                    min="1900-01-01"
                    max="2077-01-01"
                  />
                </label>
                <label htmlFor="new-expense__currency-select">
                  Moeda
                  <select
                    required
                    data-testid="new-expense__currency-select"
                    id="new-expense__currency-select"
                    value={expense.currency}
                    onChange={onChangeCurrency}
                  >
                    {CURRENCY_OPTIONS.map((item) => (
                      <option key={item.value} value={item.value}>{item.description}</option>
                    ))}
                  </select>
                </label>
                {expense.currency && (
                  <>
                    <input
                      id="new-expense__receipt-value"
                      data-testid="new-expense__receipt-value"
                      type="number"
                      min="0"
                      required
                      label="Valor da nota / cupom"
                      value={expense.receiptValue}
                      onChange={onChangeReceiptValue}
                    />
                    <input
                      id="new-expense__value-to-be-paid"
                      data-testid="new-expense__value-to-be-paid"
                      type="number"
                      min="0"
                      required
                      label="Valor a ser considerado"
                      value={expense.valueToBePaid}
                      onChange={onChangeValueToBePaid}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div>
              <button
                id="new-expense__btn-cancel"
                data-testid="new-expense__btn-cancel"
                type="button"
                onClick={onCancel}
              >
                Cancelar
              </button>
            </div>
            <div>
              <button
                id="new-expense__btn-submit"
                data-testid="new-expense__btn-submit"
                type="submit"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
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
