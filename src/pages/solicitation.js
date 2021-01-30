import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { faReceipt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Header from '../components/header/header';
import Timeline from '../components/timeline/timeline';
import NewExpense from '../components/new-expense/new-expense';
import Sidebar from '../components/sidebar/sidebar';
import saveExpense from '../components/new-expense/new-expense-service';

export function saveNewExpense(expense) {
  saveExpense(expense)
    .then(() => {
      // change to use react.context
      // setSnackbar({ open: true, message: 'Despesa salva com sucesso :)', type: 'sucess' });
      toggleVision();
    })
    .catch(() => {
      // change to use react.context
      // setSnackbar({ open: true, message: 'Ops... Um erro aconteceu na hora de salvar sua despesa :(', type: 'error' });
    });
}

export default function Solicitation({ setSnackbar }) {
  const [showNewExpense, setShowNewExpense] = useState(false);
  const [newExpense, setNewExpense] = useState({
    expenseType: '',
    currency: '',
    description: '',
    receiptDate: '',
    receiptValue: '',
    valueToBePaid: '',
    receiptImage: {},
  });

  function toggleNewExpense() {
    setShowNewExpense(!showNewExpense);
  }

  function onSubmitNewExpense(event) {
    if (!newExpense.receiptImage.error && !!newExpense.receiptImage.file) {
      saveNewExpense(newExpense);
    } else {
      event.preventDefault();
    }
  }

  return (
    <>
      <Header />
      <button type="button" onClick={toggleNewExpense}>
        <FontAwesomeIcon icon={faReceipt} />
        Adicionar Despesa
      </button>
      {showNewExpense
        && (
          <NewExpense
            expense={newExpense}
            setExpense={setNewExpense}
            onSubmit={onSubmitNewExpense}
          />
        )}
      <Timeline />
      <Sidebar />
    </>
  );
}

Solicitation.propTypes = {
  setSnackbar: PropTypes.func.isRequired,
};
