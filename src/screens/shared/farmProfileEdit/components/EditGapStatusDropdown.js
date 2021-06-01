import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import Dropdown from '@components/Dropdown';
import TextField from '@material-ui/core/TextField';
import { getPossibleCertificationStates } from '@lib/utils';

const styles = {
  root: {
    display: 'flex',
    margin: '32px 0px',
    justifyContent: 'space-around',
    width: '100%'
  },
  label: {
    width: 144
  },
  input: {
    width: '40%',
    minWidth: 200
  },
  picker: {
    marginTop: 16,
    marginLeft: 12
  }
};

class EditGapStatusDropdown extends React.PureComponent {
  render() {
    const {
      index,
      label,
      onChange,
      classes,
      value,
      onDateChange,
      date
    } = this.props;

    const formattedDate = date
      ? new Date(date).toLocaleDateString('en-CA')
      : ' ';
    const items = getPossibleCertificationStates();
    return (
      <div className={classes.root}>
        <h3 className={classes.label}>{`${index}. ${label}`}</h3>
        <div className={classes.input}>
          <Dropdown
            items={items}
            icon={null}
            value={items.indexOf(value)}
            onChange={onChange}
          />
          <TextField
            className={classes.picker}
            type="date"
            value={formattedDate}
            onChange={onDateChange}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(EditGapStatusDropdown);
