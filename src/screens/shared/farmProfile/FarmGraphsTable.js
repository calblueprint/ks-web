import React from 'react';
import '@styles/FarmProfile.css';

import FarmGraph from './FarmGraph';

class FarmGraphsTable extends React.PureComponent {
  getGraphs = () => {
    return [
      'Top 5 Items',
      'Recent Harvests',
      'Recent Harvest Logs',
      'Gap Certification Status'
    ];
  };

  // TODO: Handle logic for data fetching for graphs
  render() {
    const graphs = this.getGraphs();
    return (
      <>
        {graphs.map((graph, index) => {
          return (
            <>
              <FarmGraph title={graph} data={null} />
              {index !== graphs.length - 1 ? <div className="divider" /> : null}
            </>
          );
        })}
      </>
    );
  }
}

export default FarmGraphsTable;
