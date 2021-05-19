import React from 'react';
import farmProfileCover from '@assets/farmProfileCover.png';
import farmProfilePhoto from '@assets/farmProfilePhoto.png';

import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import StatusChip from '@components/StatusChip';
import { Home, AccountCircle } from '@material-ui/icons';

import FarmComments from './FarmComments';

const styles = {
  root: {
    position: 'relative',
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  coverPhoto: {
    width: '100%',
    borderRadius: '5px 5px 0px 0px'
  },
  profilePhoto: {
    position: 'absolute',
    width: 125,
    height: 125,
    top: 100
  },
  farm: {
    marginTop: 48,
    textAlign: 'center',
    fontFamily: 'Inter'
  },
  farmInfo: {
    margin: '24px 0px'
  },
  chips: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 36,
    paddingTop: 16
  },
  inspector: {
    marginTop: 12,
    textAlign: 'center'
  },
  foodHub: {
    marginTop: 36
  }
};

class FarmContactCard extends React.PureComponent {
  render() {
    const { farm, classes } = this.props;
    const {
      address: physicalAddress,
      mailingAddress,
      contactFirstName,
      contactLastName,
      farmEmail: email,
      phone,
      foodHubAffiliation: foodHub
    } = farm;
    const { GAP } = this.props;
    const { gapCertified } = GAP;
    const { GAPContact } = this.props;
    const { name: GAPContactName } = GAPContact;
    const farmerName = `${contactFirstName} ${contactLastName}`;

    return (
      <div className={classes.root}>
        <img
          className={classes.coverPhoto}
          src={farmProfileCover}
          alt="farm profile cover"
        />
        <img
          className={classes.profilePhoto}
          src={farmProfilePhoto}
          alt="farm profile"
        />
        <div className={classes.farm}>
          <h2 className={classes.header}>{farmerName}</h2>
          <div className={classes.farmInfo}>
            <p>{`Phone: ${phone}`}</p>
            <p>{`Email: ${email}`}</p>
            <p>{`Physical Address: ${physicalAddress}`}</p>
            <p>{`Mailing Address: ${mailingAddress}`}</p>
          </div>
          <StatusChip
            type={gapCertified ? 'certified' : 'notCertified'}
            data={GAP}
          />
        </div>
        <div className={classes.chips}>
          <div className={classes.inspector}>
            <h2>Group GAP Contact</h2>
            <Chip avatar={<AccountCircle />} label={`${GAPContactName}`} />
          </div>
          <div className={classes.foodHub}>
            <h2>Food Hub</h2>
            <Chip
              avatar={<Home color="var(--ks-dark-blue)" />}
              label={`${foodHub}`}
              backgroundColor="white"
            />
          </div>
        </div>
        <FarmComments />
      </div>
    );
  }
}

export default withStyles(styles)(FarmContactCard);
