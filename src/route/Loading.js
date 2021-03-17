import React from 'react';
import '@styles/LoadingComponent.css';
import LoadingSpinner from './LoadingSpinner';

const LoadingComponent = () => {
  return (
    <div className="loading-component">
      <LoadingSpinner />
    </div>
  );
};

export default LoadingComponent;
