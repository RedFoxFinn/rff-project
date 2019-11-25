import React from 'react';
import '../Colors.css';

const Ticket = ({className, heightStyle}) => {
  return (
    <svg height={heightStyle} viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path className='HslBlue' d="M25.2148675,24.4648264 L8.85486746,24.4648264 C6.73486746,20.7048264 5.53486746,16.3048264 5.53486746,9.8248264 C5.53486746,9.2648264 5.53486746,8.6648264 5.57486746,8.1048264 L21.0548675,8.1048264 C21.0148675,8.6648264 21.0148675,9.2648264 21.0148675,9.8248264 C21.0148675,15.2648264 22.5748675,20.9448264 25.2148675,24.4648264 Z M4.57486746,9.8248264 C4.57486746,12.9448264 4.81486746,16.6648264 5.41486746,18.4648264 L0.49486746,18.4648264 L0.49486746,0.4648264 L16.8948675,0.4648264 L16.8948675,7.1848264 L8.29486746,7.1848264 C8.57486746,7.0648264 8.77486746,6.7848264 8.77486746,6.5048264 C8.77486746,6.0648264 8.41486746,5.7448264 7.89486746,5.7448264 C7.89486746,5.7448264 7.73486746,5.7448264 7.57486746,5.7848264 L7.41486746,5.4248264 C7.81486746,5.2248264 7.93486746,4.9448264 8.01486746,4.6648264 C8.01486746,4.2248264 7.69486746,3.9048264 7.29486746,3.9048264 C6.93486746,3.9048264 6.65486746,4.0648264 6.45486746,4.4648264 L6.09486746,4.3048264 L6.17486746,3.9848264 C6.17486746,3.4648264 5.81486746,3.1048264 5.41486746,3.1048264 C4.97486746,3.1048264 4.65486746,3.4648264 4.65486746,3.9848264 C4.65486746,3.9848264 4.65486746,4.1448264 4.69486746,4.3048264 L4.33486746,4.4648264 C4.21486746,4.0248264 3.77486746,3.9048264 3.49486746,3.9048264 C3.13486746,3.9048264 2.77486746,4.2248264 2.77486746,4.5848264 C2.77486746,4.9048264 2.93486746,5.2248264 3.37486746,5.4248264 L3.21486746,5.7848264 C3.05486746,5.7448264 2.93486746,5.7448264 2.89486746,5.7448264 C2.37486746,5.7448264 2.01486746,6.0648264 2.01486746,6.5048264 C2.01486746,6.9048264 2.37486746,7.2248264 2.89486746,7.2248264 C2.93486746,7.2248264 3.05486746,7.2248264 3.21486746,7.1848264 L3.37486746,7.5448264 C2.93486746,7.7848264 2.81486746,8.1048264 2.81486746,8.4248264 C2.81486746,8.7848264 3.17486746,9.1048264 3.49486746,9.1048264 C3.77486746,9.1048264 4.21486746,8.9048264 4.33486746,8.5048264 L4.61486746,8.6248264 C4.61486746,9.0248264 4.57486746,9.4248264 4.57486746,9.8248264 Z M13.8148675,13.7848264 C13.7348675,13.3848264 13.2948675,13.1048264 12.8948675,13.1048264 L12.5348675,13.1848264 L12.2948675,12.7448264 C12.6548675,12.6248264 12.8548675,12.1848264 12.8548675,11.9448264 C12.8548675,11.5448264 12.6148675,11.3048264 12.2148675,11.3048264 C11.9748675,11.3048264 11.5348675,11.5048264 11.4148675,11.8648264 C11.2548675,11.7848264 11.1348675,11.7448264 10.9748675,11.7048264 C11.0148675,11.5848264 11.0548675,11.4648264 11.0548675,11.3448264 C11.0548675,10.9848264 10.9348675,10.5048264 10.4548675,10.5048264 C10.0148675,10.5048264 9.69486746,10.9048264 9.69486746,11.3048264 L9.69486746,11.3448264 C9.69486746,11.3848264 9.65486746,11.4248264 9.65486746,11.4648264 C9.65486746,11.5448264 9.69486746,11.6248264 9.73486746,11.6648264 L9.29486746,11.8648264 C9.25486746,11.7448264 9.17486746,11.6648264 9.09486746,11.5848264 L9.09486746,11.5448264 C8.89486746,11.3848264 8.69486746,11.3048264 8.49486746,11.3048264 C8.09486746,11.3048264 7.81486746,11.5448264 7.81486746,11.9448264 C7.81486746,12.2248264 8.09486746,12.6648264 8.41486746,12.7448264 L8.29486746,13.1848264 L7.93486746,13.1048264 C7.53486746,13.1048264 7.21486746,13.3848264 7.21486746,13.7448264 C7.21486746,14.1448264 7.61486746,14.5048264 8.13486746,14.5048264 C8.25486746,14.5048264 8.37486746,14.5048264 8.49486746,14.4248264 L8.81486746,14.9048264 C8.57486746,15.1448264 8.45486746,15.2248264 8.45486746,15.5448264 C8.45486746,15.9048264 8.85486746,16.3448264 9.33486746,16.3448264 C9.53486746,16.3448264 9.73486746,16.2648264 9.85486746,16.0648264 L9.85486746,16.0248264 C9.89486746,15.9448264 9.93486746,15.8648264 9.93486746,15.7848264 C10.3348675,15.9448264 10.2548675,15.7848264 10.5748675,16.3848264 C10.7348675,16.8248264 11.2148675,17.1448264 11.5348675,17.1448264 C11.7748675,17.1448264 12.0148675,16.9448264 12.0148675,16.6648264 C12.0148675,16.5448264 11.9748675,16.4248264 11.9348675,16.2648264 L11.9348675,16.2248264 L11.7348675,15.9448264 L12.0548675,15.7848264 C12.1748675,15.9048264 12.2948675,16.0248264 12.3748675,16.0648264 L12.3748675,16.1048264 C12.6148675,16.2648264 12.8548675,16.3448264 13.0948675,16.3448264 C13.3748675,16.3448264 13.5748675,16.1448264 13.5748675,15.8648264 C13.5748675,15.5048264 13.2548675,15.1048264 12.6548675,14.8648264 L12.7348675,14.4648264 C12.8548675,14.5048264 12.9748675,14.5048264 13.0548675,14.5048264 L13.0948675,14.5048264 C13.5748675,14.5048264 13.8148675,14.2648264 13.8148675,13.7848264 Z M10.3348675,12.1448264 C10.8148675,12.3048264 11.0548675,12.4248264 11.5348675,12.6248264 C11.7748675,13.1048264 11.8948675,13.3448264 12.1748675,13.8248264 C12.0548675,14.3048264 12.0148675,14.5448264 11.9748675,15.0248264 C11.5748675,15.2248264 11.3348675,15.3048264 10.9748675,15.5048264 C9.69486746,15.0648264 9.37486746,14.7848264 8.81486746,13.8248264 C9.05486746,12.8248264 9.17486746,12.5448264 10.3348675,12.1448264 Z M4.65486746,7.9448264 L4.17486746,7.7448264 L3.65486746,6.5048264 L4.17486746,5.2248264 L5.41486746,4.7448264 L6.65486746,5.2248264 L7.17486746,6.5048264 L6.89486746,7.1848264 L5.57486746,7.1848264 C5.13486746,7.1848264 4.73486746,7.5048264 4.65486746,7.9448264 Z M15.2548675,14.2648264 L19.3748675,14.2648264 C19.5348675,14.2648264 19.7348675,14.0648264 19.7348675,13.9048264 C19.7348675,13.6648264 19.4948675,13.3848264 19.2548675,13.3848264 L15.1348675,13.3848264 C14.9348675,13.3848264 14.7348675,13.5848264 14.7348675,13.7448264 C14.7348675,14.0248264 14.9748675,14.2648264 15.2548675,14.2648264 Z M20.2148675,15.6248264 C20.1348675,15.4248264 19.8948675,15.2248264 19.6948675,15.2248264 L15.5748675,15.2248264 C15.3748675,15.2248264 15.2148675,15.4248264 15.2148675,15.5448264 C15.2148675,15.8248264 15.4948675,16.0648264 15.8148675,16.0648264 L19.9348675,16.0648264 C20.0948675,16.0648264 20.2548675,15.9848264 20.2548675,15.8248264 C20.2548675,15.7448264 20.2148675,15.7048264 20.2148675,15.6248264 Z M14.7348675,12.2648264 C14.8148675,12.3448264 14.9348675,12.3848264 15.0148675,12.3848264 L19.1748675,12.3848264 C19.3748675,12.3848264 19.5748675,12.1848264 19.5748675,11.9848264 C19.5748675,11.7448264 19.4148675,11.5448264 19.1748675,11.5448264 L15.0548675,11.5448264 C14.8148675,11.5448264 14.6148675,11.7448264 14.6148675,11.9448264 C14.6148675,12.0648264 14.6548675,12.1848264 14.7348675,12.2648264 Z M10.1348675,4.3448264 C10.1348675,4.5448264 10.2948675,4.7048264 10.4948675,4.7048264 L14.3748675,4.7048264 C14.5748675,4.7048264 14.7348675,4.5448264 14.7348675,4.3448264 C14.7348675,4.1448264 14.5748675,3.9848264 14.3748675,3.9848264 L10.4948675,3.9848264 C10.2948675,3.9848264 10.1348675,4.1448264 10.1348675,4.3448264 Z M10.1348675,5.9048264 C10.1348675,6.1048264 10.2948675,6.2648264 10.4948675,6.2648264 L14.3748675,6.2648264 C14.5748675,6.2648264 14.7348675,6.1048264 14.7348675,5.9048264 C14.7348675,5.7048264 14.5748675,5.5448264 14.3748675,5.5448264 L10.4948675,5.5448264 C10.2948675,5.5448264 10.1348675,5.7048264 10.1348675,5.9048264 Z M7.41486746,4.4648264 C7.45486746,4.5048264 7.45486746,4.5448264 7.45486746,4.5848264 C7.45486746,4.7048264 7.37486746,4.9848264 7.05486746,4.9848264 C6.93486746,4.9848264 6.89486746,4.9448264 6.89486746,4.8248264 C6.89486746,4.5448264 7.25486746,4.4248264 7.29486746,4.4248264 C7.33486746,4.4248264 7.37486746,4.4248264 7.41486746,4.4648264 Z M3.89486746,4.8648264 L3.89486746,4.9448264 C3.85486746,4.9848264 3.81486746,4.9848264 3.77486746,4.9848264 C3.41486746,4.9848264 3.37486746,4.6648264 3.37486746,4.5848264 C3.37486746,4.5048264 3.41486746,4.4248264 3.49486746,4.4248264 C3.57486746,4.4248264 3.89486746,4.5048264 3.89486746,4.8648264 Z M5.61486746,3.9848264 C5.61486746,3.9848264 5.57486746,4.2248264 5.41486746,4.3448264 C5.21486746,4.2248264 5.21486746,3.9848264 5.21486746,3.9848264 C5.21486746,3.7848264 5.29486746,3.6648264 5.41486746,3.6648264 C5.53486746,3.6648264 5.61486746,3.7848264 5.61486746,3.9848264 Z M3.41486746,8.5048264 C3.37486746,8.4648264 3.37486746,8.4248264 3.37486746,8.3848264 C3.37486746,8.3048264 3.41486746,8.0248264 3.77486746,8.0248264 C3.81486746,8.0248264 3.89486746,7.9848264 3.89486746,8.1048264 C3.89486746,8.4648264 3.57486746,8.5448264 3.49486746,8.5448264 C3.45486746,8.5448264 3.45486746,8.5448264 3.41486746,8.5048264 Z M2.89486746,6.3048264 C2.89486746,6.3048264 3.13486746,6.3048264 3.25486746,6.5048264 C3.13486746,6.6648264 2.89486746,6.7048264 2.89486746,6.7048264 C2.69486746,6.7048264 2.57486746,6.5848264 2.57486746,6.5048264 C2.57486746,6.3848264 2.69486746,6.3048264 2.89486746,6.3048264 Z M7.57486746,6.5048264 C7.65486746,6.3048264 7.89486746,6.3048264 7.89486746,6.3048264 C8.09486746,6.3048264 8.21486746,6.3848264 8.21486746,6.5048264 C8.21486746,6.5848264 8.09486746,6.7048264 7.89486746,6.7048264 C7.89486746,6.7048264 7.65486746,6.6648264 7.57486746,6.5048264 Z M12.4548675,15.3848264 L12.4948675,15.3848264 C12.8948675,15.3848264 12.9748675,15.7048264 12.9748675,15.7848264 L12.9748675,15.8248264 L12.9348675,15.8248264 C12.7348675,15.8248264 12.4548675,15.5848264 12.4548675,15.3848264 Z M11.3748675,16.3048264 C11.4148675,16.4248264 11.4148675,16.5048264 11.4148675,16.5448264 C11.4148675,16.5848264 11.3748675,16.5848264 11.3748675,16.5848264 C11.4148675,16.5848264 11.0548675,16.5848264 11.0548675,16.1448264 C11.0548675,16.1048264 11.0948675,16.0648264 11.1348675,16.0248264 C11.2548675,16.1048264 11.3748675,16.2648264 11.3748675,16.3048264 Z M8.69486746,11.9848264 L8.81486746,12.2248264 C8.81486746,12.3048264 8.69486746,12.2648264 8.73486746,12.2648264 C8.33486746,12.2648264 8.33486746,11.7048264 8.37486746,11.8648264 C8.41486746,11.8248264 8.41486746,11.8248264 8.45486746,11.8248264 C8.41486746,11.8248264 8.69486746,11.8648264 8.69486746,11.9848264 Z M9.33486746,15.3848264 L9.37486746,15.4248264 C9.37486746,15.8248264 9.25486746,15.8248264 9.13486746,15.8248264 C9.01486746,15.7048264 9.01486746,15.7448264 9.01486746,15.6648264 C9.01486746,15.5448264 9.13486746,15.3848264 9.33486746,15.3848264 Z M12.2948675,11.8648264 C12.2948675,11.8648264 12.2948675,12.3048264 11.8948675,12.2648264 C11.8948675,11.9048264 12.1748675,11.8248264 12.2148675,11.8248264 C12.2548675,11.8248264 12.2548675,11.8248264 12.2948675,11.8648264 Z M10.2948675,11.5848264 C10.1748675,11.4648264 10.2548675,11.2648264 10.2148675,11.3048264 C10.2948675,11.1048264 10.3348675,11.0248264 10.3748675,11.0648264 C10.4948675,11.0648264 10.4948675,11.2248264 10.4948675,11.3448264 C10.4948675,11.4248264 10.4148675,11.5448264 10.3348675,11.6248264 C10.3348675,11.5848264 10.3348675,11.5848264 10.2948675,11.5848264 Z M8.01486746,13.7048264 C8.05486746,13.7048264 8.21486746,13.7048264 8.29486746,13.8248264 C8.29486746,13.9048264 8.17486746,13.9448264 8.05486746,13.9448264 C7.73486746,13.9448264 7.73486746,13.8648264 7.73486746,13.8248264 C7.73486746,13.7048264 7.85486746,13.7048264 8.01486746,13.7048264 Z M13.1748675,13.7448264 C13.2548675,13.7848264 13.2548675,13.7848264 13.2548675,13.8248264 C13.2548675,13.9448264 13.0948675,13.9448264 12.9748675,13.9448264 C12.9348675,13.9448264 12.7748675,13.9448264 12.6948675,13.8248264 C12.6948675,13.7848264 12.8948675,13.6648264 12.9748675,13.7048264 C13.0548675,13.7048264 13.1348675,13.7048264 13.1748675,13.7448264 Z" id="B"/>
    </svg>
  )
};

export default Ticket