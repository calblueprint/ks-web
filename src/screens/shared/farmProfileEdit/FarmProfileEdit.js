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
      formValues: {
        physicalState: 0,
        mailState: 0
      },
      dropdownValues: {
        gapContact: 0,
        foodHubAffiliation: 0
      }
    };
  }

  handleChange = prop => value => {
    this.setState({ ...this.state, [prop]: value });
  };

  handleSubmit = () => {
    console.log(this.state);
  };

  render() {
    const { classes, match } = this.props;
    const { farmId } = match.params;
    const { formValues, dropdownValues } = this.state;

    return (
      <div className={classes.root}>
        <BackButton label="Back to Farm" href={`/farm/${farmId}`} />
        <h1>Edit Information</h1>
        <FarmProfileEditForm
          values={formValues}
          handleChange={this.handleChange('formValues')}
        />
        <FarmProfileEditDropdown
          values={dropdownValues}
          handleChange={this.handleChange('dropdownValues')}
        />
      </div>
    );
  }
}

export default withStyles(styles)(FarmProfileEdit);
