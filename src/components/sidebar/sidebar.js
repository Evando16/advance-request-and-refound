import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleUp, faArrowAltCircleDown } from '@fortawesome/free-regular-svg-icons';
import getSidebarInfo from './sidebar-service';

export default function Sidebar() {
  const [sidebarData, setSidebarData] = useState([]);

  useEffect(() => {
    async function getSidebarCheck() {
      setSidebarData(await getSidebarInfo());
    }

    getSidebarCheck();
  }, []);

  return (
    <div>
      {sidebarData.map((item) => (
        <Card key={item.id} style={{ padding: '16px' }}>
          <Card variant="outlined" style={{ padding: '16px' }}>
            <span>Status</span>
            <span>{item.accountabilityStatus}</span>
          </Card>

          <Card variant="outlined">
            <CardContent>
              <div>
                <span>BALANCE</span>
                {item.balance !== '0'
                  ? (
                    <div>
                      <span>{item.currency.code}</span>
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
            </CardContent>
          </Card>
        </Card>
      ))}
    </div>
  );
}
