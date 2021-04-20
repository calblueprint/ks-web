import React from 'react';

import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles({
  root: {
    backgroundColor: 'var(--ks-medium-dark-blue)',
    color: 'white',
    width: 96,
    padding: 8
  }
});

export default function BackButton(props) {
  const { className, onClick, children } = props;
  const classes = useStyles();

  return (
    <Button
      className={clsx(classes.root, className)}
      variant="contained"
      fontSize="large"
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
