import React from 'react';
import { getTotalHarvest } from '@lib/utils';

import FarmProfileGraph from './FarmProfileGraph';

class TopItemsGraph extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      cropsStr: '',
      quantitiesFloats: ''
    };
  }

  async componentDidMount() {
    const { farm } = this.props;
    // Fetch all the "total harvest" records for the specified farm.
    const totalHarvest =
      farm.totalHarvestIds === undefined // If there are no harvest logs under the farm ID, then return an empty list.
        ? []
        : await Promise.all(farm.totalHarvestIds.map(await getTotalHarvest));

    // Iterate through all "total harvest" records to create a string of all crops and a list of their corresponding quantities.
    let cropsStr = '';
    let quantitiesStr = '';
    for (let h = 0; h < totalHarvest.length; h += 1) {
      const { crops, quantities } = totalHarvest[h];
      if (h !== 0) {
        cropsStr += ', ';
        quantitiesStr += ', ';
      }
      cropsStr += crops;
      quantitiesStr += quantities;
    }
    const quantitiesFloats =
      quantitiesStr === ''
        ? []
        : quantitiesStr.match(/\d+(?:\.\d+)?/g).map(Number); // Converts string to float for the quantities
    this.setState({ cropsStr, quantitiesFloats });
  }

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
    console.log(dict);

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

  render() {
    const { cropsStr, quantitiesFloats } = this.state;
    const { cropsToQuantity } = this.formulateData(cropsStr, quantitiesFloats);
    console.log(cropsToQuantity);
    console.log(typeof cropsToQuantity);
    const { labels, values } = this.sortData(cropsToQuantity);

    return (
      <FarmProfileGraph
        labels={labels}
        values={values}
        isEmpty={cropsStr === ''}
      />
    );
  }
}

export default TopItemsGraph;
