import React from 'react';
import moment from 'moment';

import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

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
  }
};
class HarvestLogsGraph extends React.PureComponent {
  getData = () => {
    // Fill in with Airtable Data
    const num = 3;
    const placeholderDate = moment('20201024').format('MM/DD/YY');
    const dates = Array(num).fill(placeholderDate);
    const data = [
      ['Arugula', 'Bananas', 'Peppers, Hot'],
      ['Mushrooms', 'Pak Choi, Baby', 'Oregano Fresh'],
      ['Pumpkins, Asorted']
    ];

    return { dates, data };
  };

  render() {
    const { classes } = this.props;
    const { dates, data } = this.getData();

    console.log(dates, data);
    return (
      <div>
        <div className={classes.row}>
          <h3 className={classes.left}>Date</h3>
          <h3 className={classes.right}>Item(s) Harvested</h3>
        </div>
        {dates.map((date, idx) => (
          <div className={classes.row}>
            <h3 className={classes.left}>{date}</h3>
            <div className={classes.right}>
              {data[idx].map(datum => (
                <Chip className={classes.chip} label={datum} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default withStyles(styles)(HarvestLogsGraph);
