import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  backButton: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  stepper: {
    backgroundColor: 'transparent'
  },
  label: {
    whiteSpace: 'pre-wrap'
  }
}));

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

export default function HorizontalLabelPositionBelowStepper() {
  const classes = useStyles();
  const steps = getSteps();

  return (
    <div className={classes.root}>
      <Stepper className={classes.stepper} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>
              <h3 className={classes.label}>{label}</h3>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
