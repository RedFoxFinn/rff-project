import React from 'react';
import {connect} from "react-redux";

import {Icon, InlineIcon} from "@iconify/react";
import ReduxIcon from '@iconify/icons-simple-icons/redux';
import reactIcon from '@iconify/icons-simple-icons/react';
import graphqlIcon from '@iconify/icons-simple-icons/graphql';
import logoNodejs from '@iconify/icons-ion/logo-nodejs';
import apollostackIcon from '@iconify/icons-logos/apollostack';
import expressIcon from '@iconify/icons-logos/express';
import cypressIcon from '@iconify/icons-logos/cypress';
import mongodbIcon from '@iconify/icons-simple-icons/mongodb';
import npmIcon from '@iconify/icons-simple-icons/npm';
import gitIcon from '@iconify/icons-simple-icons/git';
import githubIcon from '@iconify/icons-simple-icons/github';
import webstormIcon from '@iconify/icons-simple-icons/webstorm';
import googlechromeIcon from '@iconify/icons-simple-icons/googlechrome';
import postmanIcon from '@iconify/icons-simple-icons/postman';
import jestIcon from '@iconify/icons-simple-icons/jest';

import classProvider from '../../tools/classProvider';
import '../../style/global.css';
import '../../style/technologies.css';

const mapStateToProps = (state) => {
  return {
    appState: state.appState
  }
};

const Technologies = (props) => {

  const frontend = [
    {name: 'React.js', url: 'https://reactjs.org/', icon: <InlineIcon icon={reactIcon} />},
    {name: 'Redux.js', url: 'https://redux.js.org/', icon: <InlineIcon icon={ReduxIcon}/>},
    {name: 'GraphQL', url: 'https://graphql.org/', icon: <InlineIcon icon={graphqlIcon}/>},
    {name: 'Apollo-client', url: 'https://www.apollographql.com/docs/react/', icon: <InlineIcon icon={apollostackIcon}/>}
  ];
  const backend = [
    {name: 'Node.js', url: 'https://nodejs.org/en/', icon: <InlineIcon icon={logoNodejs}/>},
    {name: 'Express.js', url: 'https://expressjs.com/', icon: <InlineIcon icon={expressIcon}/>},
    {name: 'mongoose.js', url: 'https://mongoosejs.com/', icon: ''},
    {name: 'JWT', url: 'https://jwt.io/', icon: ''},
    {name: 'bcrypt', url: 'https://github.com/kelektiv/node.bcrypt.js', icon: ''},
    {name: 'GraphQL', url: 'https://graphql.org/', icon: <InlineIcon icon={graphqlIcon}/>},
    {name: 'Apollo-server', url: 'https://www.apollographql.com/docs/apollo-server/', icon: <InlineIcon icon={apollostackIcon}/>}
  ];
  const data = [
    {name: 'MongoDB - Atlas', url: 'https://www.mongodb.com/cloud/atlas', icon: <InlineIcon icon={mongodbIcon}/>},
    {name: 'HSL API', url: 'https://digitransit.fi/en/developers/apis/1-routing-api/', icon: ''}
  ];
  const testing = [
    {name: 'Jest', url: 'https://jestjs.io/', icon: <InlineIcon icon={jestIcon}/>},
    {name: 'EasyGraphQL', url: 'https://easygraphql.com/', icon: ''},
    {name: 'cypress', url: 'https://www.cypress.io/', icon: <InlineIcon icon={cypressIcon}/>},
  ];
  const tools = [
    {name: 'npm', url: 'https://www.npmjs.com/', icon: <InlineIcon icon={npmIcon}/>},
    {name: 'git', url: 'https://git-scm.com/', icon: <InlineIcon icon={gitIcon}/>},
    {name: 'GitHub', url: 'https://github.com/', icon: <InlineIcon icon={githubIcon}/>},
    {name: 'WebStorm', url: 'https://www.jetbrains.com/webstorm/', icon: <InlineIcon icon={webstormIcon}/>},
    {name: 'Chrome', url: 'https://www.google.com/intl/en_en/chrome/', icon: <InlineIcon icon={googlechromeIcon}/>},
    {name: 'Postman', url: 'https://www.getpostman.com/', icon: <InlineIcon icon={postmanIcon}/>}
  ];

  const Repository = () => {
    const repo = props.appState.repository;
    return <a className={classProvider(props.appState.theme, 'technologyElement')} href={repo.url}>{repo.icon} {repo.name}</a>
  };
  const Front = () => {
    return frontend.map((f) => {
      return <a className={classProvider(props.appState.theme, 'technologyElement')} href={f.url}>{f.icon} {f.name}</a>
    });
  };
  const Back = () => {
    return backend.map((b) => {
      return <a className={classProvider(props.appState.theme, 'technologyElement')} href={b.url}>{b.icon} {b.name}</a>
    });
  };
  const Data = () => {
    return data.map((d) => {
      return <a className={classProvider(props.appState.theme, 'technologyElement')} href={d.url}>{d.icon} {d.name}</a>
    });
  };
  const Testing = () => {
    return testing.map((t) => {
      return <a className={classProvider(props.appState.theme, 'technologyElement')} href={t.url}>{t.icon} {t.name}</a>
    });
  };
  const DevTools = () => {
    return tools.map((dt) => {
      return <a className={classProvider(props.appState.theme, 'technologyElement')} href={dt.url}>{dt.icon} {dt.name}</a>
    });
  };
  return(
    <div className='app'>
      <div className='appContainer'>
        <div className='appElements'>
          <h4 className={classProvider(props.appState.theme, 'heading')}>Repository:</h4>
        </div>
        <Repository/>
        <div className='appElements'>
          <h4 className={classProvider(props.appState.theme, 'heading')}>Used technology stack:</h4>
        </div>
        <div className='appElements'>
          <h4 className={classProvider(props.appState.theme, 'heading')}>Frontend</h4>
        </div>
        <>
          <Front/>
        </>
        <div className='appElements'>
          <h4 className={classProvider(props.appState.theme, 'heading')}>Backend</h4>
        </div>
        <Back/>
        <div className='appElements'>
          <h4 className={classProvider(props.appState.theme, 'heading')}>Database & API</h4>
        </div>
        <Data/>
        <div className='appElements'>
          <h4 className={classProvider(props.appState.theme, 'heading')}>Testing</h4>
        </div>
        <Testing/>
        <div className='appElements'>
          <h4 className={classProvider(props.appState.theme, 'heading')}>Development tools</h4>
        </div>
        <DevTools/>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(Technologies);