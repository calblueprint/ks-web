import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Select, FormControl, MenuItem, ListItemIcon } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import BackButton from '@components/BackButton';
import FarmProfileEditForm from './FarmProfileEditForm';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    margin: 64,
    padding: 72,
    backgroundColor: 'white',
    maxWidth: 1680,
    width: '100%'
  },
  dropdown: {
    display: 'flex',
    alignItems: 'center',
    '& > div': {
      display: 'inline-flex'
    },
    width: '33%',
    minWidth: 400
  }
};

class FarmProfileEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      farmName: '',
      phone: '',
      streetAddress: '',
      city: '',
      state: '',
      zip: '',
      gapStatus: ''
    };
  }

  setValues = state => {
    this.setState(state);
  };

  handleChange = prop => event => {
    this.setValues({ ...this.state, [prop]: event.target.value });
  };

  handleSubmit = () => {
    console.log(this.state);
  };

  getNames = () => {
    // Placeholder, replace with Airtable Data
    return ['Francesco Sola', 'Ace Chen', 'Andi Halm', 'Alice Zhao'];
  };

  render() {
    const { classes, match } = this.props;
    const { farmId } = match.params;
    const contacts = this.getNames();

    return (
      <div className={classes.root}>
        <BackButton label="Back to Farm" href={`/farm/${farmId}`} />
        <h1>Edit Information</h1>
        <h2>Farm Information</h2>
        <FarmProfileEditForm handleChange={this.handleChange} />

        <h2>Group Gap Contact</h2>
        <FormControl variant="outlined" className={classes.dropdwn}>
          <Select
            className={classes.dropdown}
            value={this.state.gapContact}
            onChange={this.handleChange}
          >
            <MenuItem value="">None</MenuItem>
            {contacts.map((name, index) => (
              <MenuItem className={classes.dropdown} value={index}>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }
}

export default withStyles(styles)(FarmProfileEdit);
