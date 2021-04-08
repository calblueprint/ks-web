import React from 'react';
import {
  VictoryChart,
  VictoryBar,
  Bar,
  VictoryAxis,
  VictoryLabel
} from 'victory';

import { getCertificationLabels } from '@lib/farmUtils';

const fontProps = {
  fontSize: 8,
  fontFamily: 'Inter',
  color: 'var(--ks-medium-dark-grey)'
};

class CertificationGraph extends React.Component {
  constructor() {
    super();
    this.state = {
      style: {
        data: { fill: 'var(--ks-dark-blue)' }
      }
    };
  }

  getData = () => {
    const labels = getCertificationLabels();
    const values = [10, 7, 5, 8, 11, 4, 3, 9, 7];
    const data = [];

    labels.forEach((label, index) => data.push({ x: label, y: values[index] }));
    return data;
  };

  render() {
    return (
      <VictoryChart padding={48} height={250} width={600}>
        <VictoryBar
          labels={({ datum }) => datum.y}
          labelComponent={<VictoryLabel dy={-5} />}
          dataComponent={<Bar />}
          style={{
            data: { fill: 'var(--ks-dark-blue)' },
            labels: fontProps
          }}
          data={this.getData()}
          barRatio={1.25}
        />
        <VictoryAxis
          style={{
            axis: { stroke: 'none' },
            tickLabels: fontProps
          }}
        />
      </VictoryChart>
    );
  }
}

export default CertificationGraph;
