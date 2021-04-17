import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import FieldInput from '@components/FieldInput';
import Dropdown from '@components/Dropdown';
import { Button } from '@material-ui/core';
import states from '@assets/usStates';
import {
  createComment,
  createFarm,
  createGAPCertification
} from '../../lib/airtable/request';

const styles = {
  title: {
    marginTop: '10%'
  },
  form: {
    padding: '10px 48px',
    margin: '48px 0px 48px 0px',
    backgroundColor: 'white'
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    margin: '16px 0px',
    width: '100%'
  },
  dropdown: {
    flex: 1,
    margin: '-16px 12px 0px 12px'
  },
  additionalNotes: {
    backgroundColor: 'var(--ks-light-grey)',
    'textarea::placeholder': {
      color: '#333333'
    }
  },
  button: {
    marginBottom: '24px',
    backgroundColor: 'var(--ks-dark-blue)',
    color: 'white',
    borderColor: 'white'
  }
};
class FarmReferralForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ksAffiliated: true,
      submitted: false,
      mailingState: '',
      physicalState: ''
    };
  }

  onChange(name) {
    return event => {
      this.setState({
        [name]: event.target.value
      });
    };
  }

  referFarm = () => {
    const newFarm = { ...this.state };
    delete newFarm.submitted;
    delete newFarm.additionalNotes;
    newFarm.mailingState = states[this.state.mailingState];
    newFarm.physicalState = states[this.state.physicalState];

    const { user } = this.props;
    const newComment = {
      comment: this.state.additionalNotes,
      authorId: user.id
    };

    const defaultGAPCertification = {
      farmReferred: 'Incomplete',
      farmApplied: 'Incomplete',
      farmAccepted: 'Incomplete',
      farmFoodSafetyPlan: 'Incomplete',
      riskAssessment: 'Incomplete',
      mockRecall: 'Incomplete',
      internalAudit1: 'Incomplete',
      internalAudit2: 'Incomplete',
      gapCertified: false,
      farmReferredDate: Date.now()
    };

    createFarm(newFarm).then(res => {
      defaultGAPCertification.farmId = res;

      newComment.farmId = res;
      createComment(newComment);

      createGAPCertification(defaultGAPCertification).then(
        this.setState({ submitted: true })
      );
    });
  };

  render() {
    const { classes } = this.props;
    const values = this.state;

    return values.submitted ? (
      <div>
        <h1>Submitted!</h1>
        <h2>
          Refer another farm <a href="/referral">here</a>
        </h2>
      </div>
    ) : (
      <div className={classes.root}>
        <h1 className={classes.title}>Refer a Farm to the Group GAP Program</h1>
        <div className={classes.form}>
          <h2>Contact Information</h2>
          <div className={classes.row}>
            <FieldInput
              label="First Name"
              onChange={this.onChange('contactFirstName')}
              variant="outlined"
            />
            <FieldInput
              label="Last Name"
              onChange={this.onChange('contactLastName')}
              variant="outlined"
            />
          </div>
          <div className={classes.row}>
            <FieldInput
              label="Farm Name"
              onChange={this.onChange('farmName')}
              variant="outlined"
            />
          </div>
          <div className={classes.row}>
            <FieldInput
              label="Cell Phone"
              onChange={this.onChange('phone')}
              variant="outlined"
            />
            <FieldInput
              label="Email"
              onChange={this.onChange('farmEmail')}
              variant="outlined"
            />
          </div>
          <div className={classes.row}>
            <FieldInput
              label={`Farm Physical Address \u2014 Street`}
              onChange={this.onChange('physicalStreet1')}
              variant="outlined"
            />
          </div>
          <div className={classes.row}>
            <FieldInput
              label="City"
              onChange={this.onChange('physicalCity')}
              variant="outlined"
            />
            <div className={classes.dropdown}>
              <Dropdown
                label="State"
                items={states}
                onChange={this.onChange('physicalState')}
                value={values.physicalState}
              />
            </div>
            <FieldInput
              label="ZIP"
              onChange={this.onChange('physicalZipcode')}
              variant="outlined"
            />
          </div>
          <div className={classes.row}>
            <FieldInput
              label={`Farm Mailing Address \u2014 Street`}
              onChange={this.onChange('mailingStreet1')}
              variant="outlined"
            />
          </div>
          <div className={classes.row}>
            <FieldInput
              label="City"
              onChange={this.onChange('mailingCity')}
              variant="outlined"
            />
            <div className={classes.dropdown}>
              <Dropdown
                label="State"
                items={states}
                onChange={this.onChange('mailingState')}
                value={values.mailState}
              />
            </div>
            <FieldInput
              label="ZIP"
              onChange={this.onChange('mailingZipcode')}
              variant="outlined"
            />
          </div>
        </div>
        <div className={classes.form}>
          <h2>Additional Notes</h2>
          <FieldInput
            onChange={this.onChange('additionalNotes')}
            variant="outlined"
            placeholder="Leave a note for NSEVP here (e.g. how to get to the farm, physical landmarks)"
            multiline
            rows={5}
            className={classes.additionalNotes}
          />
        </div>
        <Button
          onClick={this.referFarm}
          className={classes.button}
          variant="contained"
          color="inherit"
        >
          Submit
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(FarmReferralForm);
