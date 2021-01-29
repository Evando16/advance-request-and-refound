import React, { useEffect, useState } from 'react';
import { Card } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers, faAsterisk, faConciergeBell, faReceipt, faUtensils,
} from '@fortawesome/free-solid-svg-icons';

import requestTimelineData from './timeline-service';

function getExpenseIcon(timeLineItem) {
  switch (timeLineItem.expenseTypeIcon) {
    case 'utensils':
      return faUtensils;
    case 'concierge-bell':
      return faConciergeBell;
    default:
      return null;
  }
}

export function getCardIcon(timeLineItem) {
  switch (timeLineItem.cardType) {
    case 'EVALUATION':
      return faUsers;
    case 'ACCOUNTABILITY_SUBMITTED':
    case 'ACCOUNTABILITY_CREATED':
      return faAsterisk;
    case 'EXPENSE':
      return getExpenseIcon(timeLineItem);
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

  return (
    timelineData.map((item) => (
      <Card key={item.id} style={{ marginTop: '24px', padding: '16px' }}>
        <div>
          <FontAwesomeIcon icon={getCardIcon(item)} />
          <span>{item.cardDate}</span>
        </div>
        <div>
          <span>TYPE</span>
          <span>{item.typeDescription}</span>
        </div>
        {item.amountSpent !== '0' && item.amountTotal !== '0'
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
            <FontAwesomeIcon icon={faReceipt} />
            <a href={item.resourceUrl}>Receipt</a>
          </div>
        )}
      </Card>
    ))
  );
}
