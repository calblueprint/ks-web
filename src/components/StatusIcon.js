import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {
  ErrorOutline,
  CheckCircle,
  Cancel,
  RadioButtonUnchecked
} from '@material-ui/icons';

const useStyles = makeStyles({
  error: {
    color: 'var(--ks-error-red)'
  },
  active: {
    color: 'var(--ks-dark-blue)'
  },
  inactive: {
    color: 'var(--ks-medium-dark-grey)'
  }
});

function mapPropsToIcons(classes) {
  return {
    error: [classes.error, <ErrorOutline fontSize="large" />],
    activeCompleted: [classes.active, <CheckCircle fontSize="large" />],
    active: [classes.active, <Cancel fontSize="large" />],
    completed: [classes.inactive, <CheckCircle fontSize="large" />],
    incompleted: [classes.inactive, <RadioButtonUnchecked fontSize="large" />]
  };
}

export default function StatusIcon(props) {
  const { active, completed, error } = props;
  const classes = useStyles();
  const icons = mapPropsToIcons(classes);
  let state;

  if (error) state = icons.error;
  else if (active && completed) state = icons.activeCompleted;
  else if (active) state = icons.active;
  else if (completed) state = icons.completed;
  else state = icons.incompleted;

  return <div className={state[0]}>{state[1]}</div>;
}
