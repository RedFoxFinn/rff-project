import React from 'react';
import '../Colors.css';

const ZoneD = ({className, heightStyle}) => {
  return (
    <svg height={heightStyle} viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle className='HslBlue' cx="11" cy="11" r="11" />
      <path className='White' d="M6.08 5.415A1.135 1.135 0 0 1 7.235 4.26h3.705c4.095 0 6.925 2.81 6.925 6.5v.04c0 3.665-2.83 6.5-6.925 6.5H7.235a1.135 1.135 0 0 1-1.155-1.155V5.415zm4.86 9.795c2.735 0 4.525-1.845 4.525-4.395v-.035c0-2.555-1.79-4.435-4.5-4.435H8.37v8.865h2.57z"/>
    </svg>
  )
};

export default ZoneD