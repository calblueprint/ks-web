import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import FieldInput from '@components/FieldInput';
import Dropdown from '@components/Dropdown';
import { Button } from '@material-ui/core';
import states from '@assets/usStates';
import {
  validateFarmEdit,
  createFalseDict,
  farmFieldsToValidate
} from '@lib/validationUtils';
import {
  createComment,
  createFarm,
  createGAPCertification
} from '@lib/airtable/request';
import { getDefaultCertificationObj } from '@lib/utils';

const styles = {
  root: {
    width: '60%'
  },
  title: {
    marginTop: '10%'
  },
  form: {
    padding: '10px 48px',
    margin: '48px 0px 48px 0px',
    backgroundColor: 'white',
    borderRadius: '4px'
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
    margin: '0px 32px 0px 12px',
    '& h3': {
      margin: '0px 0px 16px 0px'
    }
  },
  additionalNotes: {
    backgroundColor: 'var(--ks-light-grey)',
    'textarea::placeholder': {
      color: '#333333'
    }
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%'
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
      physicalState: '',
      errors: createFalseDict(farmFieldsToValidate)
    };
  }

  onChange(name) {
    return event => {
      this.setState({
        [name]: event.target.value
      });
    };
  }

  referFarm = async () => {
    const newFarm = { ...this.state };
    delete newFarm.submitted;
    delete newFarm.additionalNotes;
    delete newFarm.errors;

    // select value from index provided by select
    const { mailingState, physicalState, additionalNotes } = this.state;
    newFarm.mailingState = states[mailingState];
    newFarm.physicalState = states[physicalState];

    // create farm
    const { user } = this.props;
    const newComment = {
      comment: additionalNotes,
      authorId: user.id
    };

    const defaultGAPCertification = getDefaultCertificationObj();
    const validRed = await validateFarmEdit(newFarm);
    this.setState({ errors: validRed.errors });

    // dont create farm if validation failed
    if (!validRed.validated) {
      return;
    }

    // todo replace with better func call
    createFarm(newFarm)
      .then(res => {
        defaultGAPCertification.farmId = res;
        newComment.farmId = res;

        createComment(newComment).catch(e => {
          console.error(e);
        });
        createGAPCertification(defaultGAPCertification)
          .then(this.setState({ submitted: true }))
          .catch(e => {
            console.error(e);
          });
      })
      .catch(e => {
        console.error(e);
      });
  };

  render() {
    const { classes } = this.props;
    const values = this.state;
    const { errors } = this.state;

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
              value={values.contactFirstName || ''}
              error={errors.contactFirstName !== false}
              tooltip={errors.contactFirstName}
            />
            <FieldInput
              label="Last Name"
              onChange={this.onChange('contactLastName')}
              variant="outlined"
              value={values.contactLastName || ''}
              error={errors.contactLastName !== false}
              tooltip={errors.contactLastName}
            />
          </div>
          <div className={classes.row}>
            <FieldInput
              label="Farm Name"
              onChange={this.onChange('farmName')}
              variant="outlined"
              value={values.farmName || ''}
              error={errors.farmName !== false}
              tooltip={errors.farmName}
            />
          </div>
          <div className={classes.row}>
            <FieldInput
              label="Cell Phone"
              onChange={this.onChange('phone')}
              variant="outlined"
              value={values.phone || ''}
              error={errors.phone !== false}
              tooltip={errors.phone}
            />
            <FieldInput
              label="Email"
              onChange={this.onChange('farmEmail')}
              variant="outlined"
              value={values.farmEmail || ''}
              error={errors.farmEmail !== false}
              tooltip={errors.farmEmail}
            />
          </div>
          <div className={classes.row}>
            <FieldInput
              label={`Farm Physical Address \u2014 Street`}
              onChange={this.onChange('physicalStreet1')}
              variant="outlined"
              value={values.physicalStreet1 || ''}
              error={errors.physicalStreet1 !== false}
              tooltip={errors.physicalStreet1}
            />
          </div>
          <div className={classes.row}>
            <FieldInput
              label="City"
              onChange={this.onChange('physicalCity')}
              variant="outlined"
              value={values.physicalCity || ''}
              error={errors.physicalCity !== false}
              tooltip={errors.physicalCity}
            />
            <div className={classes.dropdown}>
              <Dropdown
                label="State"
                items={states}
                onChange={this.onChange('physicalState')}
                value={values.physicalState || 0}
                error={errors.physicalState !== false}
                tooltip={errors.physicalState}
              />
            </div>
            <FieldInput
              label="ZIP"
              onChange={this.onChange('physicalZipcode')}
              variant="outlined"
              value={values.physicalZipcode || ''}
              error={errors.physicalZipcode !== false}
              tooltip={errors.physicalZipcode}
            />
          </div>
          <div className={classes.row}>
            <FieldInput
              label={`Farm Mailing Address \u2014 Street`}
              onChange={this.onChange('mailingStreet1')}
              value={values.mailingStreet1 || ''}
              variant="outlined"
              error={errors.mailingStreet1 !== false}
              tooltip={errors.mailingStreet1}
            />
          </div>
          <div className={classes.row}>
            <FieldInput
              label="City"
              onChange={this.onChange('mailingCity')}
              value={values.mailingCity || ''}
              variant="outlined"
              error={errors.mailingCity !== false}
              tooltip={errors.mailingCity}
            />
            <div className={classes.dropdown}>
              <Dropdown
                label="State"
                items={states}
                onChange={this.onChange('mailingState')}
                value={values.mailingState || 0}
                error={errors.mailingState !== false}
                tooltip={errors.mailingState}
              />
            </div>
            <FieldInput
              label="ZIP"
              onChange={this.onChange('mailingZipcode')}
              value={values.mailingZipcode || ''}
              variant="outlined"
              error={errors.mailingZipcode !== false}
              tooltip={errors.mailingZipcode}
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
            value={values.additionalNotes || ''}
          />
        </div>
        <div className={classes.buttonContainer}>
          <Button
            onClick={this.referFarm}
            className={classes.button}
            variant="contained"
            color="inherit"
          >
            Submit
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(FarmReferralForm);
