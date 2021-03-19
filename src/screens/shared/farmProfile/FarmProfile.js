import React from 'react';

import { getSingleFarm } from '@lib/farmUtils';
import { Button } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import Stepper from '@components/Stepper';
import Link from '@material-ui/core/Link';
import '@styles/FarmProfile.css';

import FarmContactCard from './FarmContactCard';
import FarmGraphsTable from './FarmGraphsTable';

class FarmProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      farm: {},
      farmId: '',
      loading: true
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { farmId } = match.params;
    const farm = await getSingleFarm(farmId);
    this.setState({ farm, farmId, loading: false });
  }

  render() {
    const { farm, loading } = this.state;

    if (loading) {
      return null;
    }
    return (
      <div className="farm-profile">
        <Link href="/farms" underline="none" color="inherit">
          <Button>
            <ArrowBackIcon />
            Back to Farm Search
          </Button>
        </Link>
        <h1>{farm.farmName}</h1>
        <div className="farm-profile__section">
          <div className="farm-profile__left-col">
            <FarmContactCard farm={farm} />
          </div>
          <div className="farm-profile__right-col">
            <Stepper />
            <FarmGraphsTable />
          </div>
        </div>
      </div>
    );
  }
}

export default FarmProfile;
