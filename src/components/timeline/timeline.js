import React, { useEffect, useState } from 'react';
import { Card, Button } from '@material-ui/core';
import {
  Group as GroupIcon,
  Flare as FlareIcon,
  RoomService as RoomServiceIcon,
  Receipt as ReceiptIcon,
} from '@material-ui/icons';
import PropTypes from 'prop-types';

import requestTimelineData from './timeline-service';

export function CardIcon({ type }) {
  switch (type) {
    case 'EVALUATION':
      return <GroupIcon fontSize="small" />;
    case 'ACCOUNTABILITY_SUBMITTED':
    case 'ACCOUNTABILITY_CREATED':
      return <FlareIcon fontSize="small" />;
    case 'EXPENSE':
      return <RoomServiceIcon fontSize="small" />;
    default:
      return null;
  }
}

CardIcon.propTypes = {
  type: PropTypes.string.isRequired,
};

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
          <CardIcon type={item.cardType} />
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
              <ReceiptIcon fontSize="small" />
              Ver nota fiscal
            </Button>
          </div>
        )}
      </Card>
    ))
  );
}
