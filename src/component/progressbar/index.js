import React from 'react';
import './progress.css';

const ProgressBar = ({width}) => {
  return (
    <div className="progress-bar primary-bar">
        <div className="progress-fill primary-progress" style={{width: width}}></div>
    </div>
  )
}

export default ProgressBar;