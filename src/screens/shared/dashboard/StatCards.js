import React from 'react';
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
  render() {
    const { classes, stats } = this.props;
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
