import React from 'react';

import { getDateOptions } from '@lib/utils';

import { withStyles } from '@material-ui/core/styles';
import { Button, Popper } from '@material-ui/core';
import {
  CalendarToday,
  KeyboardArrowDown,
  Clear,
  Done
} from '@material-ui/icons/';

import RadioOptions from '@components/RadioOptions';

const styles = {
  dropdown: {
    textTransform: 'none'
  },
  label: {
    margin: '8px 24px'
  },
  radio: {
    borderTop: '0.7px solid var(--ks-medium-light-grey)',
    padding: '12px 200px 24px 24px'
  },
  popper: {
    backgroundColor: 'white',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)'
  },
  filterBtns: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: 12
  },
  filterBtn: {
    padding: '0px 12px'
  }
};

class GraphFilterMenu extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      filterBy: null
    };
  }

  handleClick = event => {
    const { anchorEl } = this.state;
    this.setState({
      anchorEl: anchorEl ? null : event.currentTarget
    });
  };

  handleClear = () => {
    const { onChange } = this.props;
    onChange(null);
    this.setState({ filterBy: null, anchorEl: null });
  };

  handleApply = () => {
    const { onChange } = this.props;
    const { filterBy } = this.state;
    onChange(filterBy);
    this.setState({ anchorEl: null });
  };

  handleChange = event => {
    this.setState({ filterBy: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl, filterBy } = this.state;

    return (
      <div>
        <Button
          className={classes.dropdown}
          variant="outlined"
          fontSize="large"
          onClick={this.handleClick}
          startIcon={<CalendarToday />}
          endIcon={<KeyboardArrowDown />}
        >
          <h3 className={classes.label}>Date Filters</h3>
        </Button>
        <Popper
          className={classes.popper}
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          placement="bottom-start"
        >
          <div className={classes.filterBtns}>
            <Button
              className={classes.filterBtn}
              startIcon={<Clear />}
              onClick={this.handleClear}
            >
              <p>Clear</p>
            </Button>
            <Button
              className={classes.filterBtn}
              startIcon={<Done />}
              onClick={this.handleApply}
            >
              <p>Apply</p>
            </Button>
          </div>
          <div className={classes.radio}>
            <h3>Date Options</h3>
            <RadioOptions
              id="date-filter"
              options={getDateOptions()}
              value={filterBy}
              onChange={this.handleChange}
            />
          </div>
        </Popper>
      </div>
    );
  }
}

export default withStyles(styles)(GraphFilterMenu);
