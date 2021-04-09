import React from 'react';

import { Chat, WbSunny, Check, Assignment } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

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
class StatCards extends React.PureComponent {
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
