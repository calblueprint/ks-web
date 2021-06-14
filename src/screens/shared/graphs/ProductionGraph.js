/* eslint-disable prefer-destructuring */
import React from 'react';
import {
  VictoryChart,
  VictoryBar,
  Bar,
  VictoryAxis,
  VictoryStack,
  VictoryTooltip,
  VictoryLabel
} from 'victory';

import {
  getPrevMonths,
  getMonthsofYear,
  getTotalHarvestData,
  getMonthsBetween
} from '@lib/utils';

const fontProps = {
  fontSize: 8,
  fontFamily: 'Inter',
  fill: 'var(--ks-dark-grey)'
};

const barStyles = {
  labels: fontProps
};

const axisStyles = {
  axis: {
    stroke: 'none'
  },
  tickLabels: fontProps
};

const flyoutStyles = {
  fill: 'var(--ks-dark-grey)',
  stroke: 'none'
};

const tooltipStyles = {
  ...fontProps,
  fill: 'white'
};

const colors = [
  'var(--ks-dark-blue)',
  'var(--ks-medium-dark-blue)',
  'var(--ks-medium-blue)',
  'var(--ks-medium-light-blue)',
  'var(--ks-light-blue)'
];

class ProductionGraph extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dateList: [],
      cropsList: [],
      quantitiesList: [],
    };
  }

  async componentDidMount() {
    // Fetch all the "total harvest" records for the specified farm.
    const totalHarvest = await getTotalHarvestData();
    const dateList = [];
    const cropsList = [];
    const quantitiesList = [];
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

    return {
      // Only save the top 5 crops and their associated quantities.
      labels: cropsSorted.slice(0, 4),
      values: quantitiesSorted.slice(0, 4),
      otherValuesSum: quantitiesSorted.slice(4, -1).reduce((a, b) => a + b, 0)
    };
  };

  getTopFourItems = dict => {
    const level5other = [];
    const level4 = [];
    const level3 = [];
    const level2 = [];
    const level1 = [];
    for (let i = 0; i < dict.length; i += 1) {
      level1[i] = dict[i][1].labels[0];
      level2[i] = dict[i][1].labels[1];
      level3[i] = dict[i][1].labels[2];
      level4[i] = dict[i][1].labels[3];
      level5other[i] = 'Other';
    }

    return [level1, level2, level3, level4, level5other];
  };

  getData = (dict, filterBy) => {
    let labels = []
    if (filterBy !== null) {
      const months = getMonthsofYear();
      labels = getMonthsBetween(filterBy[0], filterBy[1]);
      // Reformatting the dates (2021-03 to Mar\n2021)
      for (let i = 0; i < labels.length; i += 1) {
        const year = labels[i].slice(0, 4);
        // eslint-disable-next-line radix
        const month = months[parseInt(labels[i].slice(5, 7)) - 1];
        const dateFormatted = `${String(month)}\n${year}`;
        labels[i] = dateFormatted;
      }
    }
    else {
      labels = getPrevMonths(9);
    }
    // produces data object for each segmenet of stacked bar graph
    const level5other = [];
    const level4 = [];
    const level3 = [];
    const level2 = [];
    const level1 = [];
    for (let i = 0; i < dict.length; i += 1) {
      level1[i] = dict[i][1].values[0];
      level2[i] = dict[i][1].values[1];
      level3[i] = dict[i][1].values[2];
      level4[i] = dict[i][1].values[3];
      level5other[i] = dict[i][1].otherValuesSum;
    }
    const stack = [level1, level2, level3, level4, level5other];

    return stack.map(values => {
      return labels.map((label, index) => ({ x: label, y: values[index] }));
    });
  };

  formatLabel = (datum, dict) => {
    const items = this.getTopFourItems(dict);
    return [`${items[datum._stack - 1][datum._x - 1]}: ${datum.y} lbs`];
  };

  setOffset = datum => {
    return datum._group >= 6 ? -75 : 75;
  };

  render() {
    const { dateList, cropsList, quantitiesList } = this.state;
    const { filterBy } = this.props;
    const lists = this.filterByDate(
      dateList,
      cropsList,
      quantitiesList,
      filterBy
    );

    const productionDict = [];
    for (let i = 0; i < lists.dateStringList.length; i += 1) {
      productionDict[i] = [
        lists.dateStringList[i],
        this.formulateData(
          lists.cropsStringList[i],
          lists.quantitiesStringList[i]
        )
      ];
    }

    for (let i = 0; i < productionDict.length; i += 1) {
      productionDict[i][1] = this.sortData(
        productionDict[i][1].cropsToQuantity
      );
    }
    const data = this.getData(productionDict, filterBy);

    return (
      <VictoryChart padding={48} height={250} width={600}>
        <VictoryStack colorScale={colors}>
          {data.map(segment => (
            <VictoryBar
              name="bar"
              dataComponent={<Bar />}
              style={barStyles}
              data={segment}
              barRatio={1.25}
              key={segment}
              labels={({ datum }) => this.formatLabel(datum, productionDict)}
              labelComponent={
                <VictoryTooltip
                  constrainToVisibleArea
                  flyoutPadding={10}
                  flyoutStyle={flyoutStyles}
                  style={tooltipStyles}
                  pointerLength={0}
                  centerOffset={{
                    x: ({ datum }) => this.setOffset(datum),
                    y: 25
                  }}
                  labelComponent={
                    <VictoryLabel backgroundPadding={2} lineHeight={3.5} />
                  }
                />
              }
            />
          ))}
        </VictoryStack>
        <VictoryAxis style={axisStyles} />
      </VictoryChart>
    );
  }
}

export default ProductionGraph;
