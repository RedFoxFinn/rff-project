import React from 'react';
import '../Colors.css';

const ArrowDown = ({className, heightStyle}) => {
  return (
    <svg height={heightStyle} viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path className='Tram' d="M555.292 1006.295c-4.086 2.045-20.44 18.398-44.965 18.398s-40.879-16.354-44.965-18.398l-447.625-449.663c-24.525-24.529-24.525-63.363 0-89.937 24.525-24.525 65.404-24.525 89.933 0l339.297 341.342v-743.999c0-34.745 28.615-63.36 63.36-63.36s63.363 28.615 63.363 63.36v743.999l341.338-341.342c24.525-24.525 63.36-24.525 89.933 0 24.525 26.574 24.525 65.404 0 89.937l-449.67 449.663z"/>
    </svg>
  );
};

export default ArrowDown;