import React from 'react';

import {
  Chat,
  WbSunny,
  Check,
  Assignment,
  LocalShipping
} from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

import { getAllFarmsForFarmSearch } from '@lib/farmUtils';
import {
  getAllGAPCertificationsForStatCard,
  getAllTotalHarvestsForStatCard,
  getAllRecentHarvestLogsForStatCard
} from '@lib/dashUtils';

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
    justifyContent: 'center',
    margin: 16,
    minWidth: 180,
    padding: 16,
    textAlign: 'center'
  }
};
class StatCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      farms: [],
      KSFarms: [],
      totalHarvests: [],
      recentHarvests: [],
      GAPCertification: [],
      numFarmReferred: '',
      numKSGAPAccepted: '',
      percentKSGAPCertified: '',
      percentKSGAPApplied: '',
      percentGAPCertified: '',
      NSEVPHarvestFarms: '',
      totalHarvestsPounds: '',
      percentGAPApplied: ''
    };
  }

  async componentDidMount() {
    const farms = await getAllFarmsForFarmSearch();
    const GAPCertification = await getAllGAPCertificationsForStatCard();
    const totalHarvests = await getAllTotalHarvestsForStatCard();
    const recentHarvests = await getAllRecentHarvestLogsForStatCard();
    const KSFarms = farms.filter(farm => farm.KSAffiliated);

    const numGAPCertified = GAPCertification.filter(farm => farm.GAPCertified); // in gap certification there is no ks affiliated column

    const numFarmReferred = GAPCertification.filter(
      farm => farm.farmReferred === 'Complete'
    ).length;

    const numKSGAPAccepted = GAPCertification.filter(
      farm => farm.gapAccepted === 'Complete'
    ).length;

    const numGAPApplied = GAPCertification.filter(
      farm => farm.farmApplied === 'Complete'
    );

    const percentKSGAPCertified = Math.round(
      (numGAPCertified.length / KSFarms.length) * 100
    );
    const percentKSGAPApplied = Math.round(
      (numGAPApplied.length / KSFarms.length) * 100
    );

    const percentGAPCertified = Math.round(
      (numGAPCertified.length / farms.length) * 100
    );
    const percentGAPApplied = Math.round(
      (numGAPApplied.length / farms.length) * 100
    );
    const NSEVPHarvestFarms = recentHarvests.length;

    let total = 0;
    for (let i = 0; i < totalHarvests.length; i += 1) {
      total += totalHarvests[i].totalProductionPounds;
    }
    const totalHarvestsPounds = total;

    this.setState({
      farms,
      KSFarms,
      totalHarvests,
      recentHarvests,
      GAPCertification,
      numFarmReferred,
      numKSGAPAccepted,
      percentKSGAPCertified,
      percentKSGAPApplied,
      percentGAPCertified,
      NSEVPHarvestFarms,
      totalHarvestsPounds,
      percentGAPApplied
    });
  }

  getCardStats = isNSEVP => {
    const {
      numFarmReferred,
      numKSGAPAccepted,
      percentKSGAPCertified,
      percentKSGAPApplied,
      percentGAPCertified,
      NSEVPHarvestFarms,
      totalHarvestsPounds,
      percentGAPApplied
    } = this.state;
    const iconProps = {
      fontSize: 'large',
      style: { color: 'var(--ks-dark-blue)' }
    };

    if (isNSEVP) {
      return [
        {
          icon: <Check {...iconProps} />,
          name: 'GAP Certification',
          number: percentGAPCertified,
          unit: ' %',
          description: 'of farms in the Group GAP program are GAP Certified'
        },
        {
          icon: <WbSunny {...iconProps} />,
          name: 'Harvesting Farms',
          number: NSEVPHarvestFarms,
          unit: ' farms',
          description: 'are harvesting this week'
        },
        {
          icon: <LocalShipping {...iconProps} />,
          name: 'Total Harvest',
          number: totalHarvestsPounds,
          unit: ' lbs',
          description: 'of harvest to date'
        },
        {
          icon: <Assignment {...iconProps} />,
          name: 'Group GAP Applications',
          number: percentGAPApplied,
          unit: '%',
          description: 'of referred farms have completed an application'
        }
      ];
    }
    return [
      {
        icon: <Chat {...iconProps} />,
        name: 'Referrals',
        number: numFarmReferred,
        unit: ' farms',
        description: 'referred to Group GAP'
      },
      {
        icon: <WbSunny {...iconProps} />,
        name: 'Group GAP Acceptances',
        number: numKSGAPAccepted,
        unit: ' farms',
        description: 'are currently in a Group GAP cohort'
      },
      {
        icon: <Check {...iconProps} />,
        name: 'GAP Certification',
        number: percentKSGAPCertified,
        unit: '%',
        description: 'of KS farms are GAP certified'
      },
      {
        icon: <Assignment {...iconProps} />,
        name: 'Group GAP Applications',
        number: percentKSGAPApplied,
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
