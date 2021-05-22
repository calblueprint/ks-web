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
  getAllRecentHarvestLogsData
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
      KSGAP: [],
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
    const recentHarvests = await getAllRecentHarvestLogsData();
    const KSFarms = farms.filter(farm => farm.ksAffiliated);
    const KSGAP = [];
    for (let i = 0; i < GAPCertification.length; i += 1) {
      if ('ksAffiliated' in GAPCertification[i]) {
        if (GAPCertification[i].ksAffiliated.includes(true)) {
          KSGAP.push(GAPCertification[i]);
        }
      }
    }

    const numGAPCertified = GAPCertification.filter(farm => farm.gapCertified);

    const numKSGAPCertified = KSGAP.filter(farm => farm.gapCertified);

    const numFarmReferred = GAPCertification.filter(
      farm => farm.farmReferred === 'Complete'
    ).length;

    const numKSGAPAccepted = KSGAP.filter(
      farm => farm.farmAccepted === 'Complete'
    ).length;

    const numGAPApplied = GAPCertification.filter(
      farm => farm.farmApplied === 'Complete'
    );

    const numKSGAPApplied = KSGAP.filter(
      farm => farm.farmApplied === 'Complete'
    );

    const percentKSGAPCertified = Math.round(
      (numKSGAPCertified.length / KSFarms.length) * 100
    );
    const percentKSGAPApplied = Math.round(
      (numKSGAPApplied.length / KSFarms.length) * 100
    );

    const percentGAPCertified = Math.round(
      (numGAPCertified.length / farms.length) * 100
    );
    const percentGAPApplied = Math.round(
      (numGAPApplied.length / farms.length) * 100
    );
    const NSEVPHarvestFarms = recentHarvests.length;

    let totalHarvestsPounds = 0;
    for (let i = 0; i < totalHarvests.length; i += 1) {
      totalHarvestsPounds += totalHarvests[i].totalProductionPounds;
    }

    this.setState({
      farms,
      KSFarms,
      KSGAP,
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
          <div className={classes.card} key={stat.name}>
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
