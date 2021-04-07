import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const styles = {
  root: {
    backgroundColor: 'white',
    flex: 1,
    height: '100%',
    margin: 16,
    minWidth: 256,
    overflowX: 'hidden',
    overflowY: 'scroll',
    padding: '12px 24px 24px 24px',
    boxSizing: 'border-box'
  },
  update: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: 'var(--ks-medium-dark-grey)',
    borderStyle: 'solid',
    display: 'flex',
    padding: '12px 0px'
  },
  profilePic: {
    margin: '16px 16px 16px 0px',
    width: 48
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  meta: {
    marginBottom: 0
  },
  body: {
    width: '80%'
  }
};

class RecentUpdates extends React.PureComponent {
  render() {
    const { classes, recentUpdates } = this.props;
    return (
      <div className={classes.root}>
        <h2>Recent Updates</h2>
        {recentUpdates.map(update => (
          <div className={classes.update}>
            <div className={classes.profilePic}>
              {update.profilePic ? (
                <img src={update.profilePic} alt="icon" />
              ) : (
                <AccountCircleIcon
                  fontSize="large"
                  style={{ color: 'var(--ks-medium-dark-grey)' }}
                />
              )}
            </div>
            <div>
              <div className={classes.title}>
                <h3 className={classes.meta}>{update.author}</h3>
                <p className={classes.meta}>{update.date}</p>
              </div>
              <p className={classes.body}>{update.text}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default withStyles(styles)(RecentUpdates);
