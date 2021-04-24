import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { Clear, Done } from '@material-ui/icons/';

const styles = {
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: 12
  },
  button: {
    padding: '0px 12px'
  }
};

class DateFilterMenu extends React.PureComponent {
  render() {
    const { classes, handleClear, handleApply } = this.props;

    return (
      <div className={classes.buttons}>
        <Button
          className={classes.button}
          startIcon={<Clear />}
          onClick={handleClear}
        >
          <p>Clear</p>
        </Button>
        <Button
          className={classes.button}
          startIcon={<Done />}
          onClick={handleApply}
        >
          <p>Apply</p>
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(DateFilterMenu);
