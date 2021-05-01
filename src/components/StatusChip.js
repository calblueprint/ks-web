import React from 'react';
import Chip from '@material-ui/core/Chip';
import { CheckCircle, Cancel } from '@material-ui/icons';
import { blueGrey } from '@material-ui/core/colors';

export default function StatusChip(props) {
  const { type, data } = props;
  switch (type) {
    case 'certified':
      return (
        <Chip
          avatar={<CheckCircle style={{ color: { blueGrey } }} />}
          label={`Gap Certified since ${new Date(
            data.gapCertifiedDate
          ).toLocaleDateString()}`}
        />
      );
    case 'notCertified':
      return <Chip avatar={<Cancel />} label="Not GAP Certified" />;
    default:
      return null;
  }
}
