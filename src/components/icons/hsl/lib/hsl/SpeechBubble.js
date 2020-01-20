import React from 'react';
import '../Colors.css';

const SpeechBubble = ({className, heightStyle}) => {
  return (
    <svg height={heightStyle} viewBox="0 0 127.8 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path className='JokeriLightRail' d="M113.9,0H13.2C6.3,0,0.6,5.7,0.6,12.6v50.4c0,6.9,5.7,12.6,12.6,12.6h14.7l-8.1,23c-0.5,1.3,0.1,1.8,1.3,1.1l41.2-24.1h51.7c6.9,0,12.6-5.7,12.6-12.6V12.6C126.5,5.7,120.9,0,113.9,0z M63.6,56c0,0.7-0.6,1.3-1.3,1.3H27.2c-0.7,0-1.3-0.6-1.3-1.3v-5c0-0.7,0.6-1.3,1.3-1.3h35.1c0.7,0,1.3,0.6,1.3,1.3V56z M101.2,40.2c0,0.7-0.6,1.3-1.3,1.3H27.2c-0.7,0-1.3-0.6-1.3-1.3v-5c0-0.7,0.6-1.3,1.3-1.3H100c0.7,0,1.3,0.6,1.3,1.3V40.2z M101.2,24.5c0,0.7-0.6,1.3-1.3,1.3H27.2c-0.7,0-1.3-0.6-1.3-1.3v-5c0-0.7,0.6-1.3,1.3-1.3H100c0.7,0,1.3,0.6,1.3,1.3V24.5z"/>
    </svg>
  );
};

export default SpeechBubble;