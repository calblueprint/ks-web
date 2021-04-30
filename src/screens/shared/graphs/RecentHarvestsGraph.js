import React from 'react';
import moment from 'moment';
import { getTotalHarvest } from '@lib/farmUtils';
import FarmProfileGraph from './FarmProfileGraph';

class RecentHarvestsGraph extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dateList: [],
      totalList: []
    };
  }

  async componentDidMount() {
    const { farm } = this.props;
    console.log(farm);
    const totalHarvest = await Promise.all(
      farm.totalHarvestIds.map(await getTotalHarvest)
    );

    const dateList = [];
    const totalList = [];
    for (let h = 0; h < totalHarvest.length; h += 1) {
      const { date, totalProductionPounds } = totalHarvest[h];
      dateList[h] = date.slice(0, 7);
      totalList[h] = totalProductionPounds;
    }
    console.log(dateList);
    console.log(totalList);
  }

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
    console.log(this.getDates()[0]);
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
