import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import DoneIcon from '@material-ui/icons/Done';

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

const useIconStyles = makeStyles({
  root: {
    borderRadius: '50%',
    backgroundColor: 'var(--ks-dark-blue)',
    width: 36,
    height: 36,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white'
  }
});

function getSteps() {
  return [
    'Farm Referred',
    'Farm Applied',
    'Farm Accepted',
    'Food Safety Plan Complete',
    'Mock Recall Complete',
    'Internal Audit Complete (1)',
    'Internal Audit Complete (2)',
    'Group GAP Certified!'
  ];
}

function StepIcon(props) {
  const classes = useIconStyles();
  const { completed } = props;

  return <div className={classes.root}>{completed ? <DoneIcon /> : null}</div>;
}

export default function HorizontalLabelPositionBelowStepper() {
  const classes = useStyles();
  const steps = getSteps();

  return (
    <div className={classes.root}>
      <Stepper activeStep={5} className={classes.stepper} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel StepIconComponent={StepIcon}>
              <h3 className={classes.label}>{label}</h3>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
