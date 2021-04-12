import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = {
  root: {
    marginTop: 48
  },
  input: {
    marginTop: 48
  },
  textField: {
    backgroundColor: 'var(--ks-light-grey)',
    padding: 24
  }
};
class FarmProfileEditComments extends React.PureComponent {
  onChange = event => {
    const { handleChange } = this.props;
    handleChange(event.target.value);
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <h2>Additional Comments</h2>
        <div className={classes.input}>
          <TextField
            className={classes.test}
            fullWidth
            multiline
            InputProps={{
              className: classes.textField
            }}
            rows={10}
            placeholder="Leave a note here (Max 500 Characters)"
            variant="outlined"
            onChange={this.onChange}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(FarmProfileEditComments);
