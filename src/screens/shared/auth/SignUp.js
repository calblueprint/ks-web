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
      organization: '',
      groupGapContact: false,
      errors: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.createAccount = this.createAccount.bind(this);
  }

  handleChange(name) {
    return event => {
      this.setState({
        ...this.state,
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
      'organization',
      'password'
    ];

    // const allErrorMessages = await Promise.all(
    //   fieldsToValidate.map(f => validateField(f, this.state[f]))
    // );

    // console.log(allErrorMessages)

    // const newErrors = {};
    // allErrorMessages.forEach((errorMessage, i) => {
    //   const field = fieldsToValidate[i];
    //   if (errorMessage !== '') {
    //     newErrors[field] = errorMessage;
    //     foundErrors = true;
    //   } else {
    //     newErrors[field] = false;
    //   }
    // });

    // this.setState({ errors: newErrors });
    // create account
    if (!foundErrors) {
      this.setState({ errors: {} });
      updateUserFields(this.state, fieldsToValidate);
    }
  }

  render() {
    return (
      <div>
        <h1>Create an Account</h1>
        <h2>Contact Information</h2>
        <form>
          <div>
            <TextField
              error={this.state.errors['firstName']}
              required
              label="First Name"
              variant="outlined"
              defaultValue={this.state.firstName}
              onChange={this.handleChange('firstName')}
            />
            <TextField
              error={this.state.errors['lastName']}
              required
              label="Last Name"
              variant="outlined"
              defaultValue={this.state.lastName}
              onChange={this.handleChange('lastName')}
            />
          </div>
          <div>
            {/* TODO add validation of email */}
            <TextField
              error={this.state.errors['email']}
              required
              label="Email"
              variant="outlined"
              defaultValue={this.state.email}
              onChange={this.handleChange('email')}
            />
          </div>
          <div>
            <FormControl variant="outlined">
              <InputLabel>Organization</InputLabel>
              <Select
                native
                error={this.state.errors['organization']}
                label="Organization"
                defaultValue={this.state.organization}
                onChange={this.handleChange('organization')}
              >
                <option aria-label="" value="" />
                <option value="KS">KS</option>
                <option value="NSEVP">NSEVP</option>
              </Select>
            </FormControl>
            <TextField
              error={this.state.errors['password']}
              required
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              defaultValue={this.state.password}
              onChange={this.handleChange('password')}
            />
          </div>
        </form>
        <div>
          <h2>Additional Information</h2>
          Are you a Group GAP contact?
          <Checkbox onChange={this.handleChange('groupGapContact')}></Checkbox>
          <br></br>
          Which farm are you a Group GAP Contact for?
          {/* <Select
            native
            error={this.state.errors['farm']}
            label="Farm"
            defaultValue={this.state.organization}
            onChange={this.handleChange("farm_contact")}
          >
            <option aria-label="" value="" />
            {this.state.farms.map(f => (
              <option value={f.name} />
            ))}
          </Select> */}
        </div>

        <Button
          onClick={this.createAccount}
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </div>
    );
  }
}

export default SignUp;
