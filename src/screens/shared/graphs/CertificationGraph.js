import React from 'react';
import {
  VictoryChart,
  VictoryBar,
  Bar,
  VictoryAxis,
  VictoryLabel
} from 'victory';

import {
  // getAllGAPCertificationsForKS,
  getCertificationLabels
} from '@lib/utils';

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
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    // const steps = getCertificationSteps();
    // const GAPCertifications = await getAllGAPCertificationsForKS();
    // const valueDict = {};

    // // For each GAP Certification record,
    // GAPCertifications.forEach(gap => {
    //   steps.forEach(step => {
    //     if (farm[step] === 'Complete') {

    //     }
    //   })
    // });

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
