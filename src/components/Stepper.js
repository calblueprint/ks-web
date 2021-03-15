import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Step, StepLabel, Stepper } from '@material-ui/core';
import {
  ErrorOutline,
  CheckCircle,
  Cancel,
  RadioButtonUnchecked
} from '@material-ui/icons';

const useStyles = makeStyles({
  root: {
    width: '100%'
  },
  connector: {
    color: 'red'
  },
  stepper: {
    backgroundColor: 'transparent',
    margin: 0,
    padding: 0
  },
  label: {
    whiteSpace: 'pre-wrap'
  },
  date: {
    margin: 4,
    color: 'var(--ks-medium-dark-grey)'
  }
});

const useIconStyles = makeStyles({
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

function StepIcon(props) {
  const classes = useIconStyles();
  const { active, completed, error } = props;
  let state;

  const icons = {
    error: [classes.error, <ErrorOutline fontSize="large" />],
    activeCompleted: [classes.active, <CheckCircle fontSize="large" />],
    active: [classes.active, <Cancel fontSize="large" />],
    completed: [classes.inactive, <CheckCircle fontSize="large" />],
    incompleted: [classes.inactive, <RadioButtonUnchecked fontSize="large" />]
  };

  if (error) state = icons.error;
  else if (active && completed) state = icons.activeCompleted;
  else if (active) state = icons.active;
  else if (completed) state = icons.completed;
  else state = icons.incompleted;

  return <div className={state[0]}>{state[1]}</div>;
}

function getStepStatus(index) {
  /* Mock Data */
  /* TODO: Mock Airtable Data to Index */
  const completed = [0, 1, 2, 3, 4];
  const active = [5];
  const error = [6, 7];

  return {
    completed: completed.includes(index),
    active: active.includes(index),
    error: error.includes(index)
  };
}

function getSteps() {
  return [
    'Farm Referred',
    'Farm Applied',
    'Farm Accepted',
    'Food Safety Plan Complete',
    'Risk Assessment',
    'Mock Recall Complete',
    'Internal Audit Complete (1)',
    'Internal Audit Complete (2)',
    'Group GAP Certified!'
  ];
}

export default function HorizontalLabelPositionBelowStepper() {
  const classes = useStyles();
  const steps = getSteps();

  return (
    <div className={classes.root}>
      <Stepper className={classes.stepper} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel StepIconComponent={StepIcon} {...getStepStatus(index)}>
              <h3 className={classes.label}>{label}</h3>
              <h3 className={classes.date}>Date:</h3>
              <h3 className={classes.date}>3/24/2021</h3>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
