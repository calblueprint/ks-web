import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { Step, StepLabel, Stepper } from '@material-ui/core';
import StatusIcon from '@components/StatusIcon';

const styles = {
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
};

class FarmCertificationStepper extends React.Component {
  getSteps = () => {
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
  };

  getStepStatus = index => {
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
  };

  render() {
    const { classes } = this.props;
    const steps = this.getSteps();

    return (
      <div className={classes.root}>
        <Stepper className={classes.stepper} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel
                StepIconComponent={StatusIcon}
                {...this.getStepStatus(index)}
              >
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
}

export default withStyles(styles)(FarmCertificationStepper);