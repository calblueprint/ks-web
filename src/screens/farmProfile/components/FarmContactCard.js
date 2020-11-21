import React from 'react';

class FarmContactCard extends React.PureComponent {
  render() {
    // const { id, farmName, farmerName, phone, email, address, location, inspector } = this.props;
    const { id, farmName } = this.props;

    return (
      <div className="farm-card" id={id}>
        <h3 className="farm-card__header">{farmName}</h3>
        <div className="farm-card__body">{`id=${id}`}</div>
      </div>
    );
  }
}

export default FarmContactCard;
