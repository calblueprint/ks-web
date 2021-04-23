import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import Dropdown from '@components/Dropdown';

import CertificationGraph from './CertificationGraph';
import RecentHarvestsGraph from './RecentHarvestsGraph';
import TopItemsGraph from './TopItemsGraph';
import HarvestLogsGraph from './HarvestLogsGraph';

const styles = {
  root: {
    backgroundColor: 'white',
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

class Graph extends React.PureComponent {
  getGraphProps = (type, farmId) => {
    switch (type) {
      case 'certification':
        return {
          label: 'Gap Certification Progress',
          graph: <CertificationGraph />
        };
      case 'recentHarvests':
        return {
          label: 'Recent Harvests',
          graph: <RecentHarvestsGraph />
        };
      case 'topItems':
        return {
          label: 'Top Items',
          graph: <TopItemsGraph farmId={farmId} />
        };
      case 'harvestLogs':
        return {
          label: 'Harvest Logs',
          graph: <HarvestLogsGraph farmId={farmId} />
        };
      default:
        return { label: '', graph: null };
    }
  };

  render() {
    const { classes, type, farmId } = this.props;
    console.log(farmId);
    const { label, graph } = this.getGraphProps(type, farmId);

    return (
      <div className={classes.root}>
        <div className={classes.row}>
          <h2 className={classes.header}>{label}</h2>
          {/* TODO: Create Custom Menu for Filtering */}
          <Dropdown
            items={['Date Filters']}
            icon={<CalendarTodayIcon />}
            value={0}
          />
        </div>
        <div className={classes.graph}>{graph}</div>
      </div>
    );
  }
}

export default withStyles(styles)(Graph);
