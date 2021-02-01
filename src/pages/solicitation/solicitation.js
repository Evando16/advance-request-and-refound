import React, { useEffect, useState } from 'react';
import { faReceipt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

import Header from '../../components/header/header';
import Timeline from '../../components/timeline/timeline';
import NewExpense from '../../components/new-expense/new-expense';
import Sidebar from '../../components/sidebar/sidebar';
import {
  requestSidebarInfo, requestHeaderData, requestTimelineData, saveExpense,
} from './solicitation-service';

const SolicitationContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const SolicitationContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 77%;
`;

const SolicitationSidebar = styled.div`
  width: 20%;
  background-color: #fff;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const NewExpenseButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 15%;
  font-size: 1rem;
  padding: 1vh 0;
  margin: 2vh 0;
  color: #6b7480;
  background-color: #fff;
  border-radius: 6px;
  border: solid 1px #6b7480;
  cursor: pointer;
  
  &:focus {
    outline: none;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 5%;
`;

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
  const [sidebarData, setSidebarData] = useState([]);

  useEffect(() => {
    requestHeaderData()
      .then((result) => setHeaderData(result));
    // .catch((error) => console.log(error.message));

    requestTimelineData()
      .then((result) => setTimelineData(result));
    // .catch((error) => console.log(error.message));

    requestSidebarInfo()
      .then((result) => setSidebarData(result));
    // .catch((error) => console.log(error.message));
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
    <SolicitationContainer>
      <SolicitationContent>
        {headerData
          && (
            <Header
              data-testid="solicitation__header"
              headerData={headerData}
              setHeaderData={setHeaderData}
            />
          )}
        <ButtonContainer>
          <NewExpenseButton type="button" onClick={toggleNewExpense}>
            <Icon icon={faReceipt} />
            Adicionar Despesa
          </NewExpenseButton>
        </ButtonContainer>
        {showNewExpense
          && (
            <NewExpense
              expense={newExpense}
              setExpense={setNewExpense}
              onCancel={toggleNewExpense}
              onSubmit={onSubmitNewExpense}
            />
          )}
        {timelineData.length > 0
          && (
            <Timeline
              data-testid="solicitation__timeline"
              timelineData={timelineData}
            />
          )}
      </SolicitationContent>
      {sidebarData.length > 0
        && (
          <SolicitationSidebar>
            <Sidebar
              data-testid="solicitation__sidebar"
              sidebarData={sidebarData}
            />
          </SolicitationSidebar>
        )}
    </SolicitationContainer>
  );
}
