import React from 'react';
import { faReceipt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@material-ui/core';

import Header from '../components/header/header';
import Timeline from '../components/timeline/timeline';
import NewExpense from '../components/new-expense/new-expense';

export default function Solicitation() {
  return (
    <>
      <Header />
      <Button variant="outlined">
        <FontAwesomeIcon icon={faReceipt} />
        Adicionar Despesa
      </Button>
      <NewExpense />
      <Timeline />
    </>
  );
}
