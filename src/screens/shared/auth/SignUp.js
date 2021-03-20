import React from 'react';

import { TextField, FormControl, InputLabel, Select } from '@material-ui/core';
import '@styles/SignUp.css';

function SignUp() {
  const [state, setState] = React.useState({
    age: '',
    name: 'hai'
  });

  const handleChange = event => {
    const {name} = event.target;
    setState({
      ...state,
      [name]: event.target.value
    });
  };

  return (
    <div>
      <div>
        <TextField required label="First Name" variant="outlined" />
        <TextField required label="Last Name" variant="outlined" />
      </div>
      <div>
        {/* TODO add validation of email */}
        <TextField required label="Email" variant="outlined" />
      </div>
      <div>
        <FormControl variant="outlined">
          <InputLabel>Organization</InputLabel>
          <Select
            native
            label="Organization"
            value={state.organization}
            onChange={handleChange}
          >
            <option aria-label="" value="" />
            <option value="KS">KS</option>
            <option value="NSEVP">NSEVP</option>
          </Select>
        </FormControl>
        <TextField
          required
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
        />
      </div>
    </div>
  );
}

export default SignUp;
