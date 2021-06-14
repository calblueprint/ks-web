import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import CertificationGraph from './CertificationGraph';
import RecentHarvestsGraph from './RecentHarvestsGraph';
import TopItemsGraph from './TopItemsGraph';
import HarvestLogsGraph from './HarvestLogsGraph';
import ProductionGraph from './ProductionGraph';
import DateFilterMenu from '../dateFilterMenu/DateFilterMenu';

const styles = {
  root: {
    backgroundColor: 'white',
    borderRadius: '10px',
    display: 'flex',
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: 16,
    minWidth: 900,
    height: '100%'
  },
  header: {
    flex: 3
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '36px 48px'
  },
  graph: {
    width: '100%',
    padding: '0 48px',
    boxSizing: 'border-box'
  }
};

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterBy: null
    };
  }

  getGraphProps = (type, farm, filterBy) => {
    switch (type) {
      case 'certification':
        return {
          label: 'Gap Certification Progress',
          graph: <CertificationGraph />
        };
      case 'production':
        return {
          label: 'Farm Production History',
          graph: <ProductionGraph filterBy={filterBy} />
        };
      case 'recentHarvests':
        return {
          label: 'Recent Harvests',
          graph: <RecentHarvestsGraph farm={farm} filterBy={filterBy} />
        };
      case 'topItems':
        return {
          label: 'Top 5 Items',
          graph: <TopItemsGraph farm={farm} filterBy={filterBy} />
        };
      case 'harvestLogs':
        return {
          label: 'Harvest Logs',
          graph: <HarvestLogsGraph farm={farm} />
        };
      default:
        return { label: '', graph: null };
    }
  };

  setFilterState = value => {
    this.setState({ filterBy: value });
  };

  render() {
    const { classes, type, farm } = this.props;
    const { filterBy } = this.state;
    const { label, graph } = this.getGraphProps(type, farm, filterBy);

    return (
      <div className={classes.root}>
        <div className={classes.row}>
          <h2 className={classes.header}>{label}</h2>
          <DateFilterMenu onChange={this.setFilterState} />
        </div>
        <div className={classes.graph}>{graph}</div>
      </div>
    );
  }
}

export default withStyles(styles)(Graph);
