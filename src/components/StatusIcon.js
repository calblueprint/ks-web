import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import {
  ErrorOutline,
  CheckCircle,
  Cancel,
  RadioButtonUnchecked
} from '@material-ui/icons';

const styles = {
  error: {
    color: 'var(--ks-error-red)'
  },
  active: {
    color: 'var(--ks-dark-blue)'
  },
  inactive: {
    color: 'var(--ks-medium-dark-grey)'
  }
};

class StatusIcon extends React.PureComponent {
  mapPropsToIcons = () => {
    const { classes } = this.props;
    return {
      error: [classes.error, <ErrorOutline fontSize="large" />],
      activeCompleted: [classes.active, <CheckCircle fontSize="large" />],
      active: [classes.active, <Cancel fontSize="large" />],
      completed: [classes.inactive, <CheckCircle fontSize="large" />],
      incompleted: [classes.inactive, <RadioButtonUnchecked fontSize="large" />]
    };
  };

  render() {
    const { active, completed, error } = this.props;
    const icons = this.mapPropsToIcons();
    let state;

    if (error) state = icons.error;
    else if (active && completed) state = icons.activeCompleted;
    else if (active) state = icons.active;
    else if (completed) state = icons.completed;
    else state = icons.incompleted;

    return <div className={state[0]}>{state[1]}</div>;
  }
}

export default withStyles(styles)(StatusIcon);
