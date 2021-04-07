import React from 'react';

import { Button, Link } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export default function BackButton(props) {
  const { label, href } = props;
  return (
    <Link href={href} underline="none" color="inherit">
      <Button>
        <ArrowBackIcon />
        {label}
      </Button>
    </Link>
  );
}
