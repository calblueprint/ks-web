import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import BackButton from '@components/BackButton';
import Dropdown from '@components/Dropdown';
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

class FarmProfileEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      farmName: '',
      cellPhonehone: '',
      physicalStreet: '',
      physicalCity: '',
      physicalState: 0,
      physicalZip: '',
      mailStreet: '',
      mailCity: '',
      mailState: 0,
      mailZip: '',
      gapStatus: 0,
      foodHubAffiliation: 0
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
    const { foodHubAffiliation, gapStatus } = this.state;
    const { farmId } = match.params;
    const contacts = this.getNames();

    return (
      <div className={classes.root}>
        <BackButton label="Back to Farm" href={`/farm/${farmId}`} />
        <h1>Edit Information</h1>
        <h2>Contact Information</h2>
        <FarmProfileEditForm
          values={this.state}
          handleChange={this.handleChange}
        />

        <div className={classes.row}>
          <div className={classes.rowItem}>
            <h2 className={classes.header}> Group Gap Contact</h2>
            <Dropdown
              items={contacts}
              icon={<AccountCircleIcon fontSize="large" />}
              onChange={this.handleChange('gapStatus')}
              value={gapStatus}
            />
          </div>
          <div className={classes.rowItem}>
            <h2 className={classes.header}>Food Hub Affiliation</h2>
            <Dropdown
              items={contacts}
              icon={<AccountCircleIcon fontSize="large" />}
              onChange={this.handleChange('foodHubAffiliation')}
              value={foodHubAffiliation}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(FarmProfileEdit);
