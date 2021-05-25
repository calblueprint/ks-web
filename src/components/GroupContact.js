import React from 'react';
import Chip from '@material-ui/core/Chip';
import { AccountCircle } from '@material-ui/icons';

export default function GroupContact(props) {
  const { type, data } = props;
  switch (type) {
    case '':
      return <Chip label="none" backgroundColor="white" />;
    case undefined:
      return <Chip label="none" backgroundColor="white" />;
    default:
      return <Chip avatar={<AccountCircle />} label={`${data}`} />;
  }
}
