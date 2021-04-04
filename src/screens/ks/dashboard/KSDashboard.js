import React from 'react';
import { connect } from 'react-redux';
import '@styles/Dashboard.css';

class KSDashboard extends React.PureComponent {
  // TO-DO: Ensure structure is the same as NSEVP Dashboard, once it is completed
  // On the above note, it may be possible to just have one shared Dashboard class
  render() {
    return null;
  }
}

const mapStateToProps = state => ({
  user: state.userData.user
});

export default connect(mapStateToProps)(KSDashboard);
