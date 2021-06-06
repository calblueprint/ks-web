import React from 'react';
import Chip from '@material-ui/core/Chip';
import { Home } from '@material-ui/icons';

export default function FoodHubChip(props) {
  const { data } = props;
  if (!data || data === '')
    return <Chip label="none" backgroundColor="white" />;
  return (
    <Chip
      avatar={<Home color="var(--ks-dark-blue)" />}
      label={data}
      backgroundColor="white"
    />
  );
}
