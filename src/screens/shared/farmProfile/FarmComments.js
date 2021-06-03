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
    marginBottom: 0
  },
  comment: {
    backgroundColor: 'var(--ks-medium-light-grey)',
    borderRadius: 20,
    padding: 16,
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
    console.log(classes);

    return (
      <div className={classes.root}>
        <h3 className={classes.header}> Additional Comments </h3>
        {comments.map(comment => (
          <div className={classes.comment}>
            <div className={classes.meta}>
              <div className={classes.author}>
                <AccountCircle className={classes.icon} fontSize="large" />
                <h3>{comment.authorName}</h3>
              </div>
              <h3>{moment(comment.date).calendar()}</h3>
            </div>
            <h3 className={classes.text}>{comment.comment}</h3>
          </div>
        ))}
      </div>
    );
  }
}

export default withStyles(styles)(FarmComments);
