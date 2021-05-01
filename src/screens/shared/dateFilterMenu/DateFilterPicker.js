import React from 'react';
import clsx from 'clsx';

import { withStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

const styles = {
  picker: {
    display: 'flex',
    alignItems: 'center',
    margin: 24
  },
  column: {
    display: 'flex',
    flexDirection: 'column'
  },
  label: {
    margin: 0
  },
  right: {
    marginLeft: 24
  }
};

class DateFilterMenu extends React.PureComponent {
  render() {
    const { classes, handleStart, handleEnd } = this.props;

    return (
      <div className={classes.picker}>
        <div className={classes.column}>
          <p className={classes.label}>Start Date</p>
          <TextField type="date" onChange={handleStart} />
        </div>
        <div className={clsx(classes.column, classes.right)}>
          <p className={classes.label}>End Date</p>
          <TextField type="date" onChange={handleEnd} />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(DateFilterMenu);
