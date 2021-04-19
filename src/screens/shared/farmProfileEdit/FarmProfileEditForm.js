import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import FieldInput from '@components/FieldInput';
import Dropdown from '@components/Dropdown';

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

    return (
      <div className={classes.root}>
        <h2>Contact Information</h2>
        <div className={classes.form}>
          <div className={classes.row}>
            <FieldInput
              label="First Name"
              onChange={this.onChange('contactFirstName')}
              placeholder="Andi"
              variant="outlined"
            />
            <FieldInput
              label="Last Name"
              onChange={this.onChange('contactLastName')}
              placeholder="Halim"
              variant="outlined"
            />
          </div>
          <div className={classes.row}>
            <FieldInput
              label="Farm Name"
              onChange={this.onChange('farmName')}
              placeholder="Andi's Potato Farm"
              variant="outlined"
            />
          </div>
          <div className={classes.row}>
            <FieldInput
              label="Cell Phone"
              onChange={this.onChange('phone')}
              placeholder="xxx-xxx-xxx"
              variant="outlined"
            />
            <FieldInput
              label="Email"
              onChange={this.onChange('farmEmail')}
              placeholder="farmerfarmer@farmer.com"
              variant="outlined"
            />
          </div>
          <div className={classes.row}>
            <FieldInput
              label={`Farm Physical Address \u2014 Street`}
              onChange={this.onChange('physicalStreet1')}
              placeholder="xxxx Farmer Lane"
              variant="outlined"
            />
          </div>
          <div className={classes.row}>
            <FieldInput
              label="City"
              onChange={this.onChange('physicalCity')}
              placeholder="Honolulu"
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
              placeholder="95070"
              variant="outlined"
            />
          </div>
          <div className={classes.row}>
            <FieldInput
              label={`Farm Mailing Address \u2014 Street`}
              onChange={this.onChange('mailingStreet')}
              placeholder="1887 Makuakane St"
              variant="outlined"
            />
          </div>
          <div className={classes.row}>
            <FieldInput
              label="City"
              onChange={this.onChange('mailingCity')}
              placeholder="Honolulu"
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
              variant="outlined"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(FarmProfileEditForm);
