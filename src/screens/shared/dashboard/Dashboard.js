import React from 'react';
import DashboardGraph from '@assets/dashboardGraph.png';
import { withStyles } from '@material-ui/core/styles';

import RecentUpdates from '@shared/dashboard/RecentUpdates';
import StatCards from '@shared/dashboard/StatCards';

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
    justifyContent: 'center',
    margin: '0 -16px',
    minWidth: 256,
    height: 512
  },
  graph: {
    alignItems: 'center',
    backgroundColor: 'white',
    display: 'flex',
    flex: 2.25,
    height: '100%',
    justifyContent: 'center',
    margin: 16,
    minWidth: 512
  },
  image: {
    maxWidth: '100%'
  }
};

class Dashboard extends React.PureComponent {
  render() {
    const { classes, isNSEVP } = this.props;
    return (
      <div className={classes.root}>
        <h1>Dashboard</h1>
        <StatCards isNSEVP={isNSEVP} />
        <div className={classes.row}>
          <div className={classes.graph}>
            <img
              className={classes.image}
              src={DashboardGraph}
              alt="farm production history"
            />
          </div>
          <RecentUpdates />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Dashboard);
