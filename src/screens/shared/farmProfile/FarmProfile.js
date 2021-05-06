import React from 'react';
import { getSingleFarm, getGapCertificationStatus } from '@lib/farmUtils';
import { getUserById } from '@lib/airtable/request';


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
    const { farm, loading, GAP, GAPContact} = this.state;
    const { match } = this.props;
    const { farmId } = match.params;

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
            <FarmContactCard farm={farm} GAPContact={GAPContact}/>
          </div>
          <div className="farm-profile__right-col">
            <FarmCertificationStepper farm={farm} GAP={GAP}/>
            <FarmGraphsTable />
          </div>
        </div>
      </div>
    );
  }
}

export default FarmProfile;
