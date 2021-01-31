import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers, faAsterisk, faConciergeBell, faReceipt, faUtensils,
} from '@fortawesome/free-solid-svg-icons';

import PropTypes from 'prop-types';

function getExpenseIcon(timeLineItem) {
  switch (timeLineItem.expenseTypeIcon) {
    case 'utensils':
      return faUtensils;
    default:
      return faConciergeBell;
  }
}

export function getCardIcon(timeLineItem) {
  switch (timeLineItem.cardType) {
    case 'EVALUATION':
      return faUsers;
    case 'ACCOUNTABILITY_SUBMITTED':
    case 'ACCOUNTABILITY_CREATED':
      return faAsterisk;
    default:
      return getExpenseIcon(timeLineItem);
  }
}

export default function Timeline({ timelineData }) {
  return (
    timelineData.map((item) => (
      <div key={item.id} style={{ marginTop: '24px', padding: '16px' }}>
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
      </div>
    ))
  );
}

Timeline.propTypes = {
  timelineData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    cardType: PropTypes.string.isRequired,
    cardDate: PropTypes.string.isRequired,
    expenseTypeIcon: PropTypes.string,
    typeDescription: PropTypes.string,
    status: PropTypes.string,
    notes: PropTypes.string,
    amountSpent: PropTypes.string,
    amountTotal: PropTypes.string,
    resourceUrl: PropTypes.string,
  })).isRequired,
};
