import React from 'react';

import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    margin: '0px 24px',
    flex: 4
  },
  label: {
    margin: '0px'
  }
});

export default function FieldInput(props) {
  const { label, onChange, placeholder } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h3 className={classes.label}>{label}</h3>
      <TextField
        fullWidth
        margin="normal"
        variant="outlined"
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}
