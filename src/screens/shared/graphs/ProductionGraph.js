import React from 'react';
import {
  VictoryChart,
  VictoryBar,
  Bar,
  VictoryAxis,
  VictoryStack
} from 'victory';

import { getCertificationLabels } from '@lib/farmUtils';

const fontProps = {
  fontSize: 8,
  fontFamily: 'Inter',
  color: 'var(--ks-medium-dark-grey)'
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

const colors = [
  'var(--ks-dark-blue)', 
  'var(--ks-medium-dark-blue)', 
  'var(--ks-medium-blue)',
  'var(--ks-medium-light-blue)',
  'var(--ks-light-blue)',
]

class ProductionGraph extends React.PureComponent {
  getData = () => {
    const labels = getCertificationLabels();
    const values = [10, 7, 5, 8, 11, 4, 3, 9, 7];

    return labels.map((label, index) => ({ x: label, y: values[index] }));
  };

  render() {
    return (
      <VictoryChart padding={48} height={250} width={600}>
        <VictoryStack colorScale={colors}>
          {[...Array(4)].map(i => 
            <VictoryBar
              dataComponent={<Bar />}
              style={barStyles}
              data={this.getData()}
              barRatio={1.25}
            />
          )}
        </VictoryStack>
       
        <VictoryAxis style={axisStyles} />
      </VictoryChart>
    );
  }
}

export default ProductionGraph;
