import React from 'react';

import { Chat, WbSunny, Check, Assignment } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

import { getAllFarmsForFarmSearch } from '@lib/farmUtils';
import { getAllGAPCertificationsForStatCard } from '@lib/dashUtils';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    margin: '0 -16px'
  },
  card: {
    alignItems: 'center',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 0',
    margin: 16,
    minWidth: 200,
    padding: 24,
    textAlign: 'center'
  }
};
class StatCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      farms: [],
      ksFarms: [],
      gapCertification: [],
      percentGapCertified: '',
      numFarmReferred: '',
      numGapAccepted: '',
      percentGapApplied: ''
    };
  }

  async componentDidMount() {
    const farms = await getAllFarmsForFarmSearch();
    const gapCertification = await getAllGAPCertificationsForStatCard();

    const ksFarms = farms.filter(farm => farm.ksAffiliated);
    const numGapCertified = gapCertification.filter(farm => farm.gapCertified);
    const percentGapCertified = (numGapCertified.length / ksFarms.length) * 100;

    const numFarmReferred = gapCertification.filter(
      farm => farm.farmReferred === 'Complete'
    ).length;

    const numGapAccepted = gapCertification.filter(
      farm => farm.gapAccepted === 'Complete'
    );
    const percentGapAccepted = (numGapAccepted.length / ksFarms.length) * 100;

    const numGapApplied = gapCertification.filter(
      farm => farm.farmApplied === 'Complete'
    );

    const percentGapApplied = (numGapApplied.length / ksFarms.length) * 100;

    this.setState({
      farms,
      ksFarms,
      gapCertification,
      percentGapCertified,
      numFarmReferred,
      percentGapAccepted,
      percentGapApplied
    });
  }

  getCardStats = isNSEVP => {
    const {
      percentGapCertified,
      numFarmReferred,
      percentGapAccepted,
      percentGapApplied
    } = this.state;
    const iconProps = {
      fontSize: 'large',
      style: { color: 'var(--ks-dark-blue)' }
    };

    return [
      {
        icon: <Chat {...iconProps} />,
        name: 'Referrals',
        number: numFarmReferred,
        unit: ' farms',
        description: 'referred to Group GAP'
      },
      {
        icon: <Check {...iconProps} />,
        name: 'Group GAP Acceptances',
        number: percentGapAccepted,
        unit: '%',
        description: 'are currently in a Group GAP cohort'
      },
      {
        icon: <WbSunny {...iconProps} />,
        name: 'GAP Certification',
        number: percentGapCertified,
        unit: '%',
        description: 'of KS farms are GAP certified'
      },
      {
        icon: <Assignment {...iconProps} />,
        name: 'Group GAP Applications',
        number: percentGapApplied,
        unit: '%',
        description: 'of referred farms have completed an application'
      }
    ];
  };

  render() {
    const { classes, isNSEVP } = this.props;
    const stats = this.getCardStats(isNSEVP);

    return (
      <div className={classes.root}>
        {stats.map(stat => (
          <div className={classes.card}>
            {stat.icon}
            <h3>{stat.name}</h3>
            <h2>{`${stat.number} ${stat.unit}`}</h2>
            <p>{stat.description}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default withStyles(styles)(StatCards);
