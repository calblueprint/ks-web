import React from 'react';
import {
  getPrevMonths,
  getTotalHarvest,
  getMonthsofYear,
  getMonthsBetween
} from '@lib/utils';
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
    // Fetch all the "total harvest" records for the specified farm.
    const totalHarvest =
      farm.totalHarvestIds === undefined // If there are no harvest logs under the farm ID, then return an empty list.
        ? []
        : await Promise.all(farm.totalHarvestIds.map(await getTotalHarvest));

    // Iterate through all "total harvest" records to create a list of dates and a list of total production quantities.
    const dateList = [];
    const totalList = [];
    for (let h = 0; h < totalHarvest.length; h += 1) {
      const { created, totalProductionPounds } = totalHarvest[h];
      dateList[h] = created.slice(0, 7); // takes YYYY-MM format
      totalList[h] = totalProductionPounds;
    }
    this.setState({ dateList, totalList });
  }

  getData = (dateList, totalList, filterBy) => {
    // Reformatting the dates (2021-03 to Mar\n2021)
    const dict = [];
    const months = getMonthsofYear();
    for (let i = 0; i < dateList.length; i += 1) {
      const year = dateList[i].slice(0, 4);
      // eslint-disable-next-line radix
      const month = months[parseInt(dateList[i].slice(5, 7)) - 1];
      const dateFormatted = `${String(month)}\n${year}`;
      // Creating a dictionary mapping dates to its corresponding total production quantity.
      // Note: Each farm only has 1 "total harvest" record per month, so aggregation of total production pounds is not needed.
      dict[i] = [dateFormatted, totalList[i]];
    }

    // DURING FILTERING: Parse the selected months
    let recentDates = [];
    let recentValues = [];
    if (filterBy !== null) {
      recentDates = getMonthsBetween(filterBy[0], filterBy[1]);
      // Reformatting the dates (2021-03 to Mar\n2021)
      for (let i = 0; i < recentDates.length; i += 1) {
        const year = recentDates[i].slice(0, 4);
        // eslint-disable-next-line radix
        const month = months[parseInt(recentDates[i].slice(5, 7)) - 1];
        const dateFormatted = `${String(month)}\n${year}`;
        recentDates[i] = dateFormatted;
      }
      recentValues = new Array(recentDates.length).fill(0);
      // DEFAULT: Take the recent 9 months and match them up to the data in `dict`, filling in months without production with 0.
    } else {
      recentDates = getPrevMonths(9);
      recentValues = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    }

    // Fills in the empty 0 values with values from the dictionary
    for (let i = 0; i < dict.length; i += 1) {
      for (let j = 0; j < recentDates.length; j += 1) {
        if (recentDates[j] === dict[i][0]) {
          // eslint-disable-next-line prefer-destructuring
          recentValues[j] += dict[i][1];
        }
      }
    }

    return {
      labels: recentDates,
      values: recentValues
    };
  };

  render() {
    const { filterBy } = this.props;
    const { dateList, totalList } = this.state;
    const { labels, values } = this.getData(dateList, totalList, filterBy);

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
