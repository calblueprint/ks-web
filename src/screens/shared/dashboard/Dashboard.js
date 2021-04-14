import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Graph from '@shared/graphs/Graph';
import RecentUpdates from './RecentUpdates';
import StatCards from './StatCards';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    margin: 32,
    maxWidth: 1680
  },
  row: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'center',
    margin: '0 -16px',
    minWidth: 256,
    height: 600
  },
  image: {
    maxWidth: '100%'
  }
};

class Dashboard extends React.PureComponent {
  render() {
    const { classes, graph } = this.props;

    return (
      <div className={classes.root}>
        <h1>Dashboard</h1>
        <StatCards />
        <div className={classes.row}>
          <Graph type={graph} />
          <RecentUpdates />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Dashboard);
