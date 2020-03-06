// RFF demo project
// LandingPage.js
// React component that renders front page for the webapp

import React from 'react';
import {connect} from 'react-redux';

import classProvider from '../core/tools/classProvider';
import '../core/style/global.css';

import {InlineIcon} from '@iconify/react';
import {useQuery} from '@apollo/react-hooks';

import {NEWS} from '../core/graphql/rff/queries/q_news';

const mapStateToProps = (state) => {
  return {
    appState: state.appState,
    loginState: state.loginState
  };
};

const LandingPage = (props) => {
  const {data, error, loading} = useQuery(NEWS);

  const Error = () => {
    return <>
      <h4 className={classProvider(props.appState.theme, 'description')}>News:</h4>
      <p className={classProvider(props.appState.theme, 'tileError')}>Error occurred</p>
    </>;
  };
  const Loading = () => {
    return <>
      <h4 className={classProvider(props.appState.theme, 'description')}>News:</h4>
      <p className={classProvider(props.appState.theme, 'tileLoading')}>loading . . .</p>
    </>;
  };

  const News = () => {
    const news = data.news;
    return news.length > 0
      ? <>
        <h4 className={classProvider(props.appState.theme, 'description')}>News:</h4>
        <ul>
          {news.map((n) => {
            return <li key={n.id} className={classProvider(props.appState.theme, 'news')}>{n.news}</li>;
          })}</ul>
      </> : <>
        <h4 className={classProvider(props.appState.theme, 'description')}>News:</h4>
        <p className={classProvider(props.appState.theme, 'news')}>no news</p>
      </>;
  };

  const Locked = () => {
    return (
      <div className='commonElements'>
        <p className={classProvider(props.appState.theme, 'description')}>
          Some applications are available only for registered and logged users.</p>
        <p className={classProvider(props.appState.theme, 'description')}>
          If you want to use these advanced features, please log in.</p>
      </div>
    );
  };

  const Unlocked = () => {
    return (
      <div className='commonElements'>
        <p className={classProvider(props.appState.theme, 'description')}>
          Some applications are available only for registered and logged users.</p>
        <p className={classProvider(props.appState.theme, 'description')}>
          You have logged in and therefore eligible to use advanced features.</p>
      </div>
    );
  };

  const AdditionalInfo = () => {
    return (
      <div className='commonElements'>
        {loading && <Loading/>}
        {error && <Error/>}
        {data && <News/>}
      </div>
    );
  };

  return (
    <div className='app'>
      <div className='container'>
        {props.loginState.user === null
          ? <Locked/>
          : <Unlocked/>
        }
        <AdditionalInfo/>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(LandingPage);