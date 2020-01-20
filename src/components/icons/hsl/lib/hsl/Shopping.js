import React from 'react';
import '../Colors.css';

const Shopping = ({className, heightStyle}) => {
  return (
    <svg height={heightStyle} viewBox="0 0 283.46 283.46" enableBackground="new 0 0 283.46 283.46"xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g id="bkg" display="none">
      </g>
      <g id="picto">
        <path className='Metro' d="M141.415,106.297c9.788,0,17.717-7.928,17.717-17.717V17.714c0-9.788-7.928-17.717-17.717-17.717
          c-9.788,0-17.717,7.928-17.717,17.717V88.58C123.699,98.369,131.627,106.297,141.415,106.297z"/>
        <path className='Metro' d="M265.662,88.58h-88.583c0,19.586-15.883,35.433-35.433,35.433c-19.586,0-35.433-15.847-35.433-35.433
          H17.621c-9.788,0-19.656,8.584-16.468,22.73l34.193,154.435c2.976,9.824,7.928,17.717,17.717,17.717h177.165
          c9.788,0,14.324-7.299,17.717-17.717l34.051-153.912C286.151,98.271,275.459,88.58,265.662,88.58z"/>
      </g>
    </svg>
  );
};

export default Shopping;