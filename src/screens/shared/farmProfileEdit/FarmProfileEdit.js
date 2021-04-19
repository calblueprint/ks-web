import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Button from '@components/Button';
import BackButton from '@components/BackButton';

import { getSingleFarm, getGapCertificationStatus } from '@lib/farmUtils';

import FarmProfileEditForm from './FarmProfileEditForm';
import FarmProfileEditDropdown from './FarmProfileEditDropdown';
import FarmProfileEditGapStatus from './FarmProfileEditGapStatus';
import FarmProfileEditComments from './FarmProfileEditComments';
import {
  validateFarmEdit,
  createFalseDict,
  farmFieldsToValidate
} from '@lib/utils';
import { createFarm } from '@lib/airtable/request';
import states from '@assets/usStates';

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
      farm: {},
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
      comments: '',
      errors: createFalseDict(farmFieldsToValidate)
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
      }
    });
    this.setState({ farm, farmId, gapStatus });
  }

  handleChange = prop => value => {
    this.setState(prevState => ({ ...prevState, [prop]: value }));
  };

  handleChangeForm = name => {
    return event => {
      const val = event.target.value;
      this.setState(prevState => ({
        ...prevState,
        farm: { ...prevState.farm, [name]: val }
      }));
    };
  };

  handleSubmit = () => {
    this.editFarm();
  };

  editFarm = async () => {
    const newFarm = { ...this.state.farm };

    // select value from index provided by select
    const { mailingState, physicalState } = this.state.farm;
    newFarm.mailingState = states[mailingState];
    newFarm.physicalState = states[physicalState];

    // create farm
    // const { user } = this.props;
    // const newComment = {
    //   comment: additionalNotes,
    //   authorId: user.id
    // };

    const validRed = await validateFarmEdit(newFarm);
    this.setState({ errors: validRed.errors });

    // dont create farm if validation failed
    if (!validRed.validated) {
      return;
    }

    // todo replace with better func call
    createFarm(newFarm).catch(e => {
      console.error(e);
    });
  };

  render() {
    const { classes, match } = this.props;
    const { farmId } = match.params;
    const { farm, dropdownValues, gapStatus, comments, errors } = this.state;

    return (
      <div className={classes.root}>
        <BackButton label="Back to Farm" href={`/farm/${farmId}`} />
        <h1>Edit Information</h1>
        <FarmProfileEditForm
          values={farm}
          errors={errors}
          onChange={this.handleChangeForm}
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
