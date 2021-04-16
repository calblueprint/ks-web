import React from 'react';

import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    margin: '0px 12px',
    flex: 4
  },
  label: {
    margin: '0px'
  }
});

export default function FieldInput(props) {
  const { label, onChange, placeholder, variant, error = null } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {label ? <h3 className={classes.label}>{label}</h3> : null}

      <TextField
        fullWidth
        margin="normal"
        variant={variant || 'standard'}
        placeholder={placeholder}
        onChange={onChange}
        {...(error && { error: true, helperText: error })}
        helperText={error}
      />
      {/** 
      validateFunc(placeholder) !== '' 
        ? validateFunc(placeholder)
        : null
      */}
    </div>
  );
}
