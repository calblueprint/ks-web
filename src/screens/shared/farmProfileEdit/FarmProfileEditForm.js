import React from 'react';

import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    border: '1.75px solid var(--ks-medium-dark-grey)',
    borderRadius: 10,
    padding: 48,
    margin: '24px 0px 48px 0px'
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
    margin: '24px 0px',
    width: '100%'
  },
  input: {
    margin: '0px 24px'
  }
};
class FarmProfileEditForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, handleChange } = this.props;
    const fieldProps = {
      className: classes.input,
      fullWidth: true,
      margin: 'normal',
      InputLabelProps: {
        shrink: true
      },
      variant: 'outlined'
    };
    return (
      <div className={classes.root}>
        <div className={classes.row}>
          <TextField
            {...fieldProps}
            label="First Name"
            placeholder="First Name"
            onChange={handleChange('firstName')}
          />
          <TextField
            {...fieldProps}
            label="Last Name"
            placeholder="Last Name"
            onChange={handleChange('lastName')}
          />
          <TextField
            {...fieldProps}
            label="Email"
            placeholder="Email"
            onChange={handleChange('email')}
          />
        </div>
        <div className={classes.row}>
          <TextField
            {...fieldProps}
            label="Farm Name"
            placeholder="Farm Name"
            onChange={handleChange('farmName')}
          />
          <TextField
            {...fieldProps}
            label="Cell Phone"
            placeholder="Cell Phone"
            onChange={handleChange('phone')}
          />
        </div>
        <div className={classes.row}>
          <TextField
            {...fieldProps}
            label="Farm Address - Street"
            placeholder="Address"
            onChange={handleChange('streetAddress')}
          />
        </div>
        <div className={classes.row}>
          <TextField
            {...fieldProps}
            label="City"
            placeholder="City"
            onChange={handleChange('city')}
          />
          <TextField
            {...fieldProps}
            label="State"
            placeholder="State"
            onChange={handleChange('state')}
          />
          <TextField
            {...fieldProps}
            label="ZIP"
            placeholder="ZIP"
            onChange={handleChange('zip')}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(FarmProfileEditForm);
