import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Button from '@components/Button';
import BackButton from '@components/BackButton';

import { getSingleFarm, getGapCertificationStatus } from '@lib/farmUtils';

import FarmProfileEditForm from './FarmProfileEditForm';
import FarmProfileEditDropdown from './FarmProfileEditDropdown';
import FarmProfileEditGapStatus from './FarmProfileEditGapStatus';
import FarmProfileEditComments from './FarmProfileEditComments';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    margin: 64,
    padding: 72,
    backgroundColor: 'white',
    maxWidth: 1680,
    width: '100%'
  },
  buttonRow: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    marginTop: 48
  }
};

class FarmProfileEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formValues: {
        physicalState: 0,
        mailingState: 0
      },
      dropdownValues: {
        gapContact: 0,
        foodHubAffiliation: 0
      },
      gapStatus: {
        farmReferred: 0,
        farmApplied: 0,
        farmAccepted: 0,
        farmFoodSafetyPlan: 0,
        riskAssessment: 0,
        mockRecall: 0,
        internalAudit1: 0,
        internalAudit2: 0,
        gapCertified: 0
      },
      comments: ''
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { farmId } = match.params;
    let gapStatus = false;
    let farm;
    await getSingleFarm(farmId).then(async res => {
      farm = res;
      if (res.gapCertificationId) {
        gapStatus = await getGapCertificationStatus(res.gapCertificationId);
        farm.gapStatus = gapStatus;
      }
    });
    this.setState({ farm, farmId, gapStatus });
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
    const { formValues, dropdownValues, gapStatus, comments } = this.state;

    return (
      <div className={classes.root}>
        <BackButton label="Back to Farm" href={`/farm/${farmId}`} />
        <h1>Edit Information</h1>
        <FarmProfileEditForm
          farmId={farmId}
          values={formValues}
          handleChange={this.handleChange('formValues')}
        />
        <FarmProfileEditDropdown
          values={dropdownValues}
          handleChange={this.handleChange('dropdownValues')}
        />
        <FarmProfileEditGapStatus
          values={gapStatus}
          handleChange={this.handleChange('gapStatus')}
        />
        <FarmProfileEditComments
          values={comments}
          handleChange={this.handleChange('comments')}
        />
        <div className={classes.buttonRow}>
          <Button className={classes.button} onClick={this.handleSubmit}>
            Save
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(FarmProfileEdit);
