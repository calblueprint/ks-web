import React from 'react';
import {
  VictoryChart,
  VictoryBar,
  Bar,
  VictoryAxis,
  VictoryStack,
  VictoryTooltip,
  VictoryVoronoiContainer,
  VictoryLabel
} from 'victory';

import { getPrevMonths } from '@lib/farmUtils';

const fontProps = {
  fontSize: 8,
  fontFamily: 'Inter',
  color: 'blue'
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
  fill: 'var(--ks-light-grey)',
  stroke: 'none'
};

const colors = [
  'var(--ks-dark-blue)',
  'var(--ks-medium-dark-blue)',
  'var(--ks-medium-blue)',
  'var(--ks-medium-light-blue)',
  'var(--ks-light-blue)'
];

const tooltipStyles = colors.map(ca => ({ fill: ca, ...fontProps }));

class ProductionGraph extends React.PureComponent {
  getTopFourItems = () => {
    return [
      'Tomato Roma',
      'Tomato Cherry',
      'Tomato Sun Gold Cherry',
      'Taro Default'
    ];
  };

  getData = () => {
    // produces data object for each segmenet of stacked bar graph
    const labels = getPrevMonths(9);
    const stack = [
      [10, 7, 5, 8, 11, 4, 3, 9, 7],
      [7, 5, 8, 11, 4, 3, 9, 7, 10],
      [11, 4, 3, 9, 7, 10, 7, 5, 8],
      [10, 7, 9, 7, 5, 8, 11, 4, 3]
    ];

    return stack.map(values => {
      return labels.map((label, index) => ({ x: label, y: values[index] }));
    });
  };

  formatLabel = datum => {
    const items = this.getTopFourItems();
    return `\u25a0 ${items[datum._stack - 1]}: ${datum.y} lbs`;
  };

  setOffset = datum => {
    return datum._group >= 6 ? -125 : 125;
  };

  render() {
    const data = this.getData();
    return (
      <VictoryChart
        padding={48}
        height={250}
        width={600}
        containerComponent={
          <VictoryVoronoiContainer
            voronoiDimension="x"
            labels={({ datum }) => this.formatLabel(datum)}
            labelComponent={
              <VictoryTooltip
                constrainToVisibleArea
                centerOffset={{ x: ({ datum }) => this.setOffset(datum) }}
                labelComponent={<VictoryLabel lineHeight={3.5} />}
                flyoutHeight={150}
                flyoutPadding={10}
                flyoutStyle={flyoutStyles}
                style={tooltipStyles}
              />
            }
          />
        }
      >
        <VictoryStack colorScale={colors}>
          {data.map(segment => (
            <VictoryBar
              name="bar"
              dataComponent={<Bar />}
              style={barStyles}
              data={segment}
              barRatio={1.25}
            />
          ))}
        </VictoryStack>
        <VictoryAxis style={axisStyles} />
      </VictoryChart>
    );
  }
}

export default ProductionGraph;
