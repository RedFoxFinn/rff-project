import React from 'react';
import '../Colors.css';

const Star = ({className, heightStyle}) => {
  return (
    <svg height={heightStyle} viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path className='Citybike' d="M1007.715 441.173l-195.187 203.322 38.628 278.546c2.034 22.365-6.102 44.73-24.399 56.929-18.297 12.196-40.666 14.233-60.997 6.098l-254.15-124.024-254.147 124.024c-8.135 4.064-16.267 4.064-24.399 4.064-12.199 0-24.402-2.030-34.568-10.162-18.297-12.199-28.463-34.568-24.399-56.929l36.598-278.546-193.15-203.322c-16.267-16.267-20.331-38.628-14.233-58.963 6.102-22.365 24.402-36.598 46.764-40.666l276.515-50.832 134.19-248.049c10.166-20.331 30.497-30.497 50.832-30.497 22.365 0 42.696 10.166 52.862 30.497l134.194 248.049 276.512 50.832c22.365 4.064 38.628 18.297 46.764 40.666 6.102 20.335 2.034 42.696-14.23 58.963z"/>
    </svg>
  );
};

export default Star;