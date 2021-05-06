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
      KSGAP: [],
      totalHarvests: [],
      recentHarvests: [],
      GAPCertification: [],
      numKSFarmReferred: '',
      numKSGAPAccepted: '',
      percentKSGAPCertified: '',
      percentKSGAPApplied: '',
      percentGAPCertified: '',
      NSEVPHarvestFarms: '',
      totalHarvestsPounds: '',
      percentGAPApplied: '',
      time7daysAgo: ''
    };
  }

  async componentDidMount() {
    const farms = await getAllFarmsForFarmSearch();
    const GAPCertification = await getAllGAPCertificationsForStatCard();
    const totalHarvests = await getAllTotalHarvestsForStatCard();
    const recentHarvests = await getAllRecentHarvestLogsForStatCard();
    const KSFarms = farms.filter(farm => farm.ksAffiliated);

    const KSGAP = GAPCertification.filter(
      farm => 'ksAffiliated' in farm && farm.ksAffiliated.includes(true)
    );

    const numGAPCertified = GAPCertification.filter(
      farm => farm.gapCertified === 'Complete'
    );

    const numKSGAPCertified = KSGAP.filter(
      farm => farm.gapCertified === 'Complete'
    );

    const numKSFarmReferred = KSGAP.filter(
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

    function getWeekDates() {
      let now = new Date();
      let dayOfWeek = now.getDay(); //0-6
      let numDay = now.getDate();

      let start = new Date(now); //copy
      start.setDate(numDay - dayOfWeek);
      start.setHours(0, 0, 0, 0);

      let end = new Date(now); //copy
      end.setDate(numDay + (7 - dayOfWeek));
      end.setHours(0, 0, 0, 0);

      return [start, end];
    }

     let [start, end] = getWeekDates();

     console.log(start.toLocaleString(), end.toLocaleString());
     console.log(new Date(recentHarvests[0].date.toLocaleString()))
     //console.log(new Date(recentHarvests[0].date).toLocaleString)
    // //console.log(new Date(recentHarvests.date[0]).toLocaleDateString)

     const time7daysAgo = recentHarvests.filter(farm => new Date(farm.date).toLocaleString >= +start && +new Date(farm.date).toLocaleString < +end);
     console.log(recentHarvests, time7daysAgo);

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
      numKSFarmReferred,
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
      numKSFarmReferred,
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
          description: 'harvested in the last 7 days'
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
        number: numKSFarmReferred,
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
