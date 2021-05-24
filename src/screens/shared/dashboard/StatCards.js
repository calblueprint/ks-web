import React from 'react';

import {
  Chat,
  WbSunny,
  Check,
  Assignment,
  LocalShipping
} from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

import {
  getAllFarms,
  getAllGAPCertifications,
  getAllTotalHarvests,
  getAllRecentHarvestLogs
} from '@lib/airtable/request';
import { getAllGAPCertificationsForKS } from '@lib/utils';

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
      percentGAPCertified: '--',
      numHarvestingFarms: '--',
      totalHarvestPounds: '--',
      percentGAPApplied: '--',
      numKSFarmsReferred: '--',
      percentKSGAPApplied: '--',
      numKSGAPAccepted: '--',
      percentKSGAPCertified: '--'
    };
  }

  async componentDidMount() {
    const { isNSEVP } = this.props;

    if (isNSEVP) {
      // Looking at all farms
      const GAPCertifications = await getAllGAPCertifications();

      // 1 - Percentage of certified farms in Group GAP
      const numGAPCertified = GAPCertifications.filter(
        farm => farm.gapCertified === 'Complete'
      ).length;
      const percentGAPCertified = Math.round(
        (numGAPCertified / GAPCertifications.length) * 100
      );

      // 2 - Number of harvesting farms
      const recentHarvests = await getAllRecentHarvestLogs();
      const numHarvestingFarms = recentHarvests.length;

      // 3 - Pounds of total harvest
      const totalHarvests = await getAllTotalHarvests();
      let totalHarvestPounds = 0;
      totalHarvests.forEach(harvest => {
        totalHarvestPounds += harvest.totalProductionPounds;
      });

      // 4 - Percentage of referred farms that are GAP applied
      const allFarms = await getAllFarms();
      const numGAPApplied = GAPCertifications.filter(
        farm => farm.farmApplied === 'Complete'
      );
      const percentGAPApplied = Math.round(
        (numGAPApplied.length / allFarms.length) * 100
      );

      this.setState({
        percentGAPCertified,
        numHarvestingFarms,
        totalHarvestPounds,
        percentGAPApplied
      });
    } else {
      // Only looking at KS-affiliated farms
      const KSGAPCertifications = await getAllGAPCertificationsForKS();

      // 1 - Number of farms referred by KS
      const numKSFarmsReferred = KSGAPCertifications.length;

      // 2 - Number of GAP accepted farms
      const numKSGAPAccepted = KSGAPCertifications.filter(
        farm => farm.farmAccepted === 'Complete'
      ).length;

      // 3 - Percentage of certified farms in Group GAP
      const numKSGAPCertified = KSGAPCertifications.filter(
        farm => farm.gapCertified === 'Complete'
      ).length;
      const percentKSGAPCertified = Math.round(
        (numKSGAPCertified / KSGAPCertifications.length) * 100
      );

      // 4 - Percentage of referred farms that are GAP applied
      const numKSGAPApplied = KSGAPCertifications.filter(
        farm => farm.farmApplied === 'Complete'
      );
      const percentKSGAPApplied = Math.round(
        (numKSGAPApplied.length / KSGAPCertifications.length) * 100
      );

      this.setState({
        numKSFarmsReferred,
        numKSGAPAccepted,
        percentKSGAPCertified,
        percentKSGAPApplied
      });
    }
  }

  getNSEVPStatCards = () => {
    const {
      percentGAPCertified,
      numHarvestingFarms,
      totalHarvestPounds,
      percentGAPApplied
    } = this.state;

    const iconProps = {
      fontSize: 'large',
      style: { color: 'var(--ks-dark-blue)' }
    };

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
        number: numHarvestingFarms,
        unit: ' farms',
        description: 'are harvesting this week'
      },
      {
        icon: <LocalShipping {...iconProps} />,
        name: 'Total Harvest',
        number: totalHarvestPounds,
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
  };

  getKSStatCards = () => {
    const {
      numKSFarmsReferred,
      numKSGAPAccepted,
      percentKSGAPCertified,
      percentKSGAPApplied
    } = this.state;

    const iconProps = {
      fontSize: 'large',
      style: { color: 'var(--ks-dark-blue)' }
    };

    return [
      {
        icon: <Chat {...iconProps} />,
        name: 'Referrals',
        number: numKSFarmsReferred,
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
    const statCards = isNSEVP
      ? this.getNSEVPStatCards()
      : this.getKSStatCards();

    return (
      <div className={classes.root}>
        {statCards.map(statCard => (
          <div className={classes.card} key={statCard.name}>
            {statCard.icon}
            <h3>{statCard.name}</h3>
            <h2>{`${statCard.number} ${statCard.unit}`}</h2>
            <p>{statCard.description}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default withStyles(styles)(StatCards);
