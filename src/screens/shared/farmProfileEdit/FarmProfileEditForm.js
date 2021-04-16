import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import FieldInput from '@components/FieldInput';
import Dropdown from '@components/Dropdown';

import { getSingleFarm } from '@lib/farmUtils';
import {
  validatePhoneNumber,
  validateEmail,
  validateCertifyPermanentAddress,
  validateZipcode
} from '@lib/utils';

const styles = {
  form: {
    padding: '0px 48px',
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
    margin: '-16px 12px 0px 12px'
  }
};
class FarmProfileEditForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      farm: {},
      farmId: ''
    };
  }

  async componentDidMount() {
    const { farmId } = this.props;
    const farm = await getSingleFarm(farmId);
    this.setState({ farm, farmId });
  }

  onChange = prop => event => {
    const { values, handleChange } = this.props;

    const formValues = {
      ...values,
      [prop]: event.target.value
    };
    handleChange(formValues);
  };

  render() {
    const { values, classes } = this.props;
    const { farm, farmId } = this.state;
    console.log(farmId);

    return (
      <div className={classes.root}>
        <h2>Contact Information</h2>
        <div className={classes.form}>
          <div className={classes.row}>
            <FieldInput
              label="First Name"
              onChange={this.onChange('contactFirstName')}
              placeholder={farm.contactFirstName}
              variant="outlined"
            />
            <FieldInput
              label="Last Name"
              onChange={this.onChange('contactLastName')}
              placeholder={farm.contactLastName}
              variant="outlined"
            />
          </div>
          <div className={classes.row}>
            <FieldInput
              label="Farm Name"
              onChange={this.onChange('farmName')}
              placeholder={farm.farmName}
              variant="outlined"
            />
          </div>
          <div className={classes.row}>
            <FieldInput
              label="Cell Phone"
              onChange={this.onChange('phone')}
              placeholder={farm.phone}
              variant="outlined"
              error={validatePhoneNumber(farm.phone)}
            />
            <FieldInput
              label="Email"
              onChange={this.onChange('farmEmail')}
              placeholder={farm.farmEmail}
              variant="outlined"
              error={validateEmail(farm.farmEmail)}
            />
          </div>
          <div className={classes.row}>
            <FieldInput
              label={`Farm Physical Address \u2014 Street`}
              onChange={this.onChange('physicalStreet1')}
              placeholder={farm.physicalStreet1}
              variant="outlined"
              error={validateCertifyPermanentAddress(farm.physicalStreet1)}
            />
          </div>
          <div className={classes.row}>
            <FieldInput
              label="City"
              onChange={this.onChange('physicalCity')}
              placeholder={farm.physicalCity}
              variant="outlined"
            />
            <div className={classes.dropdown}>
              <Dropdown
                label="State"
                items={['HI', 'CA']}
                onChange={this.onChange('physicalState')}
                value={values.physicalState}
              />
            </div>
            <FieldInput
              label="ZIP"
              onChange={this.onChange('physicalZipcode')}
              placeholder={farm.physicalZipcode}
              variant="outlined"
              error={validateZipcode(farm.physicalZipcode)}
            />
          </div>
          <div className={classes.row}>
            <FieldInput
              label={`Farm Mailing Address \u2014 Street`}
              onChange={this.onChange('mailingStreet1')}
              placeholder={farm.mailingStreet1}
              variant="outlined"
              error={validateCertifyPermanentAddress(farm.mailingStreet1)}
            />
          </div>
          <div className={classes.row}>
            <FieldInput
              label="City"
              onChange={this.onChange('mailingCity')}
              placeholder={farm.mailingCity}
              variant="outlined"
            />
            <div className={classes.dropdown}>
              <Dropdown
                label="State"
                items={['HI', 'CA']}
                onChange={this.onChange('mailingState')}
                value={values.mailState}
              />
            </div>
            <FieldInput
              label="ZIP"
              onChange={this.onChange('mailingZipcode')}
              placeholder={farm.mailingZipcode}
              variant="outlined"
              error={validateZipcode(farm.mailingZipcode)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(FarmProfileEditForm);
