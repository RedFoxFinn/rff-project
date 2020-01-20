import React from 'react';
import '../Colors.css';

const NotInUse = ({className, heightStyle}) => {
  return (
    <svg height={heightStyle} viewBox="0 0 24 24" enableBackground="new 0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path className='HslWarningRed' d="M1.565,24c-0.4,0-0.801-0.153-1.107-0.459c-0.611-0.611-0.611-1.602,0-2.213l20.87-20.87
        c0.611-0.611,1.602-0.611,2.213,0c0.611,0.611,0.611,1.602,0,2.213l-20.87,20.87C2.366,23.847,1.966,24,1.565,24z"/>
      <path className='HslWarningRed' d="M22.435,24c-0.4,0-0.801-0.153-1.107-0.459L0.459,2.672c-0.611-0.611-0.611-1.602,0-2.213
        c0.611-0.611,1.602-0.611,2.213,0l20.87,20.87c0.611,0.611,0.611,1.602,0,2.213C23.236,23.847,22.835,24,22.435,24z"/>
    </svg>
  );
};

export default NotInUse;