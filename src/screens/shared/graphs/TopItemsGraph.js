import React from 'react';
import { getTotalHarvest } from '@lib/farmUtils';

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
    // If there are no harvest logs under the farm ID, then return an empty list.
    const totalHarvest =
      farm.totalHarvestIds === undefined
        ? []
        : await Promise.all(farm.totalHarvestIds.map(await getTotalHarvest));

    // Creating a string of all crops and a list of their corresponding quantities.
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
        : quantitiesStr.match(/\d+(?:\.\d+)?/g).map(Number);
    this.setState({ cropsStr, quantitiesFloats });
    console.log(cropsStr);
  }

  // Reformulates data into a dictionary mapping every unique crop and its totaled quantity.
  formulateData = (cropsStr, quantitiesFloats) => {
    const cropsSplit = cropsStr.split(','); // Splitting string of crops into a list (by comma separation)
    const dict = [];

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
    }
    console.log(dict);

    // Removes null values from the dictionary. Length of dictionary shrinks from the total # of inputs to the # of unique crops.
    const dictStrip = dict.filter(function(el) {
      return el != null;
    });

    return {
      cropsToQuantity: dictStrip
    };
  };

  // Sorts the dictionary of data from highest quantity to lowest quantity and takes the top 5.
  sortData = cropsToQuantity => {
    let dict = cropsToQuantity;
    dict = dict.sort(function(a, b) {
      return b[1] - a[1];
    });

    const cropsSorted = [];
    const quantitiesSorted = [];
    for (let j = 0; j < dict.length; j += 1) {
      // eslint-disable-next-line prefer-destructuring
      cropsSorted[j] = dict[j][0];
      // eslint-disable-next-line prefer-destructuring
      quantitiesSorted[j] = dict[j][1];
    }
    return {
      labels: cropsSorted.slice(0, 5),
      values: quantitiesSorted.slice(0, 5)
    };
  };

  render() {
    const { cropsStr, quantitiesFloats } = this.state;
    const { cropsToQuantity } = this.formulateData(cropsStr, quantitiesFloats);
    const { labels, values } = this.sortData(cropsToQuantity);

    return <FarmProfileGraph labels={labels} values={values} />;
  }
}

export default TopItemsGraph;
