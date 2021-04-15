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
      totalHarvests: [],
      recentHarvests: [],
      gapCertification: [],
      numFarmReferred: '',
      numKsGapAccepted: '',
      percentKsGapCertified: '',
      percentKsGapApplied: '',
      percentGapCertified: '',
      nsevpHarvestFarms: '',
      totalHarvestsPounds: '',
      percentGapApplied: ''
    };
  }

  async componentDidMount() {
    const farms = await getAllFarmsForFarmSearch();
    const gapCertification = await getAllGAPCertificationsForStatCard();
    const totalHarvests = await getAllTotalHarvestsForStatCard();
    const recentHarvests = await getAllRecentHarvestLogsForStatCard();
    const ksFarms = farms.filter(farm => farm.ksAffiliated);

    const numGapCertified = gapCertification.filter(farm => farm.gapCertified); // in gap certification there is no ks affiliated column

    const numFarmReferred = gapCertification.filter(
      farm => farm.farmReferred === 'Complete'
    ).length;

    const numKsGapAccepted = gapCertification.filter(
      farm => farm.gapAccepted === 'Complete'
    ).length;

    const numGapApplied = gapCertification.filter(
      farm => farm.farmApplied === 'Complete'
    );

    function roundToTwo(num) {
      return +`${Math.round(`${num}e+2`)}e-2`;
    }

    function roundToOne(num) {
      return +`${Math.round(`${num}e+1`)}e-1`;
    }
    const percentKsGapCertified = roundToOne(
      (numGapCertified.length / ksFarms.length) * 100
    );
    const percentKsGapApplied = roundToTwo(
      (numGapApplied.length / ksFarms.length) * 100
    );

    const percentGapCertified = roundToTwo(
      (numGapCertified.length / farms.length) * 100
    );
    const percentGapApplied = roundToTwo(
      (numGapApplied.length / farms.length) * 100
    );
    const nsevpHarvestFarms = recentHarvests.length;

    let total = 0;
    for (let i = 0; i < totalHarvests.length; i += 1) {
      total += totalHarvests[i].totalProductionPounds;
    }
    const totalHarvestsPounds = total;

    this.setState({
      farms,
      ksFarms,
      totalHarvests,
      recentHarvests,
      gapCertification,
      numFarmReferred,
      numKsGapAccepted,
      percentKsGapCertified,
      percentKsGapApplied,
      percentGapCertified,
      nsevpHarvestFarms,
      totalHarvestsPounds,
      percentGapApplied
    });
  }

  getCardStats = isNSEVP => {
    const {
      numFarmReferred,
      numKsGapAccepted,
      percentKsGapCertified,
      percentKsGapApplied,
      percentGapCertified,
      nsevpHarvestFarms,
      totalHarvestsPounds,
      percentGapApplied
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
          number: percentGapCertified,
          unit: ' %',
          description: 'of farms in the Group GAP program are GAP Certified'
        },
        {
          icon: <WbSunny {...iconProps} />,
          name: 'Harvesting Farms',
          number: nsevpHarvestFarms,
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
          number: percentGapApplied,
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
        number: numKsGapAccepted,
        unit: ' farms',
        description: 'are currently in a Group GAP cohort'
      },
      {
        icon: <Check {...iconProps} />,
        name: 'GAP Certification',
        number: percentKsGapCertified,
        unit: '%',
        description: 'of KS farms are GAP certified'
      },
      {
        icon: <Assignment {...iconProps} />,
        name: 'Group GAP Applications',
        number: percentKsGapApplied,
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
