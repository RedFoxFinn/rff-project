import React from 'react';
import '../Colors.css';

const BusLive = ({className, heightStyle}) => {
  return (
    <svg height={heightStyle} viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path className='White' d="M1024.007 512c0 282.774-229.233 512.007-512.007 512.007s-512.007-229.233-512.007-512.007c0-282.774 229.233-512.007 512.007-512.007s512.007 229.233 512.007 512.007z"/>
      <path className='HslGreen' d="M512 36.118c127.113 0 246.618 49.499 336.501 139.381s139.381 209.388 139.381 336.501-49.502 246.618-139.381 336.501c-89.883 89.883-209.388 139.381-336.501 139.381s-246.618-49.499-336.501-139.381c-89.883-89.883-139.381-209.388-139.381-336.501s49.499-246.618 139.381-336.501c89.883-89.883 209.388-139.381 336.501-139.381zM512-0.007c-282.776 0-512.007 229.231-512.007 512.007s229.235 512.007 512.007 512.007 512.007-229.235 512.007-512.007c0-282.776-229.231-512.007-512.007-512.007v0z"/>
      <path className='HslGreen' d="M777.208 256.571v457.151c0 15.631-9.768 24.421-20.515 27.35l-29.305 4.884v61.539c0 6.838-5.859 11.723-13.673 11.723h-46.887c-5.863 0-12.698-4.884-12.698-11.723v-54.701c-37.122 4.884-90.847 6.838-143.593 6.838-51.771 0-103.542-1.954-141.639-6.838v54.701c0 6.838-5.863 11.723-11.723 11.723h-46.887c-7.814 0-13.673-4.884-13.673-11.723v-61.539l-29.305-4.884c-9.768-2.93-20.515-12.698-20.515-27.35v-457.151c0-20.515 13.673-34.189 37.122-37.118 77.167-10.747 147.498-14.652 228.574-14.652 78.146 0 149.453 4.884 227.599 14.652 23.442 2.93 37.118 16.603 37.118 37.118zM735.206 287.83c0-12.698-4.884-21.491-20.515-21.491l-403.426-1.954c-15.631 0-21.491 8.793-21.491 21.491v285.232c0 12.698 5.863 18.557 21.491 21.491 56.655 12.698 127.962 21.491 203.178 21.491 71.307 0 144.569-9.768 200.248-19.536 15.631-1.954 20.515-8.789 20.515-21.491v-285.232zM357.175 672.695c0-12.698-11.719-24.421-25.396-24.421s-25.4 11.723-26.375 24.421c0 13.677 11.723 25.4 26.375 26.375 13.673-0.004 25.396-11.723 25.396-26.375zM713.711 672.695c0-12.698-11.719-24.421-25.4-24.421-12.698 0-24.417 11.723-25.396 24.421 0 13.677 11.719 25.4 25.396 26.375 13.681-0.004 25.4-11.723 25.4-26.375z"/>
    </svg>
  )
};

export default BusLive