import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import BackButton from '@components/BackButton';

import FarmProfileEditForm from './FarmProfileEditForm';
import FarmProfileEditDropdown from './FarmProfileEditDropdown';
import FarmProfileEditGapStatus from './FarmProfileEditGapStatus';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    margin: 64,
    padding: 72,
    backgroundColor: 'white',
    maxWidth: 1680,
    width: '100%'
  }
};

class FarmProfileEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formValues: {
        physicalState: 0,
        mailState: 0
      },
      dropdownValues: {
        gapContact: 0,
        foodHubAffiliation: 0
      },
      gapCertificationValues: {
        referred: 0,
        applied: 0,
        accepted: 0,
        safetyPlan: 0,
        riskAssessment: 0,
        mockRecall: 0,
        internalAudit1: 0,
        internalAudit2: 0,
        gapCertified: 0
      }
    };
  }

  handleChange = prop => value => {
    this.setState(prevState => ({ ...prevState, [prop]: value }));
  };

  handleSubmit = () => {
    console.log(this.state);
  };

  render() {
    const { classes, match } = this.props;
    const { farmId } = match.params;
    const { formValues, dropdownValues, gapCertificationValues } = this.state;

    return (
      <div className={classes.root}>
        <BackButton label="Back to Farm" href={`/farm/${farmId}`} />
        <h1>Edit Information</h1>
        <FarmProfileEditForm
          values={formValues}
          handleChange={this.handleChange('formValues')}
        />
        <FarmProfileEditDropdown
          values={dropdownValues}
          handleChange={this.handleChange('dropdownValues')}
        />
        <FarmProfileEditGapStatus
          values={gapCertificationValues}
          handleChange={this.handleChange('gapCertificationValues')}
        />
      </div>
    );
  }
}

export default withStyles(styles)(FarmProfileEdit);
