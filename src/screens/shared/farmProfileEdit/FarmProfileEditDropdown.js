import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { AccountCircle } from '@material-ui/icons';
import Dropdown from '@components/Dropdown';

const styles = {
  root: {
    display: 'flex',
    width: '60%',
    marginBottom: 64
  },
  column: {
    width: '100%',
    marginRight: 48
  },
  header: {
    marginBottom: 36
  }
};
class FarmProfileEditDropdown extends React.PureComponent {
  onChange = (prop, items) => event => {
    const { values, handleChange } = this.props;

    const dropdownValues = {
      ...values,
      [prop]: items[event.target.value]
    };
    handleChange(dropdownValues);
  };

  render() {
    const { classes, values } = this.props;
    const { gapContact, contactNames = [], contactIds = [] } = values;

    return (
      <div className={classes.root}>
        <div className={classes.column}>
          <h2 className={classes.header}>Group Gap Contact</h2>
          <Dropdown
            items={contactNames}
            icon={<AccountCircle fontSize="large" />}
            onChange={this.onChange('gapContact', contactIds)}
            value={contactIds.indexOf(gapContact)}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(FarmProfileEditDropdown);
