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
  const { options, title, value, id, onClick } = props;
  const classes = useStyles();

  return (
    <FormControl>
      {title ? <FormLabel>{title}</FormLabel> : null}
      <RadioGroup aria-label={id} name={id} value={value}>
        {options.map(option => (
          <FormControlLabel
            key={option}
            value={option}
            label={option}
            control={
              <Radio
                onClick={onClick}
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
