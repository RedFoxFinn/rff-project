import React from 'react';
import '../Colors.css';

const ArrowRight = ({className, heightStyle}) => {
  return (
    <svg height={heightStyle} viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path className='Ferry' d="M556.575 1006.295c-24.525 24.525-63.36 24.525-89.933 0-24.525-26.574-24.525-65.404 0-89.933l341.338-341.338h-743.995c-34.745 0-63.363-28.615-63.363-63.363 0-34.745 28.618-63.36 63.363-63.36h743.995l-341.338-339.293c-24.525-24.529-24.525-65.404 0-89.937 26.574-24.525 65.404-24.525 89.933 0l449.67 447.622c2.041 4.089 18.395 20.44 18.395 44.965 0 24.529-16.354 40.879-18.395 44.968l-449.67 449.67z"/>
    </svg>
  );
};

export default ArrowRight;