import React from 'react';
import {
  VictoryChart,
  VictoryBar,
  Bar,
  VictoryAxis,
  VictoryLabel
} from 'victory';

import { getCertificationLabels } from '@lib/gapCertificationUtils';

const fontProps = {
  fontSize: 8,
  fontFamily: 'Inter',
  color: 'var(--ks-medium-dark-grey)'
};

const barStyles = {
  data: {
    fill: 'var(--ks-dark-blue)'
  },
  labels: fontProps
};

const axisStyles = {
  axis: {
    stroke: 'none'
  },
  tickLabels: fontProps
};

class CertificationGraph extends React.PureComponent {
  getData = () => {
    const labels = getCertificationLabels();
    const values = [10, 7, 5, 8, 11, 4, 3, 9, 7];

    return labels.map((label, index) => ({ x: label, y: values[index] }));
  };

  render() {
    return (
      <VictoryChart padding={48} height={250} width={600}>
        <VictoryBar
          labels={({ datum }) => datum.y}
          labelComponent={<VictoryLabel dy={-5} />}
          dataComponent={<Bar />}
          style={barStyles}
          data={this.getData()}
          barRatio={1.25}
        />
        <VictoryAxis style={axisStyles} />
      </VictoryChart>
    );
  }
}

export default CertificationGraph;
