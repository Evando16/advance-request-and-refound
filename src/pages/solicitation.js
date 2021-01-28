import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import {
  Receipt as ReceiptIcon,
} from '@material-ui/icons';

import Header from '../components/header/header';
import Timeline from '../components/timeline/timeline';
import NewExpense from '../components/new-expense/new-expense';

export default function Solicitation({ setSnackbar }) {
  const [showNewExpense, setNewExpense] = useState(false);

  function toggleNewExpense() {
    setNewExpense(!showNewExpense);
  }

  return (
    <>
      <Header />
      <Button variant="outlined" onClick={toggleNewExpense}>
        <ReceiptIcon fontSize="small" />
        Adicionar Despesa
      </Button>
      {showNewExpense && <NewExpense toggleVision={toggleNewExpense} setSnackbar={setSnackbar} />}
      <Timeline />
    </>
  );
}

Solicitation.propTypes = {
  setSnackbar: PropTypes.func.isRequired,
};
