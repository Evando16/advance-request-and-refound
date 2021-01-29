import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from 'react-dom';
import pretty from 'pretty';
import Sidebar from './sidebar';

import getSidebarInfo from './sidebar-service';

const expectedSidebar = [
  {
    id: 0,
    accountabilityId: 16,
    accountabilityStatus: 'Open',
    currency: {
      id: 1,
      name: 'Argentine peso',
      code: 'ARS',
      symbol: 'ARS$',
    },
    declared: '123.213,21',
    approved: '0',
    received: '0',
    returned: '0',
    balance: '0',
    updatedOn: 1590525677543,
  },
];

jest.mock('./sidebar-service');
describe('SidebarComponent', () => {
  let container = null;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.append(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  describe('Snapshot tests', () => {
    it('should render sidebar', async () => {
      getSidebarInfo.mockImplementation(() => Promise.resolve(expectedSidebar));

      await act(async () => {
        render(<Sidebar />, container);
      });

      expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
        "<div>
          <div class=\\"MuiPaper-root MuiCard-root MuiPaper-elevation1 MuiPaper-rounded\\" style=\\"padding: 16px;\\">
            <div class=\\"MuiPaper-root MuiCard-root MuiPaper-outlined MuiPaper-rounded\\" style=\\"padding: 16px;\\"><span>Status</span><span>Open</span></div>
            <div class=\\"MuiPaper-root MuiCard-root MuiPaper-outlined MuiPaper-rounded\\">
              <div class=\\"MuiCardContent-root\\">
                <div><span>BALANCE</span><span>-</span></div>
                <div>
                  <div><svg aria-hidden=\\"true\\" focusable=\\"false\\" data-prefix=\\"far\\" data-icon=\\"arrow-alt-circle-up\\" class=\\"svg-inline--fa fa-arrow-alt-circle-up fa-w-16 \\" role=\\"img\\" xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 512 512\\">
                      <path fill=\\"currentColor\\" d=\\"M256 504c137 0 248-111 248-248S393 8 256 8 8 119 8 256s111 248 248 248zm0-448c110.5 0 200 89.5 200 200s-89.5 200-200 200S56 366.5 56 256 145.5 56 256 56zm20 328h-40c-6.6 0-12-5.4-12-12V256h-67c-10.7 0-16-12.9-8.5-20.5l99-99c4.7-4.7 12.3-4.7 17 0l99 99c7.6 7.6 2.2 20.5-8.5 20.5h-67v116c0 6.6-5.4 12-12 12z\\"></path>
                    </svg>
                    <div><span>Spent</span><span>123.213,21</span></div>
                  </div>
                  <div><svg aria-hidden=\\"true\\" focusable=\\"false\\" data-prefix=\\"far\\" data-icon=\\"arrow-alt-circle-down\\" class=\\"svg-inline--fa fa-arrow-alt-circle-down fa-w-16 \\" role=\\"img\\" xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 512 512\\">
                      <path fill=\\"currentColor\\" d=\\"M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm-32-316v116h-67c-10.7 0-16 12.9-8.5 20.5l99 99c4.7 4.7 12.3 4.7 17 0l99-99c7.6-7.6 2.2-20.5-8.5-20.5h-67V140c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12z\\"></path>
                    </svg>
                    <div><span>Received</span><span>0</span></div>
                  </div>
                </div>
                <div><span>Statement</span>
                  <div>
                    <div>Description</div>
                    <div>Value</div>
                  </div>
                  <div>
                    <div><span>Declarated expense</span><span>123.213,21</span></div><span>Expense declarated by trooper</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>"
      `);
    });

    it('should render sidebar with conditional layouts', async () => {
      getSidebarInfo.mockImplementation(() => Promise.resolve([
        {
          ...expectedSidebar[0],
          balance: '213,21',
          approved: '213,21',
          returned: '213,21',
        },
      ]));

      await act(async () => {
        render(<Sidebar />, container);
      });

      expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
        "<div>
          <div class=\\"MuiPaper-root MuiCard-root MuiPaper-elevation1 MuiPaper-rounded\\" style=\\"padding: 16px;\\">
            <div class=\\"MuiPaper-root MuiCard-root MuiPaper-outlined MuiPaper-rounded\\" style=\\"padding: 16px;\\"><span>Status</span><span>Open</span></div>
            <div class=\\"MuiPaper-root MuiCard-root MuiPaper-outlined MuiPaper-rounded\\">
              <div class=\\"MuiCardContent-root\\">
                <div><span>BALANCE</span>
                  <div><span>ARS</span><span>213,21</span></div>
                </div>
                <div>
                  <div><svg aria-hidden=\\"true\\" focusable=\\"false\\" data-prefix=\\"far\\" data-icon=\\"arrow-alt-circle-up\\" class=\\"svg-inline--fa fa-arrow-alt-circle-up fa-w-16 \\" role=\\"img\\" xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 512 512\\">
                      <path fill=\\"currentColor\\" d=\\"M256 504c137 0 248-111 248-248S393 8 256 8 8 119 8 256s111 248 248 248zm0-448c110.5 0 200 89.5 200 200s-89.5 200-200 200S56 366.5 56 256 145.5 56 256 56zm20 328h-40c-6.6 0-12-5.4-12-12V256h-67c-10.7 0-16-12.9-8.5-20.5l99-99c4.7-4.7 12.3-4.7 17 0l99 99c7.6 7.6 2.2 20.5-8.5 20.5h-67v116c0 6.6-5.4 12-12 12z\\"></path>
                    </svg>
                    <div><span>Spent</span><span>123.213,21</span></div>
                  </div>
                  <div><svg aria-hidden=\\"true\\" focusable=\\"false\\" data-prefix=\\"far\\" data-icon=\\"arrow-alt-circle-down\\" class=\\"svg-inline--fa fa-arrow-alt-circle-down fa-w-16 \\" role=\\"img\\" xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 512 512\\">
                      <path fill=\\"currentColor\\" d=\\"M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm-32-316v116h-67c-10.7 0-16 12.9-8.5 20.5l99 99c4.7 4.7 12.3 4.7 17 0l99-99c7.6-7.6 2.2-20.5-8.5-20.5h-67V140c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12z\\"></path>
                    </svg>
                    <div><span>Received</span><span>0</span></div>
                  </div>
                </div>
                <div><span>Statement</span>
                  <div>
                    <div>Description</div>
                    <div>Value</div>
                  </div>
                  <div>
                    <div><span>Declarated expense</span><span>123.213,21</span></div><span>Expense declarated by trooper</span>
                  </div>
                  <div>
                    <div><span>Approved expense</span><span>213,21</span></div><span>Expense approved by financial department</span>
                  </div>
                  <div>
                    <div><span>Paid</span><span>213,21</span></div><span>Paid by financial department</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>"
      `);
    });
  });
});
