import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import BackButton from '@components/BackButton';

import FarmProfileEditForm from './FarmProfileEditForm';
import FarmProfileEditDropdown from './FarmProfileEditDropdown';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    margin: 64,
    padding: 72,
    backgroundColor: 'white',
    maxWidth: 1680,
    width: '100%'
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

  render() {
    const { classes, match } = this.props;
    const { foodHubAffiliation, gapStatus } = this.state;
    const { farmId } = match.params;

    return (
      <div className={classes.root}>
        <BackButton label="Back to Farm" href={`/farm/${farmId}`} />
        <h1>Edit Information</h1>
        <FarmProfileEditForm
          values={this.state}
          handleChange={this.handleChange}
        />
        <FarmProfileEditDropdown
          foodHubAffiliation={foodHubAffiliation}
          gapStatus={gapStatus}
          handleChange={this.handleChange}
        />
      </div>
    );
  }
}

export default withStyles(styles)(FarmProfileEdit);
