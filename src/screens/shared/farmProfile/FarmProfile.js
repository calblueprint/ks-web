import React from 'react';
import { getSingleFarm } from '@lib/farmUtils';
import { getSingleGapCertfication } from '@lib/dashUtils';


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
      gapCert:{},
      gapCertID: '',
      farmId: '',
      loading: true
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { farmId } = match.params;
    const farm = await getSingleFarm(farmId);
    //const { gapCertID } = farm.gapCertificationIds[0];
    //const gapCert = await getSingleGapCertfication(gapCertID)
    this.setState({ farm, farmId, loading: false }); //gapCert,gapCertID,
  }

  render() {
    const { farm, loading } = this.state;
    const { match } = this.props;
    const { farmId } = match.params;
    console.log(farm.gapCertificationIds);

    if (loading) {
      return null;
    }
    return (
      <div className="farm-profile">
        <BackButton label="Back to Farm Search" href="/farms" />
        <div className="farm-profile__header">
          <h1>{farm.farmName}</h1>
          <Link
            href={`/farm/${farmId}/edit`}
            underline="always"
            color="inherit"
          >
            <p className="farm-profile__header-edit">Edit</p>
          </Link>
        </div>
        <div className="farm-profile__section">
          <div className="farm-profile__left-col">
            <FarmContactCard farm={farm} />
          </div>
          <div className="farm-profile__right-col">
            <FarmCertificationStepper farm={farm}/>
            <FarmGraphsTable />
          </div>
        </div>
      </div>
    );
  }
}

export default FarmProfile;
