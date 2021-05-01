import React from 'react';

import { getDateOptions } from '@lib/farmUtils';

import { withStyles } from '@material-ui/core/styles';
import RadioOptions from '@components/RadioOptions';

const styles = {
  radio: {
    borderTop: '0.7px solid var(--ks-medium-light-grey)',
    padding: '12px 200px 24px 24px'
  }
};

class DateFilterMenu extends React.PureComponent {
  render() {
    const { classes, value, handleChange } = this.props;

    return (
      <div className={classes.radio}>
        <RadioOptions
          id="date-filter"
          options={getDateOptions()}
          value={value}
          onChange={handleChange}
        />
      </div>
    );
  }
}

export default withStyles(styles)(DateFilterMenu);
