import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

const useStyles = makeStyles({
  root: {
    width: '100%'
  },
  stepper: {
    backgroundColor: 'transparent',
    margin: 0,
    padding: 0
  },
  label: {
    whiteSpace: 'pre-wrap'
  }
});

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

function StepIcon(props) {
  const classes = useStyles();
  const { active, completed, error } = props;
  if (error) {
    return (
      <div className={clsx(classes.icon, classes.error)}>
        <ErrorOutlineIcon />
      </div>
    );
  } else if (active && completed) {
    return (
      <div className={clsx(classes.icon, classes.activeCompleted)}>
        <CheckCircleIcon />
      </div>
    );
  } else if (active) {
    return (
      <div className={clsx(classes.icon, classes.active)}>
        <CancelIcon />
      </div>
    );
  } else if (completed) {
    return (
      <div className={clsx(classes.icon, classes.completed)}>
        <CheckCircleIcon />
      </div>
    );
  } else {
    return (
      <div className={clsx(classes.icon, classes.completed)}>
        <RadioButtonUncheckedIcon />
      </div>
    );
  }
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

export default function HorizontalLabelPositionBelowStepper() {
  const classes = useStyles();
  const steps = getSteps();

  return (
    <div className={classes.root}>
      <Stepper activeStep={5} className={classes.stepper} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel StepIconComponent={StepIcon} {...getStepStatus(index)}>
              <h3 className={classes.label}>{label}</h3>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
