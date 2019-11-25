import React from 'react';
import '../Colors.css';

const Home = ({className, heightStyle}) => {
  return (
    <svg height={heightStyle} viewBox="0 0 283.46 283.46" enableBackground="new 0 0 283.46 283.46" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g id="bkg" display="none">
      </g>
      <g id="picto">
        <g>
          <path className='Train' d="M278.166,125.471c9.757,9.757,1.857,26.481-11.618,26.481h-26.023v131.511H43.028V151.951H17.005
          c-13.94,0-21.375-16.723-11.618-26.481L123.885,6.97c9.761-9.296,26.023-9.296,35.784,0L278.166,125.471z M105.762,188.666
          v-34.385H73.699v34.385H105.762z M105.762,243.964V209.58H73.699v34.385H105.762z M158.738,188.666v-34.385h-32.063v34.385
          H158.738z M158.738,243.964V209.58h-32.063v34.385H158.738z"/>
        </g>
      </g>
    </svg>
  )
};

export default Home