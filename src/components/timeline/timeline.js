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
  flex-wrap: wrap;
  border-radius: 6px;
  background-color: #fff;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  
  @media screen and (max-width: 959px) {
    flex-direction: column;
  }
  
`;

const TimelineSubContainier = styled.div`
  display: flex;
  flex-grow: 1;
  min-width: 50%;
  
  @media screen and (min-width: 600px) and (max-width: 959px) {
    margin: ${(props) => props.margin};
    min-width: unset;
  }

  @media screen and (max-width: 599px) {
    flex-direction: column;    
  }
`;

const TimelineQuadrant = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: ${(props) => props.width};
  min-width: ${(props) => props.minWidth};
  margin-right: 1rem;

  @media screen and (min-width: 600px) and (max-width: 959px) {
    width: ${(props) => props.widthSm};
  }

  @media screen and (max-width: 599px) {
    width: unset;
    margin-bottom: 0.625rem;
  }
`;

const TimelineIdentificationQuadrant = styled(TimelineQuadrant)`
  align-items: center;
  place-content: center;
`;

const TimelineQuadrantReceipt = styled.div`
  display: flex;
  flex-direction: row;
  place-content: center;
  flex-grow: 2;
  font-size: .875rem;
  color: #51c1c3;
  align-items: center;

  @media screen and (max-width: 599px) {
    place-content: start;
  }
`;

const TimelineReceiptLink = styled.a`
  color: #51c1c3;
  text-decoration: none;
  margin-left: .5rem;
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
  font-size: .75rem;
  font-weight: 700;
  color: #d0d3d6;
  margin-bottom: .5rem;
`;

const TimelineDesription = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
  color: #545b64;
`;

const TimelineSubDescription = styled.span`
  font-size: .875rem;
  color: #545b64;
`;

const TimelineCurrencyLabel = styled.span`
  margin-right: .5rem;
`;
const TimelineStatus = styled.span`
  font-size: .875rem;
  text-align: center;
  font-weight: 700;
  color: ${(props) => props.color};
  border-radius: 18px;
  border: ${(props) => props.border};
  background-color: ${(props) => props.backgroundcolor};
  margin-bottom: .5rem;
  padding: .5rem 0;
  min-width: 150px;
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
      <TimelineContainier key={item.id}>
        <TimelineSubContainier>
          <TimelineIdentificationQuadrant width="12%" widthSm="17%">
            <TimelineIcon icon={getCardIcon(item)} {...getIconColor(item.cardType)} />
            <TimelineSubDescription>{item.cardDate}</TimelineSubDescription>
          </TimelineIdentificationQuadrant>
          <TimelineQuadrant minWidth="35%">
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
        </TimelineSubContainier>
        <TimelineSubContainier margin="1rem 0 0 0">
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
        </TimelineSubContainier>
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
