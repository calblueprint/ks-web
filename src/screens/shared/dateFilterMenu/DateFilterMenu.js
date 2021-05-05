import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { Button, Popper, Collapse, ListItem } from '@material-ui/core';
import {
  CalendarToday,
  KeyboardArrowDown,
  ExpandLess,
  ExpandMore
} from '@material-ui/icons';

import DateFilterRadio from './DateFilterRadio';
import DateFilterButtons from './DateFilterButtons';
import DateFilterPicker from './DateFilterPicker';

const styles = {
  dropdown: {
    textTransform: 'none'
  },
  label: {
    margin: '8px 24px'
  },
  popper: {
    backgroundColor: 'white',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)'
  },
  options: {
    margin: '16px 8px'
  }
};

class DateFilterMenu extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      filterBy: null,
      showDropdown: false,
      startDate: '',
      endDate: ''
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
    console.log(this.state);
  };

  handleChange = event => {
    this.setState({
      filterBy: event.target.value,
      startDate: '',
      endDate: ''
    });
  };

  handleExpand = () => {
    const { showDropdown } = this.state;
    this.setState({ showDropdown: !showDropdown });
  };

  handleStartDate = event => {
    this.setState({ startDate: event.target.value });
  };

  handleEndDate = event => {
    this.setState({ endDate: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl, filterBy, showDropdown } = this.state;

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
          <DateFilterButtons
            handleClear={this.handleClear}
            handleApply={this.handleApply}
          />
          <DateFilterPicker
            handleStart={this.handleStartDate}
            handleEnd={this.handleEndDate}
          />
          <ListItem button onClick={this.handleExpand}>
            <h3 className={classes.options}>Advanced Options</h3>
            {showDropdown ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={showDropdown} timeout="auto" unmountOnExit>
            <DateFilterRadio
              value={filterBy}
              handleChange={this.handleChange}
            />
          </Collapse>
        </Popper>
      </div>
    );
  }
}

export default withStyles(styles)(DateFilterMenu);
