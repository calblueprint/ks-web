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
  getLastCompleteStep = (gapRecord, allSteps) => {
    let lastCompleteStep = '';
    for (let i = 0; i < allSteps.length; i += 1) {
      const step = allSteps[i];
      if (gapRecord[step] === 'Complete') {
        lastCompleteStep = step;
      } else {
        break; // break at the first non-complete step
      }
    }
    return lastCompleteStep;
  };

  getData = () => {
    const labels = getCertificationLabels();
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    // const allSteps = getCertificationSteps();
    // const GAPCertifications = await getAllGAPCertificationsForKS();

    // // Create an array of 2-elem arrays of the form [step, i]
    // const stepToIndex = allSteps.map((step, i) => [step, i]);
    // console.log(stepToIndex);

    // // For each GAP Certification record, put in the category of its last complete step
    // GAPCertifications.forEach(gapRecord => {
    //   const step = this.getLastCompleteStep(gapRecord, allSteps)
    //   if (step) {

    //   }
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
