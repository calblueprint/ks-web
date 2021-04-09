import React from 'react';

import { Chat, WbSunny, Check, Assignment } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

import { getAllFarmsForFarmSearch } from '@lib/farmUtils';
import { getAllGAPCertificationsForStatCard } from '@lib/dashboardUtils';

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
      search: null,
      filteredFarms: [],
      gapCertification: []
    };
  }

  // async componentDidMount() {
  //   const farms = await getAllFarmsForFarmSearch();
  //   this.setState({ farms, filteredFarms: farms });
  //   console.log(farms);
  // };

  async componentDidMount() {
    const farms = await getAllFarmsForFarmSearch();
    const gapCertification = await getAllGAPCertificationsForStatCard();

    const numGapCertified = gapCertification.filter(farm => farm.gapCertified);

    this.setState({ numGapCertified: numGapCertified });
    this.setState({ farms: farms });
    console.log(numGapCertified.length, gapCertification.length);
    const percentGapCertified = (numGapCertified.length / farms.length) * 100;
    this.setState({ percentGapCertified });
    console.log(percentGapCertified);
    // console.log(gapCertification)
  }

  getCardStats = () => {
    // TODO: Replace with Airtable Call
    // const gapCertified = gapCertification.filter(
    //   singleGapCertified =>
    //   (singleGapCertified.gapCertified === true)
    // );
    // this.setState(gapCertified);
    const percentGapCertified = this.state;
    const iconProps = {
      fontSize: 'large',
      style: { color: 'var(--ks-dark-blue)' }
    };

    return [
      {
        icon: <Chat {...iconProps} />,
        name: 'Referrals',
        number: '17,000',
        unit: ' farms',
        description: 'referred to Group GAP'
      },
      {
        icon: <Check {...iconProps} />,
        name: 'Group GAP Acceptances',
        number: '40',
        unit: '%',
        description: 'are currently in a Group GAP cohort' //groupgapcontact in farms?
      },
      {
        icon: <WbSunny {...iconProps} />,
        name: 'GAP Certification',
        number: { percentGapCertified },
        unit: '%',
        description: 'of KS farms are GAP certified'
      },
      {
        icon: <Assignment {...iconProps} />,
        name: 'Group GAP Applications',
        number: '20',
        unit: '%',
        description: 'of referred farms have completed an application'
      }
    ];
  };

  render() {
    const { classes } = this.props;
    const stats = this.getCardStats();

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
