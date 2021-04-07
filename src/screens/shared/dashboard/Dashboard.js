import React from 'react';
import DashboardGraph from '@assets/dashboardGraph.png';
import { Chat, WbSunny, Check, Assignment } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

import RecentUpdates from '@shared/dashboard/RecentUpdates';
import StatCards from '@shared/dashboard/StatCards';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    margin: 32,
    maxWidth: 1680
  },
  row: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    margin: '0 -16px',
    minWidth: 256,
    height: 512
  },
  graph: {
    alignItems: 'center',
    backgroundColor: 'white',
    display: 'flex',
    flex: 2.25,
    height: '100%',
    justifyContent: 'center',
    margin: 16,
    minWidth: 512
  },
  image: {
    maxWidth: '100%'
  }
};

class Dashboard extends React.PureComponent {
  getCardStats = () => {
    // TODO: Replace with Airtable Call
    const iconProps = {
      fontSize: 'large',
      style: { color: 'var(--ks-dark-blue)' }
    };

    return [
      {
        icon: <Chat {...iconProps} />,
        name: 'Total Harvest',
        number: '17,000',
        unit: ' lbs',
        description: 'of harvest to date'
      },
      {
        icon: <Check {...iconProps} />,
        name: 'GAP Certification',
        number: '40',
        unit: '%',
        description: 'of farms in Food Hub are GAP Certified'
      },
      {
        icon: <WbSunny {...iconProps} />,
        name: 'Harvesting Farms',
        number: '10',
        unit: ' farms',
        description: 'are harvesting this week'
      },
      {
        icon: <Assignment {...iconProps} />,
        name: 'North Shore GAP',
        number: '20',
        unit: '%',
        description: 'of all GAP-certified farms in North Shore are NSEVP'
      }
    ];
  };

  getRecentUpdates = num => {
    // TODO: Replace with Airtable Call
    const placeholder = {
      profilePic: null,
      date: '11/17/20',
      author: 'Nick Wong',
      text:
        "This is an update. Please read it, it must be quite important ya'know."
    };
    return Array(num).fill(placeholder);
  };

  render() {
    const { classes } = this.props;
    const stats = this.getCardStats();
    const recentUpdates = this.getRecentUpdates(5);

    return (
      <div className={classes.root}>
        <h1>Dashboard</h1>
        <StatCards stats={stats} />
        <div className={classes.row}>
          <div className={classes.graph}>
            <img
              className={classes.image}
              src={DashboardGraph}
              alt="farm production history"
            />
          </div>
          <RecentUpdates recentUpdates={recentUpdates} />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Dashboard);
