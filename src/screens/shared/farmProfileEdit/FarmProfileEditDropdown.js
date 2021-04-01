import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import Dropdown from '@components/Dropdown';

const styles = {
  row: {
    display: 'flex',
    width: '60%'
  },
  rowItem: {
    width: '100%',
    marginRight: 48
  },
  header: {
    marginBottom: 36
  }
};
class FarmProfileEditDropdown extends React.PureComponent {
  getNames = () => {
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
    const contacts = this.getNames();

    return (
      <div className={classes.row}>
        <div className={classes.rowItem}>
          <h2 className={classes.header}> Group Gap Contact</h2>
          <Dropdown
            items={contacts}
            icon={<AccountCircleIcon fontSize="large" />}
            onChange={this.onChange('gapContact')}
            value={gapContact}
          />
        </div>
        <div className={classes.rowItem}>
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
