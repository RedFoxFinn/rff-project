import React from 'react';
import '../Colors.css';

const MapmarkerTo = ({className, heightStyle}) => {
  return (
    <svg height={heightStyle} viewBox="0 0 70 94" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <linearGradient id="linearGradient_mapmarkerToIcon" x1="50%" x2="50%" y1="0%" y2="72.217%">
        <stop offset="0%" stopColor="#FF6DD8"/>
        <stop offset="100%" stopColor="#F653B9"/>
      </linearGradient>
      <path fill="url(#linearGradient_mapmarkerToIcon)" fillRule="evenodd" stroke="#FFF" strokeWidth="3" d="M495.475 389.502c.193-.045.522-.128.941-.245a25.43 25.43 0 0 0 2.168-.705c.286-.109.555-.219.805-.33l2.111-.942v2.311c0 2.984-1.012 6.744-1.873 8.372-3.263 6.395-8.492 12.684-14.353 16.583-7.44 4.95-15.457 5.899-23.356 1.806-10.666-5.537-15.638-6.314-21.907-4.823a8.48 8.48 0 0 1-.287.063l-.061.013a6.52 6.52 0 0 0-.167.04c-.023.005-.653.186-.946.26-1.545.39-2.978.48-4.427.074a6.436 6.436 0 0 1-.712-.245l-.93-.382V368.58c0-4.1 3.41-8.043 7.772-8.907 5.086-1.007 10.294-.805 15.21 1.089 6.321 2.434 11.624 7.481 15.529 15.51 3.321 6.812 7.52 10.805 12.452 12.602 3.718 1.355 7.548 1.422 12.031.627zM429.001 357.5c1.752 0 3.167 1.443 3.167 3.2v73.192c0 1.757-1.415 3.2-3.167 3.2h-3.334c-1.752 0-3.167-1.443-3.167-3.2V360.7c0-1.757 1.415-3.2 3.167-3.2h3.334z" transform="translate(-421 -356)"/>
    </svg>
  );
};

export default MapmarkerTo;