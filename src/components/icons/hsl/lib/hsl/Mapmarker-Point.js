import React from 'react';
import '../Colors.css';

const MapmarkerPoint = ({className, heightStyle}) => {
  return (
    <svg height={heightStyle} viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path className='HslHighlightYellow' d="M512-0.007c203.687 0 368.811 161.811 368.811 361.42 0 199.602-368.811 662.598-368.811 662.598s-368.811-462.996-368.811-662.602c0-199.609 165.12-361.416 368.811-361.416z"/>
    </svg>
  )
};

export default MapmarkerPoint