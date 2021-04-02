import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import Dropdown from '@components/Dropdown';
import TextField from '@material-ui/core/TextField';

const styles = {
  root: {
    display: 'flex',
    margin: '64px 0px',
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
    marginTop: 16
  }
};

class FarmProfileEditGapStatus extends React.PureComponent {
  getItems = () => {
    return ['Incomplete', 'Complete', 'Failed', 'Outdated'];
  };

  render() {
    const { index, label, classes, value } = this.props;
    const items = this.getItems();

    return (
      <div className={classes.root}>
        <h3 className={classes.label}>{`${index}. ${label}`}</h3>
        <div className={classes.input}>
          <Dropdown items={items} icon={null} value={value} />
          <TextField
            className={classes.picker}
            type="date"
            defaultValue="2017-05-24"
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(FarmProfileEditGapStatus);
