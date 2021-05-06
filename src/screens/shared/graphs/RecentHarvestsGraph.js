import React from 'react';
import { getPrevMonths, getTotalHarvest } from '@lib/farmUtils';
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
    console.log(farm.totalHarvestIds === undefined);
    const totalHarvest =
      farm.totalHarvestIds === undefined
        ? []
        : await Promise.all(farm.totalHarvestIds.map(await getTotalHarvest));
    console.log(totalHarvest);
    // check if totalHarvestIds is defined, then map. if not, assign to an empty array.
    // how do I error handle when there are no records associated with a farmID?

    const dateList = [];
    const totalList = [];
    for (let h = 0; h < totalHarvest.length; h += 1) {
      const { date, totalProductionPounds } = totalHarvest[h];
      dateList[h] = date.slice(0, 7);
      totalList[h] = totalProductionPounds;
    }
    this.setState({ dateList, totalList });
  }

  getData = (dateList, totalList) => {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];
    const dict = [];
    for (let i = 0; i < dateList.length; i += 1) {
      const year = dateList[i].slice(0, 4);
      // eslint-disable-next-line radix
      const month = months[parseInt(dateList[i].slice(5, 7)) - 1];
      const dateFormatted = `${String(month)}\n${year}`;
      dict[i] = [dateFormatted, totalList[i]];
    }

    const recentDates = getPrevMonths(9);
    const recentValues = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < dict.length; i += 1) {
      for (let j = 0; j < recentDates.length; j += 1) {
        if (recentDates[j] === dict[i][0]) {
          // eslint-disable-next-line prefer-destructuring
          recentValues[j] = dict[i][1];
        }
      }
    }

    return {
      labels: recentDates,
      values: recentValues
    };
  };

  render() {
    const { dateList, totalList } = this.state;
    const { labels, values } = this.getData(dateList, totalList);
    return <FarmProfileGraph labels={labels} values={values} barRatio={1.2} />;
  }
}

export default RecentHarvestsGraph;
