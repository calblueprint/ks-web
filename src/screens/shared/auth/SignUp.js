import React from 'react';

import { Button } from '@material-ui/core';

import Dropdown from '@components/Dropdown';
import FieldInput from '@components/FieldInput';
import '@styles/SignUp.css';
import { validateField, updateUserFields } from '@lib/validationUtils';

class SignUp extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      userTypesIndex: 0,
      userTypes: '',
      errors: {
        firstName: false,
        lastName: false,
        email: false,
        password: false,
        userTypes: false
      }
    };
  }

  handleChange = name => {
    return event => {
      this.setState({
        [name]: event.target.value
      });
    };
  };

  handleDropdownChange = options => {
    return event => {
      this.setState({
        userTypesIndex: event.target.value,
        userTypes: options[event.target.value]
      });
    };
  };

  createAccount = async () => {
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

    const { state } = this;
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
    this.setState({ errors: newErrors });
    // create account
    if (!foundErrors) {
      this.setState({ errors: {} });
      updateUserFields(this.state, fieldsToValidate);
    }
  };

  render() {
    const {
      firstName,
      lastName,
      email,
      userTypesIndex,
      password,
      errors
    } = this.state;

    return (
      <div className="sign-up-form flex column">
        <h1 id="sign-up-title">Create an Account</h1>
        <form className="sign-up-card">
          <h2>Contact Information</h2>
          <div className="flex column">
            <div className="flex row">
              <FieldInput
                label="First Name"
                variant="outlined"
                value={firstName || ''}
                onChange={this.handleChange('firstName')}
                error={errors.firstName !== false}
                tooltip={errors.firstName}
              />
              <FieldInput
                label="Last Name"
                variant="outlined"
                value={lastName || ''}
                onChange={this.handleChange('lastName')}
                error={errors.lastName !== false}
                tooltip={errors.lastName}
              />
            </div>
            <div className="flex row">
              <FieldInput
                label="Email"
                variant="outlined"
                value={email || ''}
                onChange={this.handleChange('email')}
                error={errors.email !== false}
                tooltip={errors.email}
              />
            </div>
            <div className="flex row sign-up-dropdown">
              <Dropdown
                items={['', 'KS', 'NSEVP']}
                label="Organization"
                onChange={this.handleDropdownChange(['', 'KS', 'NSEVP'])}
                value={userTypesIndex || 0}
                error={errors.userTypes !== false}
              />
              <FieldInput
                label="Password"
                type="password"
                variant="outlined"
                value={password || ''}
                onChange={this.handleChange('password')}
                error={errors.password !== false}
                tooltip={errors.password}
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
            color="inherit"
            style={{
              backgroundColor: 'var(--ks-medium-dark-blue)',
              color: 'white'
            }}
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
