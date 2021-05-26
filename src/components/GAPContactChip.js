import React from 'react';
import Chip from '@material-ui/core/Chip';
import { AccountCircle } from '@material-ui/icons';

export default function GAPContactChip(props) {
  const { data } = props;
  if (!data || data === '')
    return <Chip label="none" backgroundColor="white" />;
  return <Chip avatar={<AccountCircle />} label={`${data}`} />;
}
