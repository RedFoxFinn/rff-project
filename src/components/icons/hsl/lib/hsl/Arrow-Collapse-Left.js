import React from 'react';
import '../Colors.css';

const ArrowCollapseLeft = ({className, heightStyle}) => {
  return (
    <svg height={heightStyle} viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g transform="rotate(90 512 512)">
        <path className='Train' d="M512 814.511l-492.745-492.745c-25.685-25.685-25.685-67.326 0-93.011v0c25.685-25.685 67.326-25.685 93.011 0l492.742 492.742-93.007 93.015z"/>
        <path className='Tram' d="M512 814.511l-93.011-93.011 492.745-492.745c25.685-25.685 67.326-25.685 93.011 0v0c25.685 25.685 25.685 67.326 0 93.011l-492.745 492.745z"/>
      </g>
    </svg>
  );
};

//fix

export default ArrowCollapseLeft;