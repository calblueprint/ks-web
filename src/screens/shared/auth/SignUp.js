import React from 'react';

import { Button } from '@material-ui/core';

import Dropdown from '@components/Dropdown';
import FieldInput from '@components/FieldInput';
import '@styles/SignUp.css';
import { validateField, updateUserFields } from '@lib/utils';

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
      errors: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.createAccount = this.createAccount.bind(this);
  }

  handleChange(name) {
    return event => {
      this.setState({
        [name]: event.target.value
      });
    };
  }

  async createAccount() {
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

    const {state} = this;
    const allErrorMessages = await Promise.all(
      fieldsToValidate.map(f => validateField(f, state[f]))
    ).catch(e => {
      console.error(e);
    });

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
      errors
    } = this.state;

    return (
      <div className="sign-up-form">
        <h1 id="sign-up-title">Create an Account</h1>
        <form className="sign-up-card">
          <h2>Contact Information</h2>
          <div className="flex column">
            <div className="row">
              <FieldInput
                error={errors.firstName}
                required
                label="First Name"
                variant="outlined"
                defaultValue={firstName}
                onChange={this.handleChange('firstName')}
              />
              <FieldInput
                error={errors.lastName}
                required
                label="Last Name"
                variant="outlined"
                placeholder={lastName}
                onChange={this.handleChange('lastName')}
              />
            </div>
            <div className="row">
              <FieldInput
                error={errors.email}
                required
                label="Email"
                variant="outlined"
                defaultValue={email}
                onChange={this.handleChange('email')}
              />
            </div>
            <div className="row">
              <Dropdown
                items={['KS', 'NSEVP']}
                label="Organization"
                onChange={this.handleChange('userTypes')}
                value={userTypes}
              />
              <FieldInput
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
          </div>
        </form>
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
