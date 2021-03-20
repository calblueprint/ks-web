import React from 'react';

import { Button, Link } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

class BackButton extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { label, href } = this.props;
    return (
      <Link href={href} underline="none" color="inherit">
        <Button>
          <ArrowBackIcon />
          {label}
        </Button>
      </Link>
    );
  }
}

export default BackButton;
