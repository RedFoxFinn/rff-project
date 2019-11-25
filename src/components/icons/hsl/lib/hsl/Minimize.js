import React from 'react';
import '../Colors.css';

const Minimize = ({className, heightStyle}) => {
  return (
    <svg height={heightStyle} viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path className='Metro' d="M396.075 5.3h-0.036c-25.887 0-46.872 20.985-46.872 46.872v228.339l-266.794-266.791c-18.305-18.305-47.981-18.305-66.286 0l-2.366 2.366c-18.305 18.305-18.305 47.981 0 66.289l266.794 266.791h-228.339c-25.887 0-46.872 20.985-46.872 46.872v0.036c0 25.887 20.985 46.872 46.872 46.872h337.628c29.352 0 53.144-23.792 53.144-53.144v-337.632c0-25.887-20.985-46.872-46.872-46.872zM1010.28 941.628l-266.798-266.798h228.339c25.887 0 46.872-20.985 46.872-46.872v-0.033c0-25.887-20.985-46.872-46.872-46.872h-337.628c-29.352 0-53.144 23.792-53.144 53.144v337.628c0 25.887 20.985 46.872 46.872 46.872h0.036c25.887 0 46.872-20.985 46.872-46.872v-228.335l266.794 266.794c18.305 18.305 47.981 18.305 66.289 0l2.366-2.366c18.305-18.308 18.305-47.985 0-66.289z"/>
    </svg>
  )
};

export default Minimize