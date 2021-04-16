import React from 'react';

// import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

/** 
const useStyles = makeStyles({
  root: {
    padding: ,
    border: '1px solid #4074b0',
    borderRadius: 2.5px;
  },
});
*/

export default function EditButton(props) {
  const { label, onClick } = props;
  // const classes = useStyles();

  return (
    <Button variant="contained" onClick={onClick}>
      {label}
    </Button>
  );
}
