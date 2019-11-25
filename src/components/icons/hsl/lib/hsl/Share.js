import React from 'react';
import '../Colors.css';

const Share = ({className, heightStyle}) => {
  return (
    <svg height={heightStyle} viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path className='Ferry' d="M1024.007 775.557c0 70.505-58.754 129.259-130.942 129.259-58.75 0-109.112-40.29-124.227-94.008l-508.648 62.117c-3.36 70.505-60.434 125.907-130.942 125.907-72.185 0-129.255-57.078-129.255-129.263s57.070-130.939 129.255-130.939c15.111 0 28.539 3.356 41.97 6.716l58.757-112.475c-31.891-23.503-53.718-62.113-53.718-104.080 0-45.326 23.503-83.933 57.078-107.439l-67.156-141.014c-11.751 3.356-23.503 5.036-36.934 5.036-72.185 0-129.255-58.754-129.255-129.259 0-72.185 57.070-130.942 129.255-130.942 70.509 0 129.263 57.078 130.942 127.583l359.249 47.006c16.787-53.718 65.466-94.008 125.899-94.008 70.505 0 129.259 58.757 129.259 130.939 0 52.042-31.891 97.368-75.545 117.511l80.58 292.096c5.036-1.68 8.395-1.68 13.428-1.68 72.196 0 130.95 58.754 130.95 130.939zM270.262 404.561c11.748-3.356 23.496-6.716 36.931-6.716 36.931 0 72.189 16.787 95.684 41.97l223.271-149.406c-6.708-15.107-10.068-33.575-11.748-50.362l-360.925-48.682c-8.395 30.219-26.859 55.398-50.362 72.185l67.149 141.010zM206.473 765.486c23.496 16.787 40.283 40.29 48.678 68.825l508.655-63.79c0-8.395 1.676-18.467 3.36-26.859l-349.174-147.726c-23.507 38.61-63.79 62.113-110.795 62.113-15.107 0-28.535-1.676-41.97-6.716l-58.754 114.151zM758.77 364.274c-3.36 1.68-8.395 1.68-13.431 1.68-38.614 0-72.185-16.787-95.684-41.97l-224.951 149.406c8.395 16.787 11.748 35.251 11.748 55.398 0 10.072-1.676 20.147-3.356 30.219l350.853 147.726c13.428-21.823 31.891-40.29 57.070-50.358l-82.249-292.1z"/>
    </svg>
  )
};

export default Share