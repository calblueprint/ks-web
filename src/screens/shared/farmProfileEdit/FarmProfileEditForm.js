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
    margin: '48px 0px 48px 0px'
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    margin: '16px -12px',
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
    /** */
    this.state = {
      farm: {},
      farmId: ''
    };
  }

  /** 
  async componentDidMount() {
    const { farmId } = this.props;
    const farm = await getSingleFarm(farmId);
    this.setState({ farm, farmId });
  }
  */

  async componentDidMount() {
    const { farmId } = this.props;
    const formValues = await getSingleFarm(farmId);
    this.props.handleChange(formValues); // will have all keys attached to it.
    // this.props.formValues.name
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
    console.log(values);

    return (
      <div className={classes.root}>
        <h2>Contact Information</h2>
        <div className={classes.form}>
          <div className={classes.row}>
            <FieldInput
              label="First Name"
              onChange={this.onChange('contactFirstName')}
              value={values.contactFirstName}
              variant="outlined"
            />
            <FieldInput
              label="Last Name"
              onChange={this.onChange('contactLastName')}
              value={values.contactLastName}
              variant="outlined"
            />
          </div>
          <div className={classes.row}>
            <FieldInput
              label="Farm Name"
              onChange={this.onChange('farmName')}
              value={values.farmName}
              variant="outlined"
            />
          </div>
          <div className={classes.row}>
            <FieldInput
              label="Cell Phone"
              onChange={this.onChange('phone')}
              value={values.phone}
              variant="outlined"
              error={validatePhoneNumber(values.phone)}
            />
            <FieldInput
              label="Email"
              onChange={this.onChange('farmEmail')}
              value={values.farmEmail}
              variant="outlined"
              error={validateEmail(values.farmEmail)}
            />
          </div>
          <div className={classes.row}>
            <FieldInput
              label={`Farm Physical Address \u2014 Street`}
              onChange={this.onChange('physicalStreet1')}
              value={values.physicalStreet1}
              variant="outlined"
              error={validateCertifyPermanentAddress(values.physicalStreet1)}
            />
          </div>
          <div className={classes.row}>
            <FieldInput
              label="City"
              onChange={this.onChange('physicalCity')}
              value={values.physicalCity}
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
              value={values.physicalZipcode}
              variant="outlined"
              error={validateZipcode(values.physicalZipcode)}
            />
          </div>
          <div className={classes.row}>
            <FieldInput
              label={`Farm Mailing Address \u2014 Street`}
              onChange={this.onChange('mailingStreet1')}
              value={values.mailingStreet1}
              variant="outlined"
              error={validateCertifyPermanentAddress(values.mailingStreet1)}
            />
          </div>
          <div className={classes.row}>
            <FieldInput
              label="City"
              onChange={this.onChange('mailingCity')}
              value={values.mailingCity}
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
              value={values.mailingZipcode}
              variant="outlined"
              error={validateZipcode(values.mailingZipcode)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(FarmProfileEditForm);
