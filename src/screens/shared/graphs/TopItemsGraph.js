import React from 'react';
import { getSingleFarm } from '@lib/farmUtils';

import FarmProfileGraph from './FarmProfileGraph';

class TopItemsGraph extends React.PureComponent {
  async componentDidMount() {
    const { match } = this.props;
    const { farmId } = match.params;
    const farm = await getSingleFarm(farmId);
    this.setState({ farm, farmId, loading: false });
  }

  getData = () => {
    // Fill in with Airtable Data
    return {
      labels: ['Eggplant', 'Tomato', 'Cucumber', 'Melons', 'Apple'],
      values: [10, 7, 5, 8, 11]
    };
  };

  render() {
    const { farm, farmId, loading } = this.state;

    const { labels, values } = this.getData();
    return <FarmProfileGraph labels={labels} values={values} />;
  }
}

export default TopItemsGraph;
