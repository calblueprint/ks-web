import React from 'react';
import { getSingleFarm, getGapCertificationStatus } from '@lib/farmUtils';
import { getUserById } from '@lib/airtable/request';

import BackButton from '@components/BackButton';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';

import FarmContactCard from './FarmContactCard';
import FarmGraphsTable from './FarmGraphsTable';
import FarmCertificationStepper from './FarmCertificationStepper';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    margin: 50,
    padding: 50,
    backgroundColor: 'white',
    maxWidth: 1680,
    width: '100%'
  },
  header: {
    display: 'flex',
    alignItems: 'center'
  },
  edit: {
    margin: '8px 24px 0px 24px'
  },
  body: {
    display: 'flex',
    font: 'Inter',
    color: 'var(--ks-grey)'
  },
  leftCol: {
    flex: 1,
    minWidth: 256
  },
  rightCol: {
    flex: 4,
    marginLeft: 48
  }
};

class FarmProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      farm: {},
      GAP: {},
      GAPId: '',
      GAPContact: {},
      farmId: '',
      loading: true
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { farmId } = match.params;

    const farm = await getSingleFarm(farmId);
    const GAPContact = await getUserById(farm.groupGapContactId);
    const GAP = await getGapCertificationStatus(farm.gapCertificationId);
    this.setState({ farm, farmId, loading: false, GAP, GAPContact });
  }

  render() {
    const { farm, loading, GAP, GAPContact } = this.state;
    const { match, isNSEVP, classes } = this.props;
    const { farmId } = match.params;

    if (loading) {
      return null;
    }
    return (
      <div className={classes.root}>
        <BackButton label="Back to Farm Search" href="/farms" />
        <div className={classes.header}>
          <h1>{farm.farmName}</h1>
          {isNSEVP && (
            <Link
              href={`/farm/${farmId}/edit`}
              underline="always"
              color="inherit"
            >
              <p className={classes.edit}>Edit</p>
            </Link>
          )}
        </div>
        <div className={classes.body}>
          <div className={classes.leftCol}>
            <FarmContactCard farm={farm} GAP={GAP} GAPContact={GAPContact} />
          </div>
          <div className={classes.rightCol}>
            <FarmCertificationStepper />
            <FarmGraphsTable />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(FarmProfile);
