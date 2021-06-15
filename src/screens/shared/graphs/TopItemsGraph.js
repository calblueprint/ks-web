import React from 'react';
import { getTotalHarvest, getPrevMonths, getMonthsofYear, getMonthsBetween } from '@lib/utils';

import FarmProfileGraph from './FarmProfileGraph';

class TopItemsGraph extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dateList: [],
      cropsList: [],
      quantitiesList: []
    };
  }

  async componentDidMount() {
    const { farm } = this.props;
    // Fetch all the "total harvest" records for the specified farm.
    const totalHarvest =
      farm.totalHarvestIds === undefined // If there are no harvest logs under the farm ID, then return an empty list.
        ? []
        : await Promise.all(farm.totalHarvestIds.map(await getTotalHarvest));
    const dateList = []; const cropsList = []; const quantitiesList = [];
    for (let h = 0; h < totalHarvest.length; h += 1) {
      const { created, crops, quantities } = totalHarvest[h];
      dateList[h] = created.slice(0, 7); // takes YYYY-MM format
      cropsList[h] = crops;
      quantitiesList[h] = quantities;
    }
    this.setState({ dateList, cropsList, quantitiesList });
  }

  filterByDate = (dateList, cropsList, quantitiesList, filterBy) => {
    const dict = [];
    const months = getMonthsofYear();
    for (let i = 0; i < dateList.length; i += 1) {
      const year = dateList[i].slice(0, 4);
      // eslint-disable-next-line radix
      const month = months[parseInt(dateList[i].slice(5, 7)) - 1];
      const dateFormatted = `${String(month)}\n${year}`;
      // Creating a dictionary mapping dates to its corresponding total production quantity.
      dict[i] = [dateFormatted, cropsList[i], quantitiesList[i]];
    }

    // Take the recent 9 months and match them up to the data in `dict`, filling in months without production with 0.
    let recentDates = [];
    let recentCrops = [];
    let recentQuantities = [];
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
      recentCrops = new Array(recentDates.length).fill('');
      recentQuantities = new Array(recentDates.length).fill('');
      // DEFAULT: Take the recent 9 months and match them up to the data in `dict`, filling in months without production with 0.
    } else {
      recentDates = getPrevMonths(9);
      recentCrops = ['', '', '', '', '', '', '', '', ''];
      recentQuantities = ['', '', '', '', '', '', '', '', ''];
    }

    for (let i = 0; i < dict.length; i += 1) {
      for (let j = 0; j < recentDates.length; j += 1) {
        if (recentDates[j] === dict[i][0]) {
          if (recentCrops[j] === '' && recentQuantities[j] === '') {
            // eslint-disable-next-line prefer-destructuring
            recentCrops[j] = dict[i][1];
            // eslint-disable-next-line prefer-destructuring
            recentQuantities[j] = dict[i][2];
          } else {
            // eslint-disable-next-line prefer-destructuring
            recentCrops[j] += ', '.concat(dict[i][1]);
            // eslint-disable-next-line prefer-destructuring
            recentQuantities[j] += ', '.concat(dict[i][2]);
          }
        }
      }
    }

    return {
      dateStringList: recentDates,
      cropsStringList: recentCrops,
      quantitiesStringList: recentQuantities
    };
  };

  // Reformulates data into a dictionary mapping every unique crop and its totaled quantity.
  formulateData = (crops, quantities) => {
    const quantitiesFloats =
      quantities === '' ? [] : quantities.match(/\d+(?:\.\d+)?/g).map(Number); // Converts string to float for the quantities
    const cropsSplit = crops.split(','); // Splitting string of crops into a list (by comma separation)

    let dict = [];
    for (let i = 0; i < cropsSplit.length; i += 1) {
      cropsSplit[i] = cropsSplit[i].replace(/^\s+|\s+$/g, ''); // Trims starting and trailing white spaces
      if (cropsSplit.slice(0, i).includes(cropsSplit[i])) {
        for (let j = 0; j < dict.length; j += 1) {
          if (dict[j][0] === cropsSplit[i]) {
            dict[j][1] += quantitiesFloats[i]; // If crop has already been added to dictionary, just add the quantity to its current total.
          }
        }
      } else {
        dict[i] = [cropsSplit[i], quantitiesFloats[i]];
      }
      dict = dict.filter(e => e != null); // Removes null values from the dictionary. Length of dictionary shrinks from the total # of inputs to the # of unique crops.
    }

    console.log(dict)

    return {
      cropsToQuantity: dict
    };
  };



  /**

  // Reformulates data into a dictionary mapping every unique crop and its totaled quantity.
  formulateData = (cropsStr, quantitiesFloats) => {
    const cropsSplit = cropsStr.split(','); // Splitting string of crops into a list (by comma separation)
    let dict = [];

    for (let i = 0; i < cropsSplit.length; i += 1) {
      cropsSplit[i] = cropsSplit[i].replace(/^\s+|\s+$/g, ''); // Trims starting and trailing white spaces
      if (cropsSplit.slice(0, i).includes(cropsSplit[i])) {
        for (let j = 0; j < dict.length; j += 1) {
          if (dict[j][0] === cropsSplit[i]) {
            dict[j][1] += quantitiesFloats[i]; // If crop has already been added to dictionary, just add the quantity to its current total.
          }
        }
      } else {
        dict[i] = [cropsSplit[i], quantitiesFloats[i]];
      }
      dict = dict.filter(e => e != null); // Removes null values from the dictionary. Length of dictionary shrinks from the total # of inputs to the # of unique crops.
    }

    return {
      cropsToQuantity: dict
    };
  };  

  // Sorts the dictionary of data from highest quantity to lowest quantity and takes the top 5.
  sortData = cropsToQuantity => {
    let dict = cropsToQuantity;
    dict = dict.sort((a, b) => b[1] - a[1]);

    const cropsSorted = [];
    const quantitiesSorted = [];
    for (let j = 0; j < dict.length; j += 1) {
      // eslint-disable-next-line prefer-destructuring
      cropsSorted[j] = dict[j][0];
      // eslint-disable-next-line prefer-destructuring
      quantitiesSorted[j] = dict[j][1];
    }

    // If there are less than 5 items listed, we fill the empty items with "N/A" and 0 pounds.
    // Since VictoryGraphs cannot have two categories on the x-axis with the same name, we add an additional whitespace at the end of the "N/A" for every N/A value.
    let counter = -1;
    for (let k = 0; k < 5; k += 1) {
      if (cropsSorted[k] === undefined || quantitiesSorted[k] === undefined) {
        counter += 1;
        cropsSorted[k] = 'N/A';
        for (let c = 0; c < counter; c += 1) {
          cropsSorted[k] = cropsSorted[k].concat(' ');
        }
        quantitiesSorted[k] = 0;
      }
    }
    // Only save the top 5 crops and their associated quantities.
    return {
      labels: cropsSorted.slice(0, 5),
      values: quantitiesSorted.slice(0, 5)
    };
  };
  */

  render() {
    const { dateList, cropsList, quantitiesList } = this.state;
    const { filterBy } = this.props;
    const lists = this.filterByDate(
      dateList,
      cropsList,
      quantitiesList,
      filterBy
    );
    console.log(lists)
    const productionDict = [];
    /** 
    for (let i = 0; i < lists.dateStringList.length; i += 1) {
      productionDict[i] = // [
        // lists.dateStringList[i],
        this.formulateData(
          lists.cropsStringList[i],
          lists.quantitiesStringList[i]
        )
      // ];
    }
    console.log(productionDict)
    
    const { labels, values } = this.sortData(productionDict);
    console.log(labels)
    console.log(values)
    */

    const labels = ["A", "B", "C", "D", "E"]
    const values = [1, 2, 3, 4, 5]

    /** 
    const { cropsStr, quantitiesFloats } = this.state;
    const { cropsToQuantity } = this.formulateData(cropsStr, quantitiesFloats);
    const { labels, values } = this.sortData(cropsToQuantity);
    */

    return (
      <FarmProfileGraph
        labels={labels}
        values={values}
        isEmpty={dateList === []}
      />
    );
  }
}

export default TopItemsGraph;
