import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import FieldInput from '@components/FieldInput';
import Dropdown from '@components/Dropdown';

const styles = {
  root: {
    padding: '0px 24px',
    margin: '24px 0px 48px 0px'
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
    marginTop: -16
  }
};
class FarmProfileEditForm extends React.PureComponent {
  render() {
    const { values, classes, handleChange } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.row}>
          <FieldInput
            label="First Name"
            onChange={handleChange('firstName')}
            placeholder="Andi"
          />
          <FieldInput
            label="Last Name"
            onChange={handleChange('lastName')}
            placeholder="Halim"
          />
        </div>
        <div className={classes.row}>
          <FieldInput
            label="Farm Name"
            onChange={handleChange('farmName')}
            placeholder="Andi's Potato Farm"
          />
        </div>
        <div className={classes.row}>
          <FieldInput
            label="Cell Phone"
            onChange={handleChange('cellPhone')}
            placeholder="xxx-xxx-xxx"
          />
          <FieldInput
            label="Email"
            onChange={handleChange('email')}
            placeholder="farmerfarmer@farmer.com"
          />
        </div>
        <div className={classes.row}>
          <FieldInput
            label={`Farm Physical Address \u2014 Street`}
            onChange={handleChange('physicalStreet')}
            placeholder="xxxx Farmer Lane"
          />
        </div>
        <div className={classes.row}>
          <FieldInput
            label="City"
            onChange={handleChange('physicalCity')}
            placeholder="Honolulu"
          />
          <div className={classes.dropdown}>
            <Dropdown
              label="State"
              items={['HI', 'CA']}
              onChange={handleChange('physicalState')}
              value={values.physicalState}
            />
          </div>
          <FieldInput
            label="ZIP"
            onChange={handleChange('physicalZip')}
            placeholder="95070"
          />
        </div>
        <div className={classes.row}>
          <FieldInput
            label={`Farm Mailing Address \u2014 Street`}
            onChange={handleChange('mailStreet')}
            placeholder="1887 Makuakane St"
          />
        </div>
        <div className={classes.row}>
          <FieldInput
            label="City"
            onChange={handleChange('mailCity')}
            placeholder="Honolulu"
          />
          <div className={classes.dropdown}>
            <Dropdown
              label="State"
              items={['HI', 'CA']}
              onChange={handleChange('mailState')}
              value={values.mailState}
            />
          </div>
          <FieldInput
            label="ZIP"
            onChange={handleChange('mailZip')}
            placeholder="95070"
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(FarmProfileEditForm);
