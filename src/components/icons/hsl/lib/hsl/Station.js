import React from 'react';
import '../Colors.css';

const Station = ({className, heightStyle}) => {
  return (
    <svg height={heightStyle} viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path className='HslBlue' d="M-0.007 80.935l1023.776-80.823v80.826l-1023.776 269.413v-269.417z"/>
      <path className='HslBlue' d="M-0.007 161.761h215.529v862.127h-215.529v-862.127z"/>
      <path className='HslBlue' d="M727.717 242.374c-163.607 0-296.269 132.723-296.269 296.442 0 163.711 132.658 296.467 296.269 296.467 163.657 0 296.29-132.756 296.29-296.467 0-163.715-132.633-296.442-296.29-296.442zM727.695 754.424c-118.967 0-215.435-96.504-215.435-215.576 0-119.043 96.468-215.547 215.435-215.547 119.010 0 215.435 96.504 215.435 215.547 0 119.072-96.425 215.576-215.435 215.576z"/>
      <path className='Black' d="M798.652 456.57c-14.873 14.674-29.691 29.395-44.542 44.065 0-33.921 0-67.864 0-101.735 0-34.051-52.732-34.051-52.732 0 0 54.477 0 109.004 0 163.448-0.025 1.308 0.051 2.583 0.238 3.862 0.903 11.441 8.005 18.691 16.841 21.588 8.33 3.703 18.254 3.226 26.798-4.472 0.289-0.238 0.553-0.452 0.849-0.719 0.079-0.051 0.184-0.105 0.238-0.184 29.85-29.532 59.729-59.028 89.554-88.582 24.272-23.9-13.030-61.203-37.245-37.27z"/>
    </svg>
  );
};

export default Station;