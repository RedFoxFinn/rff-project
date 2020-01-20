import React from 'react';
import '../Colors.css';

const Rail = ({className, heightStyle}) => {
  return (
    <svg height={heightStyle} viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path className='Train' d="M937.929 305.712v428.902c0 34.135-10.386 47.49-56.395 84.594-32.646 26.711-47.49 38.585-99.431 38.585h-96.465v63.815h-342.823v-63.818h-97.949c-51.944 0-66.784-11.874-100.915-38.585-46.009-35.616-57.88-50.459-57.88-84.594v-428.898c0-26.711 17.81-72.72 40.070-121.694 26.714-56.395 48.978-100.919 71.239-120.21 31.161-29.68 175.12-63.815 314.624-63.815 143.955 0 284.943 34.135 317.59 63.815 22.26 19.291 43.039 63.815 69.754 120.21 20.776 48.975 38.582 94.984 38.582 121.694zM859.273 966.128c16.325 0 28.196 13.355 28.196 28.196 0 16.325-11.871 29.68-28.196 29.68h-691.578c-16.325 0-29.68-13.359-29.68-29.68 0-14.84 13.355-28.196 29.68-28.196h68.265v-62.33h56.398v62.33h442.253v-62.33h54.914v62.33h69.747zM826.627 292.356c5.935-25.23-11.874-44.524-37.104-44.524h-553.565c-25.226 0-41.555 19.294-37.097 44.524l69.75 295.333c4.451 25.23 29.68 44.524 54.91 44.524h379.923c25.23 0 50.463-19.294 54.914-44.524l68.269-295.333zM287.902 115.748v25.23c0 19.294 16.325 35.619 35.616 35.619h379.923c19.294 0 34.138-16.325 34.138-35.619v-25.23h-449.677zM362.106 742.033c0-20.776-17.806-37.104-38.589-37.104-20.776 0-35.616 16.325-35.616 37.104 0 20.776 14.84 35.616 35.616 35.616 20.783 0 38.589-14.84 38.589-35.616zM740.549 737.579c0-20.776-16.321-37.104-37.104-37.104-20.776 0-37.097 16.325-37.097 37.104 0 20.776 16.321 35.616 37.097 35.616 20.783 0.004 37.104-14.84 37.104-35.616z"/>
    </svg>
  );
};

export default Rail;