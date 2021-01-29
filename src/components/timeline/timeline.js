import React, { useEffect, useState } from 'react';
import { Card, Button } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers, faAsterisk, faConciergeBell, faReceipt,
} from '@fortawesome/free-solid-svg-icons';

import requestTimelineData from './timeline-service';

export function getCardIcon(cardType) {
  switch (cardType) {
    case 'EVALUATION':
      return faUsers;
    case 'ACCOUNTABILITY_SUBMITTED':
    case 'ACCOUNTABILITY_CREATED':
      return faAsterisk;
    case 'EXPENSE':
      return faConciergeBell;
    default:
      return null;
  }
}

export default function Timeline() {
  const [timelineData, setTimelineData] = useState([]);

  useEffect(() => {
    async function getTimelineData() {
      setTimelineData(await requestTimelineData());
    }

    getTimelineData();
  }, []);

  // remove this and use improve
  if (!timelineData.length) {
    return 'No timeline content =(';
  }

  // need some answers about layout and API to finish the elements logic and layout
  return (
    timelineData.map((item) => (
      <Card key={item.id} style={{ marginTop: '24px', padding: '16px' }}>
        <div>
          <FontAwesomeIcon icon={getCardIcon(item.cardType)} />
          <span>{item.cardDate}</span>
        </div>
        <div>
          <span>TIPO</span>
          <span>Aprovação da Solicitação Henrique Elias</span>
        </div>
        {!!item.amountSpent && item.amountTotal
          && (
            <div>
              <span>VALOR</span>
              <span>{item.amountSpent}</span>
              <span>{item.amountTotal}</span>
            </div>
          )}
        {item.status
          && (
            <div>
              <span>STATUS</span>
              <span>{item.status}</span>
              <span>{item.notes}</span>
            </div>
          )}
        {item.resourceUrl && (
          <div>
            <Button>
              <FontAwesomeIcon icon={faReceipt} />
              Ver nota fiscal
            </Button>
          </div>
        )}
      </Card>
    ))
  );
}
