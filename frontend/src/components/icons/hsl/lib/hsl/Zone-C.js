import React from 'react';
import '../Colors.css';

const ZoneC = ({className, heightStyle}) => {
  return (
    <svg height={heightStyle} viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle className='HslBlue' cx="11" cy="11" r="11" />
      <path className='White' d="M4.47 10.815v-.035a6.6 6.6 0 0 1 6.72-6.745A6.84 6.84 0 0 1 15.66 5.5c.282.217.447.554.445.91a1.11 1.11 0 0 1-1.135 1.12 1.14 1.14 0 0 1-.69-.225 4.725 4.725 0 0 0-3.11-1.175c-2.475 0-4.3 2.05-4.3 4.6v.04c0 2.55 1.805 4.615 4.3 4.615a4.675 4.675 0 0 0 3.26-1.245 1.07 1.07 0 0 1 1.4 1.62 6.67 6.67 0 0 1-4.73 1.74 6.555 6.555 0 0 1-6.63-6.685z" />
    </svg>
  )
};

export default ZoneC