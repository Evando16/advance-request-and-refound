import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers, faAsterisk, faConciergeBell, faReceipt, faUtensils,
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

import PropTypes from 'prop-types';

const TimelineContainier = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 6px;
  background-color: #fff;
  padding: 24px;
`;

const TimelineQuadrant = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: ${(props) => props.width}
`;

const TimelineIdentificationQuadrant = styled(TimelineQuadrant)`
  align-items: center;
  place-content: center;
`;

const TimelineQuadrantReceipt = styled.div`
  display: flex;
  flex-direction: row;
  place-content: center;
  flex: 1 1 0%;
  font-size: 0.875rem;
  color: #51c1c3;
  align-items: center;
`;

const TimelineReceiptLink = styled.a`
  color: #51c1c3;
  text-decoration: none;
  margin-left: 8px;
`;

const TimelineIcon = styled(FontAwesomeIcon)`
  font-size: 1.5rem;
  padding: 18px;
  margin-bottom: 18px;
  border-radius: 50%;
  background-color: ${(props) => props.backgroundcolor};
  color: ${(props) => props.color};
`;

const TimelineLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  color: #d0d3d6;
  margin-bottom: 8px;
`;

const TimelineDesription = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
  color: #545b64;
`;

const TimelineSubDescription = styled.span`
  font-size: 0.875rem;
  color: #545b64;
`;

const TimelineCurrencyLabel = styled.span`
  margin-right: 8px;
`;
const TimelineStatus = styled.span`
  font-size: 0.875rem;
  text-align: center;
  font-weight: 700;
  color: ${(props) => props.color};
  width: 65%;
  border-radius: 18px;
  border: ${(props) => props.border};
  background-color: ${(props) => props.backgroundcolor};
  margin-bottom: 8px;
  padding: 8px 0;
`;

function getStatusStyle(status) {
  switch (status.toUpperCase()) {
    case 'APPROVED':
      return { backgroundcolor: '#ecf8f8', color: '#03a046', border: '1px solid #03a046' };
    case 'PENDING':
      return { backgroundcolor: '#f0f3f7', color: '#053d4e', border: '1px solid #053d4e' };
    case 'CANCELLED':
    default:
      return { backgroundcolor: '#fde2e0', color: '#f44336', border: '1px solid #f44336' };
  }
}

function getIconColor(cardType) {
  switch (cardType) {
    case 'EVALUATION':
      return { backgroundcolor: '#f0f3f7', color: '#5f6772' };
    case 'ACCOUNTABILITY_SUBMITTED':
    case 'ACCOUNTABILITY_CREATED':
      return { backgroundcolor: '#ecf8f8', color: '#03a046' };
    default:
      return { backgroundcolor: '#e7f2fd', color: '#0f68bd' };
  }
}

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
      <TimelineContainier key={item.id} style={{ marginTop: '24px', padding: '16px' }}>
        <TimelineIdentificationQuadrant width="12%">
          <TimelineIcon icon={getCardIcon(item)} {...getIconColor(item.cardType)} />
          <TimelineSubDescription>{item.cardDate}</TimelineSubDescription>
        </TimelineIdentificationQuadrant>
        <TimelineQuadrant width="35%">
          <TimelineLabel>ACTION</TimelineLabel>
          <TimelineDesription>{item.typeDescription}</TimelineDesription>
        </TimelineQuadrant>
        {item.amountSpent !== '0' && item.amountTotal !== '0'
          && (
            <TimelineQuadrant width="20%">
              <TimelineLabel>VALUE</TimelineLabel>
              <TimelineDesription>
                <TimelineCurrencyLabel>{item.currencyCode}</TimelineCurrencyLabel>
                <span>{item.amountSpent}</span>
              </TimelineDesription>

              <TimelineSubDescription>
                <TimelineCurrencyLabel>Receipt total value:</TimelineCurrencyLabel>
                <TimelineCurrencyLabel>{item.currencyCode}</TimelineCurrencyLabel>
                <span>{item.amountTotal}</span>
              </TimelineSubDescription>
            </TimelineQuadrant>
          )}
        {item.status
          && (
            <TimelineQuadrant width="15%">
              <TimelineLabel>STATUS</TimelineLabel>
              <TimelineStatus {...getStatusStyle(item.status)}>{item.status}</TimelineStatus>
              <TimelineSubDescription>{item.notes}</TimelineSubDescription>
            </TimelineQuadrant>
          )}
        {item.resourceUrl && (
          <TimelineQuadrantReceipt>
            <FontAwesomeIcon icon={faReceipt} />
            <TimelineReceiptLink href={item.resourceUrl}>Receipt</TimelineReceiptLink>
          </TimelineQuadrantReceipt>
        )}
      </TimelineContainier>
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
