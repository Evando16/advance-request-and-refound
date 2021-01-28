import React, { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
  Grid,
} from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ptBrLocale from 'date-fns/locale/pt-BR';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

import { Help as HelpIcon } from '@material-ui/icons';
import saveExpense from './new-expense-service';

const CURRENCY_OPTIONS = [
  { value: 'BRL', description: 'BRL' },
  { value: 'USD', description: 'USD' },
  { value: 'MXN', description: 'MXN' },
];

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...others } = props;
  return (
    <NumberFormat
      {...others}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      thousandSeparator
      decimalScale={2}
      fixedDecimalScale
      isNumericString
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default function NewExpense({ toggleVision, setSnackbar }) {
  const [expense, setExpense] = useState({
    expenseType: '',
    currency: '',
    description: '',
    receiptDate: null,
    receiptValue: '',
    valueToBePaid: '',
    receiptImage: {},
  });

  const onChangeExpenseType = (event) => {
    setExpense({ ...expense, expenseType: event.target.value });
  };

  const onChangeCurrency = (event) => {
    setExpense({ ...expense, currency: event.target.value });
  };

  const onChangeDescription = (event) => {
    setExpense({ ...expense, description: event.target.value });
  };

  const onChangeReceiptDate = (date) => {
    setExpense({ ...expense, receiptDate: date });
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

  function isFormValid() {
    if (!expense.expenseType
      && !expense.currency
      && !expense.description
      && !expense.receiptDate
      && !expense.receiptValue
      && !expense.valueToBePaid
      && !expense.receiptImage.error) {
      return false;
    }
    return true;
  }

  function saveNewExpense() {
    if (isFormValid) {
      saveExpense(expense)
        .then(() => {
          setSnackbar({ open: true, message: 'Despesa salva com sucesso :)', type: 'sucess' });
          toggleVision();
        })
        .catch(() => {
          // LOG ERROR IN SOME API
          setSnackbar({ open: true, message: 'Ops... Um erro aconteceu na hora de salvar sua despesa :(', type: 'error' });
        });
    }
  }

  return (
    <Card>
      <form onSubmit={saveNewExpense}>
        <CardContent>
          <div>
            <span>Nova despesa</span>
          </div>
          <div>
            <div>
              <div>
                <span>Recibo, cupom ou nota fiscal*</span>
                <HelpIcon fontSize="small" />
              </div>
              <label htmlFor="contained-button-file">
                <Button variant="outlined" color="primary" component="span" style={{ borderStyle: 'dashed' }}>
                  Selecione um arquivo do seu computador
                </Button>
                <input
                  id="contained-button-file"
                  style={{ display: 'none' }}
                  onChange={onChangeReceiptImage}
                  accept=".jpg,.png"
                  type="file"
                />
              </label>
              <span>A imagem deve estar no formato JPG ou PNG.</span>
              {expense.receiptImage.file
                && <span>{JSON.stringify(expense.receiptImage.file)}</span>}
            </div>
            <div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <FormControl required>
                  <InputLabel id="new-expense__type-label">Tipo</InputLabel>
                  <Select
                    labelId="new-expense__type"
                    id="new-expense__type-select"
                    value={expense.expenseType}
                    onChange={onChangeExpenseType}
                  >
                    <MenuItem value="hotel-fee">Hotel</MenuItem>
                    <MenuItem value="food">Alimentação</MenuItem>
                    <MenuItem value="transport">Transporte</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  required
                  id="new-expense__description"
                  label="Descrição da despesa"
                  value={expense.description}
                  onChange={onChangeDescription}
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBrLocale}>
                  <KeyboardDatePicker
                    required
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="new-expense__receipt-date"
                    label="Data do comprovante"
                    value={expense.receiptDate}
                    onChange={onChangeReceiptDate}
                    autoOk
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                    invalidDateMessage="Data inválida"
                    maxDateMessage="Data não deve ser maior do que a data máxima"
                    minDateMessage="Data não deve ser menor do que a data mínima"
                  />
                </MuiPickersUtilsProvider>
                <FormControl required>
                  <InputLabel id="new-expense__currency-label">Moeda</InputLabel>
                  <Select
                    labelId="new-expense__currency"
                    id="new-expense__currency-select"
                    value={expense.currency}
                    onChange={onChangeCurrency}
                  >
                    {CURRENCY_OPTIONS.map((item) => (
                      <MenuItem key={item.value} value={item.value}>{item.description}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {expense.currency && (
                  <>
                    <TextField
                      required
                      id="new-expense__receipt-value"
                      label="Valor da nota / cupom"
                      value={expense.receiptValue}
                      onChange={onChangeReceiptValue}
                      InputProps={{
                        inputComponent: NumberFormatCustom,
                      }}
                    />
                    <TextField
                      required
                      id="new-expense__value-to-be-paid"
                      label="Valor a ser considerado"
                      value={expense.valueToBePaid}
                      onChange={onChangeValueToBePaid}
                      InputProps={{
                        inputComponent: NumberFormatCustom,
                      }}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </CardContent>
        <CardActions>
          <Grid container justify="flex-end" spacing={2}>
            <Grid item>
              <Button variant="outlined" color="primary" onClick={toggleVision}>
                Cancelar
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={saveNewExpense}>
                Salvar
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </form>
    </Card>
  );
}

NewExpense.propTypes = {
  toggleVision: PropTypes.func.isRequired,
  setSnackbar: PropTypes.func.isRequired,
};
