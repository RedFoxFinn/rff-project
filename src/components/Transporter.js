import React from 'react';
import {connect} from 'react-redux';

import classProvider from '../core/tools/classProvider';
import '../core/style/global.css';
import '../core/style/transporter.css';
import HslHrtIcon from './icons/hsl/HslHrtIcon';
import {useApolloClient} from '@apollo/react-hooks';

const mapStateToProps = (state) => {
  return {
    theme: state.appState.theme,
    user: state.loginState.user
  };
};

const mapDispatchToProps = {};

const Transporter = (props) => {
  const client = useApolloClient();
  return(
    <div className='app'>
      <div className='container'>
        <h5 className={classProvider(props.theme, 'heading')}>Tracked stops:</h5>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Transporter);