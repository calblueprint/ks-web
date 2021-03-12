import React from 'react';
import '@styles/LoadingSpinner.css';

class LoadingSpinner extends React.PureComponent {
  render() {
    return (
      <div className="pp-loading-spinner">
        <div className="pp-loading-dot pp-loading-blue-dot" />
        <div className="pp-loading-dot pp-loading-pink-dot" />
        <div className="pp-loading-dot pp-loading-yellow-dot" />
        <div className="pp-loading-dot pp-loading-green-dot" />
      </div>
    );
  }
}

export default LoadingSpinner;
