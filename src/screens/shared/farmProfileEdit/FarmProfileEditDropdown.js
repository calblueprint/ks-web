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

  render() {
    const { classes, foodHubAffiliation, gapStatus, handleChange } = this.props;
    const contacts = this.getNames();

    return (
      <div className={classes.row}>
        <div className={classes.rowItem}>
          <h2 className={classes.header}> Group Gap Contact</h2>
          <Dropdown
            items={contacts}
            icon={<AccountCircleIcon fontSize="large" />}
            onChange={handleChange('gapStatus')}
            value={gapStatus}
          />
        </div>
        <div className={classes.rowItem}>
          <h2 className={classes.header}>Food Hub Affiliation</h2>
          <Dropdown
            items={contacts}
            icon={<AccountCircleIcon fontSize="large" />}
            onChange={handleChange('foodHubAffiliation')}
            value={foodHubAffiliation}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(FarmProfileEditDropdown);
