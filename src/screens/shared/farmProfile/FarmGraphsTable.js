import React from 'react';
import '@styles/FarmProfile.css';

import { withStyles } from '@material-ui/core/styles';

import Graph from '@shared/graphs/Graph';

const styles = {
  graph: {
    height: 360,
    maxHeight: 560,
    margin: '64px 0'
  },
  divider: {
    margin: 48,
    borderTop: '0.7px solid var(--ks-medium-light-grey)'
  }
};
class FarmGraphsTable extends React.PureComponent {
  render() {
    const { classes } = this.props;
    return (
      <>
        <div className={classes.graph}>
          <Graph type="topItems" />
        </div>
        <div className={classes.divider} />
        <div className={classes.graph}>
          <Graph type="recentHarvests" />
        </div>
        <div className={classes.divider} />
        <div className="farm-graph-container">
          <Graph type="harvestLogs" />
        </div>
      </>
    );
  }
}

export default withStyles(styles)(FarmGraphsTable);
