import React from 'react';

import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  Button,
  Checkbox
} from '@material-ui/core';

import '@styles/SignUp.css';
import { validateField, updateUserFields } from '@lib/utils';
import { getAllFarmsForFarmSearch } from '@lib/farmUtils';

class SignUp extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      userTypes: '',
      groupGapContact: false,
      farms: [],
      errors: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.createAccount = this.createAccount.bind(this);
  }

  async componentDidMount() {
    const farms = await getAllFarmsForFarmSearch();
    this.setState({ farms });
  }

  handleChange(name) {
    return event => {
      this.setState({
        [name]: event.target.value
      });
    };
  }

  async createAccount() {
    // TODO not working
    // check all fields are correct
    // Keep track of whether we've found any errors
    let foundErrors = false;

    // For each field in this onboarding step, validate, and add to errors object
    const fieldsToValidate = [
      'firstName',
      'lastName',
      'email',
      'userTypes',
      'password'
    ];

    // TODO validate
    const allErrorMessages = await Promise.all(
      fieldsToValidate.map(f => validateField(f, this.state[f]))
    );

    const newErrors = {};
    fieldsToValidate.forEach((field, i) => {
      const errorMessage = allErrorMessages[i];
      if (errorMessage !== '') {
        newErrors[field] = errorMessage;
        foundErrors = true;
      } else {
        newErrors[field] = false;
      }
    });
    console.log(newErrors);
    this.setState({ errors: newErrors });
    // create account
    if (!foundErrors) {
      // quick fix for multi-select
      this.setState(prevState => ({ userTypes: [prevState.userTypes] }));
      this.setState({ errors: {} });
      updateUserFields(this.state, fieldsToValidate);
    }
  }

  render() {
    const {
      firstName,
      lastName,
      email,
      userTypes,
      password,
      farms,
      errors
    } = this.state;

    return (
      <div className="sign-up-form">
        <h1 id="sign-up-title">Create an Account</h1>
        <form className="sign-up-card">
          <h2>Contact Information</h2>
          <div>
            <TextField
              error={errors.firstName}
              required
              label="First Name"
              variant="outlined"
              defaultValue={firstName}
              onChange={this.handleChange('firstName')}
            />
            <TextField
              error={errors.lastName}
              required
              label="Last Name"
              variant="outlined"
              defaultValue={lastName}
              onChange={this.handleChange('lastName')}
            />
          </div>
          <div>
            {/* TODO add validation of email */}
            <TextField
              error={errors.email}
              required
              label="Email"
              variant="outlined"
              defaultValue={email}
              onChange={this.handleChange('email')}
            />
          </div>
          <div>
            <FormControl variant="outlined">
              <InputLabel>Organization</InputLabel>
              <Select
                native
                error={errors.userTypes}
                label="Organization"
                defaultValue={userTypes}
                onChange={this.handleChange('userTypes')}
              >
                <option aria-label="" value="" />
                <option aria-label="KS" value="KS">
                  KS
                </option>
                <option aria-label="NSEVP" value="NSEVP">
                  NSEVP
                </option>
              </Select>
            </FormControl>
            <TextField
              error={errors.password}
              required
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              defaultValue={password}
              onChange={this.handleChange('password')}
            />
          </div>
        </form>
        <br />
        <br />
        <div className="sign-up-card">
          <h2>Additional Information</h2>
          Are you a Group GAP contact?
          <Checkbox onChange={this.handleChange('groupGapContact')} />
          <br />
          Which farm are you a Group GAP Contact for?
          <Select
            native
            error={errors.farm}
            label="Farm"
            defaultValue={userTypes}
            onChange={this.handleChange('farm_contact')}
          >
            <option aria-label="" value="" />
            {farms.map(f => (
              <option value={f.name} />
            ))}
          </Select>
        </div>
        <br />
        <br />
        <div className="submit-button">
          <Button
            onClick={this.createAccount}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </div>
        <br />
      </div>
    );
  }
}

export default SignUp;
