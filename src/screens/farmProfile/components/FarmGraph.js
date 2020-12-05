import React from 'react';
import '../../../styles/FarmProfile.css';

class FarmGraph extends React.PureComponent {
  render() {
    const { title, data } = this.props;
    return (
      <div className="farm-graph-container">
        <h2>{title}</h2>
        {data ? (
          <div className="farm-graph">{data}</div>
        ) : (
          <div className="farm-graph farm-graph--no-data">
            No Production Data
          </div>
        )}
      </div>
    );
  }
}

export default FarmGraph;
