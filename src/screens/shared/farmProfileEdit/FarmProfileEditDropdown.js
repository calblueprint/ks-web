import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Home, AccountCircle } from '@material-ui/icons';
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

  getFoodHubs = () => {
    // Placeholder, replace with Airtable Data
    return ['Waialua Old Mill Food Hub', "Nick's Secret Food Hub"];
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
    const foodHubs = this.getFoodHubs();

    return (
      <div className={classes.root}>
        <div className={classes.column}>
          <h2 className={classes.header}>Group Gap Contact</h2>
          <Dropdown
            items={contacts}
            icon={<AccountCircle fontSize="large" />}
            onChange={this.onChange('gapContact')}
            value={gapContact}
          />
        </div>
        <div className={classes.column}>
          <h2 className={classes.header}>Food Hub Affiliation</h2>
          <Dropdown
            items={foodHubs}
            icon={<Home fontSize="large" />}
            onChange={this.onChange('foodHubAffiliation')}
            value={foodHubAffiliation}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(FarmProfileEditDropdown);
