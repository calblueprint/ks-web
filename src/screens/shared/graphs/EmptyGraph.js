import React from 'react';
import { withStyles } from '@material-ui/styles';

const styles = {
  root: {
    backgroundColor: 'var(--ks-light-grey)',
    height: 250,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

class EmptyGraph extends React.PureComponent {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <p>No Production Data Yet</p>
      </div>
    );
  }
}

export default withStyles(styles)(EmptyGraph);
