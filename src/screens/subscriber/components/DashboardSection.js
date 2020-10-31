import React from 'react';

export default class DashboardSection extends React.PureComponent {
  render() {
    return (
      <div>
        <div className="subscriber-section-header">
          <div className="subscriber-header">Page 1</div>
        </div>
        <div className="subscriber-section-body">
          <div>
            <div className="subscriber-billing-container">
              <div className="subscriber-billing-current-container">
                <div className="subscriber-billing-header">
                  Container header
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
