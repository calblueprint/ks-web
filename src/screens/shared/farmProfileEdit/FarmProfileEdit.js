import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Button from '@components/Button';
import BackButton from '@components/BackButton';

import { getSingleFarm, getGapCertificationStatus } from '@lib/farmUtils';

import {
  validateFarmEdit,
  createFalseDict,
  farmFieldsToValidate
} from '@lib/utils';
import { createFarm } from '@lib/airtable/request';
import FarmProfileEditForm from './FarmProfileEditForm';
import FarmProfileEditDropdown from './FarmProfileEditDropdown';
import FarmProfileEditGapStatus from './FarmProfileEditGapStatus';
import FarmProfileEditComments from './FarmProfileEditComments';
import { getSingleFarmAndGapCertification } from '@lib/farmUtils';
import { getAllGroupGapContacts } from '@lib/farmUtils';
import { updateFarmAndCertification } from '../../../lib/farmUtils';

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

    // farm information and gap certification
    const farmAndGap = await getSingleFarmAndGapCertification(farmId);
    const farm = farmAndGap['farm'];
    const gapStatus = farmAndGap['gapStatus'];

    // group gap information
    const [userIds, userNames] = await getAllGroupGapContacts();
    const dropdownValues = {
      gapContact: farm.groupGapContactIds[0],
      contactNames: userNames,
      contactIds: userIds,
      foodHubAffiliation: []
    };

    this.setState({ farm, farmId, gapStatus, dropdownValues });
  }

  handleChange = prop => value => {
    this.setState(prevState => ({ ...prevState, [prop]: value }));
  };

  editFarm = async () => {
    const { gapStatus, comments } = this.state;
    const newFarm = this.state.farm;

    // TODO format the dates for the GAP certification and turn indices into values
    // TODO format the additional notes object
    // TODO push all info to airtable

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

    updateFarmAndCertification(newFarm, gapStatus, comments);
    // todo replace with better func call
    // createFarm(newFarm).catch(e => {
    //   console.error(e);
    // });
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
          handleChange={this.handleChange}
          onDropdownChange={this.handleDropdownChange}
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
          <Button className={classes.button} onClick={this.editFarm}>
            Save
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(FarmProfileEdit);
