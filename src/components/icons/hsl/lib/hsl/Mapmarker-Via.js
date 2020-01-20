import React from 'react';
import '../Colors.css';

const MapmarkerVia = ({className, heightStyle}) => {
  return (
    <svg height={heightStyle} viewBox="0 0 70 94" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <linearGradient id="linearGradient_mapmarkerViaIcon" x1="50%" x2="50%" y1="0%" y2="50%">
        <stop offset="0%" stopColor="#4E4E51"/>
        <stop offset="100%" stopColor="#262628"/>
      </linearGradient>
      <g fill="none" fillRule="evenodd" strokeWidth="3" transform="translate(3 3)">
        <path className='HslPink' d="M32-1.5c18.471 0 33.496 15.207 33.5 33.892 0 4.861-.989 9.524-2.936 13.851-6.38 14.134-17.274 29.383-28.073 42.1A3.27 3.27 0 0 1 32 89.5c-.96 0-1.88-.429-2.49-1.156C18.744 75.678 7.815 60.378 1.43 46.24-.513 41.92-1.5 37.258-1.5 32.391-1.5 13.707 13.522-1.5 32-1.5z"/>
        <circle cx="32.5" cy="32.5" r="14" className='HslGreen'/>
      </g>
    </svg>
  );
};

export default MapmarkerVia;