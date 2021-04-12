import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Select, FormControl, MenuItem, ListItemIcon } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    flex: 1
  },
  label: {
    marginBottom: '16px'
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    '& > div': {
      display: 'inline-flex'
    }
  }
});

export default function Dropdown(props) {
  const { items, icon, label, onChange, value } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {label ? <h3 className={classes.label}>{label}</h3> : null}
      <FormControl variant="outlined">
        <Select value={value} onChange={onChange}>
          {items.map((name, index) => (
            <MenuItem className={classes.menuItem} value={index} key={name}>
              <div className={classes.menuItem}>
                {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
                {name}
              </div>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
