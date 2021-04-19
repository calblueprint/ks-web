import React from 'react';
import moment from 'moment';
import FarmProfileGraph from './FarmProfileGraph';

class RecentHarvestsGraph extends React.PureComponent {
  /* eslint-disable no-unused-vars */
  getDates = () => {
    const date = Date().toLocaleString();
    const m = moment(date);
    m.subtract(9, 'months');

    return [...Array(9)].map(_i => m.add(1, 'months').format('MMM[\n]YYYY'));
  };

  /* eslint-enable no-unused-vars */
  getData = () => {
    // Fill in with Airtable Data
    return {
      labels: this.getDates(),
      values: [10, 7, 5, 8, 11, 10, 7, 5, 8]
    };
  };

  render() {
    const { labels, values } = this.getData();
    return <FarmProfileGraph labels={labels} values={values} barRatio={1.2} />;
  }
}

export default RecentHarvestsGraph;
