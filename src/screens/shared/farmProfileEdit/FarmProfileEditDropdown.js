import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import Dropdown from '@components/Dropdown';

const styles = {
  root: {
    display: 'flex',
    width: '60%',
    marginBottom: 64
  },
  column: {
    width: '100%',
    marginRight: 48
  },
  header: {
    marginBottom: 36
  }
};
class FarmProfileEditDropdown extends React.PureComponent {
  getContacts = () => {
    // Placeholder, replace with Airtable Data
    return ['Francesco Sola', 'Ace Chen', 'Andi Halm', 'Alice Zhao'];
  };

  onChange = prop => event => {
    const { values, handleChange } = this.props;

    const dropdownValues = {
      ...values,
      [prop]: event.target.value
    };
    handleChange(dropdownValues);
  };

  render() {
    const { classes, values } = this.props;
    const { foodHubAffiliation, gapContact } = values;
    const contacts = this.getContacts();

    return (
      <div className={classes.root}>
        <div className={classes.column}>
          <h2 className={classes.header}> Group Gap Contact</h2>
          <Dropdown
            items={contacts}
            icon={<AccountCircleIcon fontSize="large" />}
            onChange={this.onChange('gapContact')}
            value={gapContact}
          />
        </div>
        <div className={classes.column}>
          <h2 className={classes.header}>Food Hub Affiliation</h2>
          <Dropdown
            items={contacts}
            icon={<AccountCircleIcon fontSize="large" />}
            onChange={this.onChange('foodHubAffiliation')}
            value={foodHubAffiliation}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(FarmProfileEditDropdown);
