import React from 'react';
import { TextField, Tooltip } from '@material-ui/core';
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
  const { label, onChange, placeholder, variant, tooltip, ...rest } = props;
  const classes = useStyles();

  const innerHTML = (
    <div className={classes.root}>
      {label ? <h3 className={classes.label}>{label}</h3> : null}

      <TextField
        fullWidth
        margin="normal"
        variant={variant || 'standard'}
        onChange={onChange}
        {...rest}
      />
    </div>
  );

  return tooltip ? <Tooltip title={tooltip}>{innerHTML}</Tooltip> : innerHTML;
}
