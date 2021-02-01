import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleUp, faArrowAltCircleDown } from '@fortawesome/free-regular-svg-icons';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 24px 16px;
  width: 100%;
`;

const SidebarItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;
`;

const SidebarStatus = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${(props) => props.color};
  border: ${(props) => props.border};
  border-radius: 6px;
  background-color: ${(props) => props.backgroundcolor};
  padding: 16px 0;
  margin-bottom: 24px;
`;

const SidebarStatusLabel = styled.span`
  font-size: 1rem;
  color: #053d4e;
  margin-bottom: 8px;
`;

const SidebarDescription = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: #053d4e;
  margin: ${(prop) => prop.margin}
`;

const SidebarBalance = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
  border-bottom: 1px solid #f0f3f7;
`;

const SidebarBalanceLabel = styled.span`
  font-size: .875rem;
  color: #6b7480;
  margin-bottom: 8px;
`;
const SidebarDetails = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 24px;
`;

const SidebarDetailsItem = styled.div`  
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SidebarDetailsIcon = styled(FontAwesomeIcon)`
  font-size: 1.5rem;
  color: #d0d3d6;
  margin-right: 8px;
`;

const SidebarLabel = styled.span`
  font-size: .75rem;
  color: #6b7480;
`;

const SidebarDetailsCurrency = styled.span`
  font-size: 1rem;
  color: ${(props) => (props.color ? props.color : '#32363b')};
`;

const SidebarCurrencyCode = styled(SidebarDetailsCurrency)`
  margin-right: 8px;
`;

const SidebarStatementContainer = styled.div`  
  display: flex;
  flex-direction: column;
`;

const SidebarStatementTitile = styled.span` 
  font-size: .875rem;
  font-weight: bold; 
  color: #353a40;
  border-bottom: 1px solid #f0f3f7;
  padding: 16px 0;
  margin-bottom: 16px;
`;

const SidebarStatementHeader = styled.span` 
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: .75rem;
  color: #053d4e;
`;

const SidebarStatementBody = styled.span` 
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: .875rem;
  font-weight: 700;
  color: #053d4e;
  margin-top: 8px;
`;

const SidebarCurrencyReturned = styled.div` 
  color: #03a046;
`;

function getStatusStyle(status) {
  switch (status.toUpperCase()) {
    case 'APPROVED':
      return { backgroundcolor: '#ecf8f8', color: '#03a046', border: '1px solid #03a046' };
    case 'PENDING':
    case 'OPEN':
      return { backgroundcolor: '#f0f3f7', color: '#053d4e', border: '1px solid #053d4e' };
    case 'CANCELLED':
    default:
      return { backgroundcolor: '#fde2e0', color: '#f44336', border: '1px solid #f44336' };
  }
}

export default function Sidebar({ sidebarData }) {
  return (
    <SidebarContainer>
      {sidebarData.map((item) => (
        <SidebarItem key={item.id}>
          <SidebarStatus {...getStatusStyle(item.accountabilityStatus)}>
            <SidebarStatusLabel>Status</SidebarStatusLabel>
            <SidebarDescription>{item.accountabilityStatus}</SidebarDescription>
          </SidebarStatus>
          <SidebarBalance>
            <SidebarBalanceLabel>BALANCE</SidebarBalanceLabel>
            {item.balance !== '0'
              ? (
                <div>
                  <SidebarDescription margin="0 8px 0 0">{item.currencyCode}</SidebarDescription>
                  <SidebarDescription>{item.balance}</SidebarDescription>
                </div>
              )
              : <SidebarDescription>-</SidebarDescription>}
          </SidebarBalance>
          <SidebarDetails>
            <SidebarDetailsItem>
              <SidebarDetailsIcon icon={faArrowAltCircleUp} />
              <div>
                <SidebarLabel>Spent</SidebarLabel>
                <div>
                  <SidebarCurrencyCode>{item.currencyCode}</SidebarCurrencyCode>
                  <SidebarDetailsCurrency>{item.declared}</SidebarDetailsCurrency>
                </div>
              </div>
            </SidebarDetailsItem>
            <SidebarDetailsItem>
              <SidebarDetailsIcon icon={faArrowAltCircleDown} />
              <div>
                <SidebarLabel>Received</SidebarLabel>
                <div>
                  <SidebarCurrencyCode>{item.currencyCode}</SidebarCurrencyCode>
                  <SidebarDetailsCurrency>{item.received}</SidebarDetailsCurrency>
                </div>
              </div>
            </SidebarDetailsItem>
          </SidebarDetails>
          <SidebarStatementContainer>
            <SidebarStatementTitile>Statement</SidebarStatementTitile>
            <SidebarStatementHeader>
              <span>Description</span>
              <span>Value</span>
            </SidebarStatementHeader>
            <SidebarStatementBody>
              <span>Declarated expense</span>
              <div>
                <SidebarCurrencyCode>{item.currencyCode}</SidebarCurrencyCode>
                <span>{item.declared}</span>
              </div>
            </SidebarStatementBody>
            <SidebarLabel>Expense declarated by trooper</SidebarLabel>
            {item.approved !== '0'
              && (
                <>
                  <SidebarStatementBody>
                    <span>Approved expense</span>
                    <div>
                      <SidebarCurrencyCode>{item.currencyCode}</SidebarCurrencyCode>
                      <span>{item.approved}</span>
                    </div>
                  </SidebarStatementBody>
                  <SidebarLabel>Expense approved by financial department</SidebarLabel>
                </>
              )}
            {item.returned !== '0'
              && (
                <>
                  <SidebarStatementBody>
                    <span>Paid</span>
                    <SidebarCurrencyReturned>
                      <SidebarCurrencyCode color="#03a046">{item.currencyCode}</SidebarCurrencyCode>
                      <span>{item.returned}</span>
                    </SidebarCurrencyReturned>
                  </SidebarStatementBody>
                  <SidebarLabel>Paid by financial department</SidebarLabel>
                </>
              )}
          </SidebarStatementContainer>
        </SidebarItem>
      ))}
    </SidebarContainer>
  );
}

Sidebar.propTypes = {
  sidebarData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    accountabilityStatus: PropTypes.string.isRequired,
    currencyCode: PropTypes.string.isRequired,
    declared: PropTypes.string.isRequired,
    approved: PropTypes.string.isRequired,
    received: PropTypes.string.isRequired,
    returned: PropTypes.string.isRequired,
    balance: PropTypes.string,
  })).isRequired,
};
