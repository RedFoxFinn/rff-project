import React from 'react';
import '../Colors.css';

const Plus = ({className, heightStyle}) => {
  return (
    <svg height={heightStyle} viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path className='HslGreen' d="M512 1024v0c-42.418 0-76.802-34.384-76.802-76.802v-870.396c0-42.418 34.387-76.802 76.802-76.802v0c42.414 0 76.802 34.384 76.802 76.802v870.396c0 42.418-34.387 76.802-76.802 76.802z"/>
      <path className='HslGreen' d="M0 512v0c0-42.418 34.384-76.802 76.802-76.802h870.396c42.414 0 76.802 34.384 76.802 76.802v0c0 42.414-34.384 76.802-76.802 76.802h-870.396c-42.418 0-76.802-34.387-76.802-76.802z"/>
    </svg>
  )
};

export default Plus