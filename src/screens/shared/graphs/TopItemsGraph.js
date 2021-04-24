import React from 'react';
import {
  getSingleFarm,
  getRecentHarvestLogById,
  getTotalHarvestById
} from '@lib/farmUtils';

import FarmProfileGraph from './FarmProfileGraph';

class TopItemsGraph extends React.PureComponent {
  async componentDidMount() {
    const { farmId } = this.props;
    console.log(farmId);
    const z = await getSingleFarm(farmId);
    console.log(z);
    // const h = await getRecentHarvestLogById(farmId);
    // const t = await getTotalHarvestById(farmId);
    // console.log(h);
    // console.log(t);
  }

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
