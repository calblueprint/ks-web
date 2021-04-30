import React from 'react';
import { getTotalHarvest } from '@lib/farmUtils';

import FarmProfileGraph from './FarmProfileGraph';

class TopItemsGraph extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      crops: '',
      quantitiesFloats: ''
    };
  }

  async componentDidMount() {
    const { farm } = this.props;
    const totalHarvest = await Promise.all(
      farm.totalHarvestIds.map(await getTotalHarvest)
    );

    console.log(totalHarvest);

    const { crops, quantities } = totalHarvest[0];
    const quantitiesFloats = quantities.match(/\d+(?:\.\d+)?/g).map(Number);
    this.setState({ crops, quantitiesFloats });
  }

  sortData = (crops, quantitiesFloats) => {
    const cropsList = crops.split(',');
    let dict = [];
    for (let i = 0; i < cropsList.length; i += 1) {
      cropsList[i] = cropsList[i].replace(/^\s+|\s+$/g, '');
      dict[i] = [cropsList[i], quantitiesFloats[i]];
    }
    dict = dict.sort(function(a, b) {
      return b[1] - a[1];
    });
    console.log(dict);

    const cropsSorted = [];
    const quantitiesSorted = [];
    for (let j = 0; j < dict.length; j += 1) {
      // eslint-disable-next-line prefer-destructuring
      cropsSorted[j] = dict[j][0];
      // eslint-disable-next-line prefer-destructuring
      quantitiesSorted[j] = dict[j][1];
    }

    return {
      labels: cropsSorted,
      values: quantitiesSorted
    };
  };

  render() {
    const { crops, quantitiesFloats } = this.state;

    const { labels, values } = this.sortData(crops, quantitiesFloats);
    return <FarmProfileGraph labels={labels} values={values} />;
  }
}

export default TopItemsGraph;
