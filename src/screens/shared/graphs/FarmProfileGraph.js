import React from 'react';
import {
  VictoryChart,
  VictoryBar,
  Bar,
  VictoryAxis,
  VictoryLabel
} from 'victory';

import EmptyGraph from './EmptyGraph';

const fontProps = {
  fontSize: 8,
  fontFamily: 'Inter',
  color: 'var(--ks-medium-dark-grey)'
};

const barStyles = {
  data: {
    fill: 'var(--ks-medium-light-blue)'
  },
  labels: fontProps
};

const axisStyles = {
  axis: {
    stroke: 'none'
  },
  tickLabels: fontProps
};

class FarmProfileGraph extends React.PureComponent {
  getData = () => {
    const { labels, values } = this.props;
    return labels.map((label, index) => ({ x: label, y: values[index] }));
  };

  render() {
    const { barRatio, isEmpty } = this.props;

    if (isEmpty) {
      return <EmptyGraph />;
    }
    return (
      <VictoryChart padding={48} height={150} width={600}>
        <VictoryBar
          labels={({ datum }) => `${datum.y} lbs`}
          labelComponent={<VictoryLabel dy={-10} />}
          dataComponent={<Bar />}
          style={barStyles}
          data={this.getData()}
          barRatio={barRatio || 1.6}
        />
        <VictoryAxis style={axisStyles} />
      </VictoryChart>
    );
  }
}

export default FarmProfileGraph;
