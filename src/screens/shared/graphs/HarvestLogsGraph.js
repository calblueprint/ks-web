import React from 'react';
import moment from 'moment';

import { getAllRecentHarvestLogs } from '@lib/airtable/request';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import { Button } from '@material-ui/core';

const styles = {
  row: {
    display: 'flex'
  },
  left: {
    flex: 1,
    display: 'flex',
    alignItems: 'center'
  },
  right: {
    flex: 3,
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    margin: '16px 0px'
  },
  chip: {
    margin: '4px 8px 4px 0px',
    fontFamily: 'Inter'
  },
  buttonRow: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    color: 'var(--ks-medium-dark-grey)'
  }
};
class HarvestLogsGraph extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dates: [],
      crops: [],
      showNum: 5
    };
  }

  async componentDidMount() {
    const { dates, crops } = await this.getData();
    this.setState({ dates, crops });
  }

  onClick = () => {
    const { showNum } = this.state;
    this.setState({ showNum: showNum + 5 });
  };

  getData = async () => {
    const { id } = this.props;
    let data = await getAllRecentHarvestLogs();
    data = data
      .filter(datum => datum.farmId === id)
      .map(datum => ({ ...datum, date: new Date(datum.date) }))
      .sort((a, b) => b.date - a.date);

    const dates = data.map(datum => moment(datum.date).format('MM/DD/YY'));
    const crops = data.map(datum => datum.crops.split(','));

    // console.log(data);
    return { dates, crops };
  };

  render() {
    const { classes } = this.props;
    const { dates, crops, showNum } = this.state;
    const numRows = Math.min(dates.length - 1, showNum);

    return (
      <div>
        <div className={classes.row}>
          <h3 className={classes.left}>Date</h3>
          <h3 className={classes.right}>Item(s) Harvested</h3>
        </div>
        {dates.slice(0, numRows).map((date, idx) => (
          <div className={classes.row}>
            <h3 className={classes.left}>{date}</h3>
            <div className={classes.right}>
              {crops[idx].map(crop => (
                <Chip className={classes.chip} label={crop} />
              ))}
            </div>
          </div>
        ))}
        {showNum <= numRows ? (
          <div className={classes.buttonRow}>
            <Button onClick={this.onClick}>See More</Button>
          </div>
        ) : null}
      </div>
    );
  }
}

export default withStyles(styles)(HarvestLogsGraph);
