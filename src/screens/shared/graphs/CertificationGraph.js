import React from 'react';
import {
  VictoryChart,
  VictoryBar,
  Bar,
  VictoryAxis,
  VictoryLabel
} from 'victory';

import {
  getCertificationLabels,
  getCertificationSteps,
  getAllGAPCertificationsForKS
} from '@lib/gapCertificationUtils';
import EmptyGraph from './EmptyGraph';

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
  constructor(props) {
    super(props);
    this.allSteps = getCertificationSteps();
    this.state = {
      labels: getCertificationLabels(),
      values: []
    };
  }

  async componentDidMount() {
    const values = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    const GAPCertifications = await getAllGAPCertificationsForKS();

    // Create a dictionary mapping each step to its index position
    const stepToIndex = {};
    this.allSteps.forEach((step, i) => {
      stepToIndex[step] = i;
    });
    console.log(stepToIndex);

    // For each GAP Certification record, get the last complete step and increment that category
    GAPCertifications.forEach(gapRecord => {
      const step = this.getLastCompleteStep(gapRecord);
      console.log(gapRecord);
      console.log(step);
      if (step !== '') values[stepToIndex[step]] += 1;
    });

    this.setState({ values });
  }

  // Return the last completed step in the GAP Certification process
  getLastCompleteStep = gapRecord => {
    let lastCompleteStep = '';
    for (let i = this.allSteps.length - 1; i >= 0; i -= 1) {
      const step = this.allSteps[i];
      if (gapRecord[step] === 'Complete') {
        lastCompleteStep = step;
        break;
      }
    }
    return lastCompleteStep;
  };

  render() {
    const { labels, values } = this.state;
    if (values.length === 0) return <EmptyGraph />;

    const data = labels.map((label, index) => ({ x: label, y: values[index] }));
    return (
      <VictoryChart padding={48} height={250} width={600}>
        <VictoryBar
          labels={({ datum }) => datum.y}
          labelComponent={<VictoryLabel dy={-5} />}
          dataComponent={<Bar />}
          style={barStyles}
          data={data}
          barRatio={1.25}
        />
        <VictoryAxis style={axisStyles} />
      </VictoryChart>
    );
  }
}

export default CertificationGraph;
