import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Home, AccountCircle } from '@material-ui/icons';
import Dropdown from '@components/Dropdown';
import { getAllGroupGapContacts } from '@lib/farmUtils';

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
  getFoodHubs = () => {
    // TODO
    // Placeholder, replace with Airtable Data
    return ['Waialua Old Mill Food Hub', "Nick's Secret Food Hub"];
  };

  onChange = (prop, items) => event => {
    const { values, handleChange } = this.props;

    const dropdownValues = {
      ...values,
      [prop]: items[event.target.value]
    };
    handleChange(dropdownValues);
  };

  render() {
    const { classes, values } = this.props;
    const {
      foodHubAffiliation,
      gapContact,
      contactNames = [],
      contactIds = []
    } = values;
    const foodHubs = this.getFoodHubs();

    return (
      <div className={classes.root}>
        <div className={classes.column}>
          <h2 className={classes.header}>Group Gap Contact</h2>
          <Dropdown
            items={contactNames}
            icon={<AccountCircle fontSize="large" />}
            onChange={this.onChange('gapContact', contactIds)}
            value={contactIds.indexOf(gapContact)}
          />
        </div>
        <div className={classes.column}>
          <h2 className={classes.header}>Food Hub Affiliation</h2>
          <Dropdown
            items={foodHubs}
            icon={<Home fontSize="large" />}
            onChange={this.onChange('foodHubAffiliation', foodHubs)}
            value={foodHubAffiliation}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(FarmProfileEditDropdown);
