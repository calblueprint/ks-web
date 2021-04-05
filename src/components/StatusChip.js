import React from 'react';
import Chip from '@material-ui/core/Chip';
import { CheckCircle, Cancel } from '@material-ui/icons';

class StatusChip extends React.PureComponent {
  render() {
    const { type, data } = this.props;
    switch (type) {
      case 'certified':
        return (
          <Chip
            avatar={<CheckCircle />}
            label={`Gap Certified since ${data.certificationDate}`}
          />
        );
      case 'notCertified':
        return <Chip avatar={<Cancel />} label="Not GAP Certified" />;
      default:
        return null;
    }
  }
}
export default StatusChip;
