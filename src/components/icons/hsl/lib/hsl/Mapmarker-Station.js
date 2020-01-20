import React from 'react';
import '../Colors.css';
import Station from './Station.js';

const MapmarkerStation = ({className, heightStyle}) => {
  return (
    <svg height={heightStyle} viewBox="0 0 2348 2348" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle key="halo" className="stop-halo" cx="1174" cy="1174" r="1135" strokeWidth="78" stroke="#333" strokeOpacity="0.4" fill="#fff" fillOpacity="1"/>
      <circle className='HslGreen' fillOpacity="1" cx="1174" cy="1174" r="980"/>
      <use x="657" y="657" width="1024" height="1024" className="fill-color14" fill="#fff" xlinkHref={<Station className='stationIcon'/>}/>
    </svg>
  );
};

export default MapmarkerStation;