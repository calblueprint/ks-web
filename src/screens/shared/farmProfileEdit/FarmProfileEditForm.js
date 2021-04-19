import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import FieldInput from '@components/FieldInput';
import Dropdown from '@components/Dropdown';
import states from '@assets/usStates';

const styles = {
  form: {
    margin: '48px 0px 48px 0px'
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
  }
};
class FarmProfileEditForm extends React.PureComponent {
  render() {
    const { classes, onChange, errors, values } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.form}>
          <h2>Contact Information</h2>
          <div className={classes.row}>
            <FieldInput
              label="First Name"
              onChange={onChange('contactFirstName')}
              variant="outlined"
              value={values.contactFirstName || ''}
              error={errors.contactFirstName !== false}
              tooltip={errors.contactFirstName}
            />
            <FieldInput
              label="Last Name"
              onChange={onChange('contactLastName')}
              variant="outlined"
              value={values.contactLastName || ''}
              error={errors.contactLastName !== false}
              tooltip={errors.contactLastName}
            />
          </div>
          <div className={classes.row}>
            <FieldInput
              label="Farm Name"
              onChange={onChange('farmName')}
              variant="outlined"
              value={values.farmName || ''}
              error={errors.farmName !== false}
              tooltip={errors.farmName}
            />
          </div>
          <div className={classes.row}>
            <FieldInput
              label="Cell Phone"
              onChange={onChange('phone')}
              variant="outlined"
              value={values.phone || ''}
              error={errors.phone !== false}
              tooltip={errors.phone}
            />
            <FieldInput
              label="Email"
              onChange={onChange('farmEmail')}
              variant="outlined"
              value={values.farmEmail || ''}
              error={errors.farmEmail !== false}
              tooltip={errors.farmEmail}
            />
          </div>
          <div className={classes.row}>
            <FieldInput
              label={`Farm Physical Address \u2014 Street`}
              onChange={onChange('physicalStreet1')}
              variant="outlined"
              value={values.physicalStreet1 || ''}
              error={errors.physicalStreet1 !== false}
              tooltip={errors.physicalStreet1}
            />
          </div>
          <div className={classes.row}>
            <FieldInput
              label="City"
              onChange={onChange('physicalCity')}
              variant="outlined"
              value={values.physicalCity || ''}
              error={errors.physicalCity !== false}
              tooltip={errors.physicalCity}
            />
            <div className={classes.dropdown}>
              <Dropdown
                label="State"
                items={states}
                onChange={onChange('physicalState')}
                value={values.physicalState || 0}
                error={errors.physicalState !== false}
                tooltip={errors.physicalState}
              />
            </div>
            <FieldInput
              label="ZIP"
              onChange={onChange('physicalZipcode')}
              variant="outlined"
              value={values.physicalZipcode || ''}
              error={errors.physicalZipcode !== false}
              tooltip={errors.physicalZipcode}
            />
          </div>
          <div className={classes.row}>
            <FieldInput
              label={`Farm Mailing Address \u2014 Street`}
              onChange={onChange('mailingStreet1')}
              value={values.mailingStreet1 || ''}
              variant="outlined"
              error={errors.mailingStreet1 !== false}
              tooltip={errors.mailingStreet1}
            />
          </div>
          <div className={classes.row}>
            <FieldInput
              label="City"
              onChange={onChange('mailingCity')}
              value={values.mailingCity || ''}
              variant="outlined"
              error={errors.mailingCity !== false}
              tooltip={errors.mailingCity}
            />
            <div className={classes.dropdown}>
              <Dropdown
                label="State"
                items={states}
                onChange={onChange('mailingState')}
                value={values.mailingState || 0}
                error={errors.mailingState !== false}
                tooltip={errors.mailingState}
              />
            </div>
            <FieldInput
              label="ZIP"
              onChange={onChange('mailingZipcode')}
              value={values.mailingZipcode || ''}
              variant="outlined"
              error={errors.mailingZipcode !== false}
              tooltip={errors.mailingZipcode}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(FarmProfileEditForm);
