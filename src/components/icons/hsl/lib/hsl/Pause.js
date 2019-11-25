import React from 'react';
import '../Colors.css';

const Pause = ({className, heightStyle}) => {
  return (
    <svg height={heightStyle} viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path className='Train' d="M230.377 1024.079h-0.043c-84.832 0-153.604-68.771-153.604-153.604v-716.952c0-84.832 68.771-153.604 153.604-153.604h0.043c84.832 0 153.604 68.771 153.604 153.604v716.952c0 84.832-68.771 153.604-153.604 153.604z"/>
      <path className='Tram' d="M793.663 1024.079h-0.043c-84.832 0-153.604-68.771-153.604-153.604v-716.952c0-84.832 68.771-153.604 153.604-153.604h0.043c84.832 0 153.604 68.771 153.604 153.604v716.952c0 84.832-68.771 153.604-153.604 153.604z"/>
    </svg>
  )
};

export default Pause