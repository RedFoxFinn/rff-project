import React from 'react';
import '../Colors.css';

const Route = ({className, heightStyle}) => {
  return (
    <svg height={heightStyle} viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path className='HslBlue' d="M436.405 430.657c0 120.112-218.661 435.783-218.661 435.783s-217.122-315.671-217.122-435.783c0-120.108 97.010-217.122 217.122-217.122 121.647 0.004 218.661 97.014 218.661 217.122zM314.754 430.657c0-53.895-43.115-97.010-97.010-97.010-52.356 0-97.010 43.119-97.010 97.010 0 52.356 44.654 95.471 97.010 95.471 53.895 0.004 97.010-43.112 97.010-95.471zM370.191 966.536c-38.498-4.62-75.454-20.020-107.793-44.654l30.797-40.037c24.637 18.482 53.895 29.258 83.153 33.878l-6.156 50.813zM441.025 911.102c33.874-7.698 64.671-26.176 87.769-50.817l36.956 33.878c-29.258 32.339-69.295 55.437-112.41 66.217l-12.315-49.278zM564.212 804.851c10.78-26.176 13.858-53.895 12.322-83.153l50.813-4.62c3.081 36.956-3.081 73.912-16.939 107.79l-46.197-20.017zM570.371 637.003c-6.159-44.654 6.163-92.393 43.119-126.271l36.956 33.878c-24.637 23.098-32.339 55.437-29.258 87.773l-50.817 4.62zM804.436 529.21c-24.637-20.017-49.278-24.637-78.536-21.556-4.617 0-10.78 1.539-15.4 3.078l-10.78-50.813c6.163-1.543 13.861-3.078 21.563-3.078 41.573-4.62 83.153 6.159 113.949 32.336l-30.797 40.034zM1024.639 215.078c0 70.834-127.814 255.621-127.814 255.621s-127.81-184.783-127.81-255.621c0-70.834 56.976-127.81 127.81-127.81s127.814 56.976 127.814 127.81zM953.802 213.539c0-30.797-26.18-55.437-56.976-55.437s-56.973 24.637-56.973 55.437c0 32.336 26.176 56.976 56.973 56.976s56.976-24.641 56.976-56.976z"/>
    </svg>
  )
};

export default Route