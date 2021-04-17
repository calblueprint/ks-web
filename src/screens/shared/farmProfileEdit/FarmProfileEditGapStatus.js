import React from 'react';

import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import { mapCertificationStepsToLabels } from '@lib/farmUtils';
import EditGapStatusDropdown from './components/EditGapStatusDropdown';

const styles = {
  row: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: 48
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    border: '1px solid var(--ks-medium-dark-grey)',
    borderRadius: 10,
    padding: 24
  },
  leftColumn: {
    marginRight: 48
  }
};

class FarmProfileEditGapStatus extends React.Component {
  onChange = prop => event => {
    const { values, handleChange } = this.props;

    const gapCertificationValues = {
      ...values,
      [prop]: event.target.value
    };
    handleChange(gapCertificationValues);
  };

  render() {
    const { classes, values } = this.props;
    const map = mapCertificationStepsToLabels();
    const steps = Object.keys(map);
    const labels = Object.values(map);

    const marker = 4;
    return (
      <div>
        <h2>Gap Certification Progress</h2>
        <div className={classes.row}>
          <div className={clsx(classes.column, classes.leftColumn)}>
            {steps.slice(0, marker).map((step, index) => (
              <EditGapStatusDropdown
                index={index + 1}
                key={labels[index]}
                label={labels[index]}
                value={values[step]}
                onChange={this.onChange(step)}
              />
            ))}
          </div>
          <div className={classes.column}>
            {steps.slice(marker).map((step, index) => (
              <EditGapStatusDropdown
                index={marker + index + 1}
                key={labels[marker + index]}
                label={labels[marker + index]}
                value={values[step]}
                onChange={this.onChange(step)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(FarmProfileEditGapStatus);
