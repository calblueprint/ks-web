import React from 'react';
import { store } from '@lib/redux/store';

import { withStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { getAllRecentUpdatesByUserType } from '@lib/farmUtils.js';

const styles = {
  root: {
    backgroundColor: 'white',
    flex: 1,
    height: '100%',
    margin: 16,
    minWidth: 256,
    overflowX: 'hidden',
    overflowY: 'scroll',
    padding: '36px 24px 24px 36px',
    boxSizing: 'border-box'
  },
  update: {
    alignItems: 'flex-start',
    backgroundColor: 'white',
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: 'var(--ks-medium-dark-grey)',
    borderStyle: 'solid',
    display: 'flex',
    padding: '12px 0px'
  },
  updateText: {
    width: '100%'
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
    width: '100%'
  },
  text: {
    maxWidth: 512,
    marginBottom: 24
  }
};

class RecentUpdates extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      recentUpdates: []
    };
  }

  async componentDidMount() {
    const { user } = store.getState().userData;
    const recentUpdates = await getAllRecentUpdatesByUserType(user.userTypes);
    this.setState({ recentUpdates });
  }

  render() {
    const { classes } = this.props;
    const { recentUpdates } = this.state;

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
            <div className={classes.updateText}>
              <div className={classes.title}>
                <h3 className={classes.meta}>{update.namefromAuthor}</h3>
                <p className={classes.meta}>
                  {new Date(update.date).toLocaleDateString()}
                </p>
              </div>
              <p className={classes.body}>{update.message}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default withStyles(styles)(RecentUpdates);
