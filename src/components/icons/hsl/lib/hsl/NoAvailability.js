import React from 'react';
import '../Colors.css';

const NoAvailability = ({className, heightStyle}) => {
  return (
    <svg height={heightStyle} viewBox="0 0 24 24" enableBackground="new 0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle className='HslWarningRed' cx="12" cy="12" r="12"/>
      <path opacity="0.1" d="M12,2c5.514,0,10,4.486,10,10s-4.486,10-10,10S2,17.514,2,12S6.486,2,12,2 M12,0C5.373,0,0,5.373,0,12
        s5.373,12,12,12s12-5.373,12-12S18.627,0,12,0L12,0z"/>
      <rect x="5.636" y="11" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -4.9706 12)" fill="#FFFFFF" width="12.728" height="2"/>
      <rect x="11" y="5.636" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -4.9706 12)" fill="#FFFFFF" width="2" height="12.728"/>
    </svg>
  );
};

export default NoAvailability;