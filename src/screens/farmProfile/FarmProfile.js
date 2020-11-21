import React from 'react';
import FarmContactCard from './components/FarmContactCard';
import '../../styles/FarmProfile.css';

class FarmProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const {id} = match.params;
    this.setState({ id });
  }

  render() {
    return (
      <div>
        <FarmContactCard id="123" farmName="Golden Corn" />
      </div>
    );
  }
}

export default FarmProfile;
