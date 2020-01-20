import React from 'react';
import '../Colors.css';

const DirectionA = ({className, heightStyle}) => {
  return (
    <svg height={heightStyle} viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path className='HslBlue' d="M457.968 1001.527l-49.061-64.18c149.745-114.469 232.212-265.663 232.212-425.73s-82.47-311.26-232.212-425.73l49.061-64.176c170.199 130.104 263.933 304.093 263.933 489.906s-93.734 359.805-263.933 489.91z"/>
      <path className='HslWarningRed' d="M384.93 0h296.543v79.074h-296.543v-79.074z"/>
      <path className='HslHighlightYellow' d="M384.93 0h79.074v296.543h-79.074v-296.543z"/>
      <path className='Tram' d="M384.93 944.196h296.543v79.074h-296.543v-79.074z"/>
      <path className='HslGreen' d="M384.93 726.807h79.074v296.543h-79.074v-296.543z"/>
    </svg>
  );
};

export default DirectionA;