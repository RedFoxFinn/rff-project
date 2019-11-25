import React from 'react';
import '../Colors.css';

const Place = ({className, heightStyle}) => {
  return (
    <svg height={heightStyle} viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path className='FerryLight' d="M864.309 343.535c0 188.974-340.8 683.218-340.8 683.218s-340.8-494.245-340.8-683.218c0-187.359 151.826-340.8 340.8-340.8s340.8 153.441 340.8 340.8zM675.336 341.92c0-82.372-67.839-150.211-151.826-150.211-83.991 0-151.826 67.836-151.826 150.211 0 83.991 67.836 151.826 151.826 151.826 83.987 0 151.826-67.839 151.826-151.826z"/>
    </svg>
  )
};

export default Place