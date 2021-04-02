import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import EditGapStatusDropdown from './components/EditGapStatusDropdown';

const styles = {
  row: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0px 24px',
    width: '100%'
  }
};

class FarmProfileEditGapStatus extends React.PureComponent {
  onChange = prop => event => {
    const { values, handleChange } = this.props;

    const gapCertificationValues = {
      ...values,
      [prop]: event.target.value
    };
    handleChange(gapCertificationValues);
  };

  mapPropsToSteps = () => {
    return {
      referred: 'Farm Referred',
      applied: 'Farm Applied',
      accepted: 'Farm Accepted',
      safetyPlan: 'Food Safety Plan Complete',
      riskAssessment: 'Risk Assessment',
      mockRecall: 'Mock Recall Complete',
      internalAudit1: 'Internal Audit Complete (1)',
      internalAudit2: 'Internal Audit Complete (2)',
      gapCertified: 'Group GAP Certified!'
    };
  };

  render() {
    const { classes, values } = this.props;
    const steps = this.mapPropsToSteps();
    const keys = Object.keys(steps);
    const labels = Object.values(steps);

    const marker = 5;

    return (
      <div>
        <h2>Gap Certification Progress</h2>
        <div className={classes.row}>
          <div className={classes.column}>
            {labels.slice(0, marker).map((label, index) => (
              <EditGapStatusDropdown
                index={index + 1}
                label={label}
                value={values[keys[index]]}
              />
            ))}
          </div>
          <div className={classes.column}>
            {labels.slice(marker).map((label, index) => (
              <EditGapStatusDropdown
                index={marker + index + 1}
                label={label}
                value={values[keys[index]]}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(FarmProfileEditGapStatus);
