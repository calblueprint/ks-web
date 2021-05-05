import React from 'react';
import { getPrevMonths } from '@lib/farmUtils';

import FarmProfileGraph from './FarmProfileGraph';

class RecentHarvestsGraph extends React.PureComponent {
  getData = () => {
    // Fill in with Airtable Data
    return {
      labels: getPrevMonths(9),
      values: [10, 7, 5, 8, 11, 10, 7, 5, 8]
    };
  };

  render() {
    const { labels, values } = this.getData();
    return <FarmProfileGraph labels={labels} values={values} barRatio={1.2} />;
  }
}

export default RecentHarvestsGraph;
