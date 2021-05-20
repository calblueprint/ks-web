import React from 'react';
import { getSingleFarm } from '@lib/farmUtils';

import BackButton from '@components/BackButton';
import Link from '@material-ui/core/Link';
import '@styles/FarmProfile.css';

import FarmContactCard from './FarmContactCard';
import FarmGraphsTable from './FarmGraphsTable';
import FarmCertificationStepper from './FarmCertificationStepper';

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
    const { match, isNSEVP } = this.props;
    const { farmId } = match.params;

    if (loading) {
      return null;
    }
    return (
      <div className="farm-profile">
        <BackButton label="Back to Farm Search" href="/farms" />
        <div className="farm-profile__header">
          <h1>{farm.farmName}</h1>
          {isNSEVP && (
            <Link
              href={`/farm/${farmId}/edit`}
              underline="always"
              color="inherit"
            >
              <p className="farm-profile__header-edit">Edit</p>
            </Link>
          )}
        </div>
        <div className="farm-profile__section">
          <div className="farm-profile__left-col">
            <FarmContactCard farm={farm} />
          </div>
          <div className="farm-profile__right-col">
            <FarmCertificationStepper />
            <FarmGraphsTable id={farmId} />
          </div>
        </div>
      </div>
    );
  }
}

export default FarmProfile;
