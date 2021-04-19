import React from 'react';
import FarmProfileGraph from './FarmProfileGraph';

class TopItemsGraph extends React.PureComponent {
  getData = () => {
    // Fill in with Airtable Data
    return {
      labels: ['Eggplant', 'Tomato', 'Cucumber', 'Melons', 'Apple'],
      values: [10, 7, 5, 8, 11]
    };
  };

  render() {
    const { labels, values } = this.getData();
    return <FarmProfileGraph labels={labels} values={values} />;
  }
}

export default TopItemsGraph;
