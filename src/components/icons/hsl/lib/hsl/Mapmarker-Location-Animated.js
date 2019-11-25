import React from 'react';
import '../Colors.css';
import User from './User.js';

const MapmarkerLocationAnim = ({className, heightStyle}) => {
  return (
    <svg height={heightStyle} viewBox="0 0 2248 2248" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <radialGradient id="mapMarker-white" cx="50%" cy="50%" r="70%">
        <stop offset="0%" stopColor="rgb(255,255,255)" stopOpacity="1" />
        <stop offset="25%" stopColor="rgb(255,255,255)" stopOpacity="1" />
        <stop offset="70%" stopColor="rgb(255,255,255)" stopOpacity="0" />
      </radialGradient>
      <circle fill="#EF80C6" cx="1124" cy="1124" r="340"/>
      <circle cx="1124" cy="1124" r="732" strokeWidth="784" fill="none" stroke="url(#mapMarker-white)" />
      <circle strokeWidth="50" r="340" opacity="1" cx="1124" fill="transparent" stroke="rgb(239, 128, 198)" cy="1124" id="circle_pink_first"/>
      <circle strokeWidth="82" r="585" opacity="0.6" cx="1124" fill="transparent" stroke="rgb(239, 128, 198)" cy="1124" id="circle_pink_second"/>
      <circle strokeWidth="116" r="830" opacity="0.4" cx="1124" fill="transparent" stroke="rgb(239, 128, 198)" cy="1124" id="circle_pink_third"/>
      <circle strokeWidth="149" r="1075" opacity="0.1" cx="1124" fill="transparent" stroke="rgb(239, 128, 198)" cy="1124" id="circle_pink_fourth"/>
      <use x="850" y="830" width="550" height="550" className="fill-color14" xlinkHref={<User/>} fill="#fff"/>
    </svg>
  )
};

export default MapmarkerLocationAnim