import React from 'react';
import {
  getHarvestLog,
  getTotalHarvest
} from '@lib/farmUtils';

import FarmProfileGraph from './FarmProfileGraph';

class TopItemsGraph extends React.PureComponent {
  async componentDidMount() {
    const { farm } = this.props;
    const harvestLogIds = farm.recentHarvestLogIds;
    const totalHarvestIds = farm.totalHarvestIds;

    const harvestLogs = await Promise.all(harvestLogIds.map(await getHarvestLog))
    console.log(harvestLogs)


    const totalHarvest = await Promise.all(totalHarvestIds.map(await getTotalHarvest))
    console.log(totalHarvest)
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
