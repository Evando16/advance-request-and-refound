import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleUp, faArrowAltCircleDown } from '@fortawesome/free-regular-svg-icons';
import PropTypes from 'prop-types';

export default function Sidebar({ sidebarData }) {
  return (
    <div>
      {sidebarData.map((item) => (
        <div key={item.id} style={{ padding: '16px' }}>
          <div variant="outlined" style={{ padding: '16px' }}>
            <span>Status</span>
            <span>{item.accountabilityStatus}</span>
          </div>

          <div variant="outlined">
            <div>
              <div>
                <span>BALANCE</span>
                {item.balance !== '0'
                  ? (
                    <div>
                      <span>{item.currencyCode}</span>
                      <span>{item.balance}</span>
                    </div>
                  )
                  : <span>-</span>}
              </div>
              <div>
                <div>
                  <FontAwesomeIcon icon={faArrowAltCircleUp} />
                  <div>
                    <span>Spent</span>
                    <span>{item.declared}</span>
                  </div>
                </div>
                <div>
                  <FontAwesomeIcon icon={faArrowAltCircleDown} />
                  <div>
                    <span>Received</span>
                    <span>{item.received}</span>
                  </div>
                </div>
              </div>
              <div>
                <span>Statement</span>
                <div>
                  <div>Description</div>
                  <div>Value</div>
                </div>
                <div>
                  <div>
                    <span>Declarated expense</span>
                    <span>{item.declared}</span>
                  </div>
                  <span>Expense declarated by trooper</span>
                </div>
                {item.approved !== '0'
                  && (
                    <div>
                      <div>
                        <span>Approved expense</span>
                        <span>{item.approved}</span>
                      </div>
                      <span>Expense approved by financial department</span>
                    </div>
                  )}
                {item.returned !== '0'
                  && (
                    <div>
                      <div>
                        <span>Paid</span>
                        <span>{item.returned}</span>
                      </div>
                      <span>Paid by financial department</span>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
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
