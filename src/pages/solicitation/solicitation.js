import React, { useEffect, useState } from 'react';
import { faReceipt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Header from '../../components/header/header';
import Timeline from '../../components/timeline/timeline';
import NewExpense from '../../components/new-expense/new-expense';
import Sidebar from '../../components/sidebar/sidebar';
import saveExpense from '../../components/new-expense/new-expense-service';
import { requestHeaderData, requestTimelineData } from './solicitation-service';

export function saveNewExpense(expense) {
  saveExpense(expense)
    .then(() => {
      // change to use react.context
      // setSnackbar({ open: true, message: 'Despesa salva com sucesso :)', type: 'sucess' });
      // toggleVision();
    })
    .catch(() => {
      // change to use react.context
      // setSnackbar({ open: true, message: 'error' type: 'error' });
    });
}

export default function Solicitation() {
  const [timelineData, setTimelineData] = useState([]);
  const [headerData, setHeaderData] = useState(null);
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

  useEffect(() => {
    requestHeaderData()
      .then((result) => setHeaderData(result))
      .catch((error) => console.log(error.message));

    requestTimelineData()
      .then((result) => setTimelineData(result))
      .catch((error) => console.log(error.message));
  }, []);

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
      {headerData && <Header headerData={headerData} setHeaderData={setHeaderData} />}
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
      <Timeline timelineData={timelineData} />
      <Sidebar />
    </>
  );
}
