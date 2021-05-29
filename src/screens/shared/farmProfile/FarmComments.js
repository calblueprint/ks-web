import React from 'react';
import moment from 'moment';

import { withStyles } from '@material-ui/core/styles';
import { AccountCircle } from '@material-ui/icons';

const styles = {
  root: {
    marginTop: 36,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  header: {
    margin: 0
  },
  comment: {
    backgroundColor: 'var(--ks-medium-light-grey)',
    borderRadius: 20,
    padding: 24,
    marginTop: 24
  },
  meta: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  author: {
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    marginRight: 8
  },
  text: {
    lineHeight: 1.5
  }
};

class FarmComments extends React.PureComponent {
  render() {
    const { classes } = this.props;
    const { comments } = this.props;
    const {
      authorId,
      comment,
      id:commentId
    } = comments;
    const numComments = Object.keys(comments).length;
    const placeholderText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
    const placeholderDate = moment(new Date(2020, 11, 16)).calendar();
    //console.log(comments);
    return (
      <div className={classes.root}>
        <h2 className={classes.header}> Additional Comments </h2>
        {[...Array(numComments)].map(() => (
          <div className={classes.comment}>
            <div className={classes.meta}>
              <div className={classes.author}>
                <AccountCircle className={classes.icon} fontSize="large" />
                <h3>{authorId}</h3>
              </div>
              <h3>{placeholderDate}</h3>
            </div>
            <h3 className={classes.text}>{placeholderText}</h3>
          </div>
        ))}
      </div>
    );
  }
}

export default withStyles(styles)(FarmComments);