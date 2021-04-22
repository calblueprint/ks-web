import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {
  FormLabel,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup
} from '@material-ui/core';

const useStyles = makeStyles({
  radio: {
    '&$checked': {
      color: 'var(--ks-dark-blue)'
    }
  },
  checked: {}
});

export default function RadioOptions(props) {
  const { options, title, value, id, onChange } = props;
  const classes = useStyles();

  return (
    <FormControl>
      {title ? <FormLabel>{title}</FormLabel> : null}
      <RadioGroup aria-label={id} name={id} value={value} onChange={onChange}>
        {options.map(option => (
          <FormControlLabel
            value={option}
            label={option}
            control={
              <Radio
                classes={{
                  root: classes.radio,
                  checked: classes.checked
                }}
              />
            }
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
