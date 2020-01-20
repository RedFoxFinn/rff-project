import React from 'react';

import ExpressIcon from './lib/icons/ExpressIcon.js';
import GraphqlIcon from './lib/icons/GraphqlIcon.js';
import HerokuIcon from './lib/icons/HerokuIcon.js';
import JwtAsset from './lib/icons/JwtAsset.js';
import JwtIcon from './lib/icons/JwtIcon.js';
import ReactIcon from './lib/icons/ReactIcon.js';
import ReactIconsIcon from './lib/icons/ReactIconsIcon.js';
import ReduxIcon from './lib/icons/ReduxIcon.js';

function Iconos(name, height) {
  switch (name) {
  case 'expressIcon':
    return <ExpressIcon heightStyle={height}/>;
  case 'graphqlIcon':
    return <GraphqlIcon heightStyle={height}/>;
  case 'herokuIcon':
    return <HerokuIcon heightStyle={height}/>;
  case 'jwtAsset':
    return <JwtAsset heightStyle={height}/>;
  case 'jwtIcon':
    return <JwtIcon heightStyle={height}/>;
  case 'reactIcon':
    return <ReactIcon heightStyle={height}/>;
  case 'reactIconsIcon':
    return <ReactIconsIcon heightStyle={height}/>;
  case 'reduxIcon':
    return <ReduxIcon heightStyle={height}/>;
  default:
    return <ReactIcon heightStyle={height}/>;
  }
}

export default Iconos;