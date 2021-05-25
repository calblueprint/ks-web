import React from 'react';
import Chip from '@material-ui/core/Chip';
import { Home } from '@material-ui/icons';

export default function FoodHub(props) {
    const { type, data } = props;
    switch (type) {
      case "":
        return (
            <Chip
            label={'none'}
            backgroundColor="white"
          />
        );
      case undefined:
        return (<Chip
        label={'none'}
        backgroundColor="white"
      />);
      default:
        return (
          <Chip
          avatar={<Home color="var(--ks-dark-blue)" />}
          label={`${data}`}
          backgroundColor="white"
        />
      );
    }
  }