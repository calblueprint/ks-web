import React from 'react';
import { months } from '@lib/utils';
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

    // If there are no harvest logs under the farm ID, then return an empty list.
    const totalHarvest =
      farm.totalHarvestIds === undefined
        ? []
        : await Promise.all(farm.totalHarvestIds.map(await getTotalHarvest));

    // Create a list of dates and a list of total production quantities.
    const dateList = [];
    const totalList = [];
    for (let h = 0; h < totalHarvest.length; h += 1) {
      const { date, totalProductionPounds } = totalHarvest[h];
      dateList[h] = date.slice(0, 7); // takes YYYY-MM format
      totalList[h] = totalProductionPounds;
    }
    this.setState({ dateList, totalList });
  }

  getData = (dateList, totalList) => {
    // Reformatting the dates (2021-03 to Mar\n2021)
    const dict = [];
    for (let i = 0; i < dateList.length; i += 1) {
      const year = dateList[i].slice(0, 4);
      // eslint-disable-next-line radix
      const month = months[parseInt(dateList[i].slice(5, 7)) - 1];
      const dateFormatted = `${String(month)}\n${year}`;
      // Creating a dictionary mapping dates to its corresponding total production quantity.
      dict[i] = [dateFormatted, totalList[i]];
    }

    // Taking the most recent months and matching them up to the data. Filling in months without production with 0.
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
    return (
      <FarmProfileGraph
        labels={labels}
        values={values}
        barRatio={1.2}
        isEmpty={dateList.length === 0}
      />
    );
  }
}

export default RecentHarvestsGraph;
