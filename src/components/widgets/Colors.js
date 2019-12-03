import React from 'react';
import {connect} from 'react-redux';

import classProvider from '../../tools/classProvider';
import '../../style/global.css';
import '../../style/colors.css';

const mapStateToProps = (state) => {
  return {
    appState: state.appState
  };
};

const Colors = (props) => {
  return(
    <div className='app'>
      <div className='appContainer'>
        <div className='appElements'>
          <h4 className={classProvider(props.appState.theme, 'heading')}>Site color palette:</h4>
        </div>
        <div className='appElements'>
          <div className='peru'/>
          <div className='gainsboro'/>
          <div className='darkslategrey'/>
          <div className='yellowgreen'/>
          <div className='reactblue'/>
          <div className='slateblue'/>
          <div className='deeppink'/>
        </div>
        <div className='appElements'>
          <div className='seagreen'/>
          <div className='googleblue'/>
          <div className='googlered'/>
          <div className='googleyellow'/>
          <div className='googlegreen'/>
          <div className='amazonorange'/>
          <div className='heroku'/>
        </div>
        <div className='appElements'>
          <div className='bus'/>
          <div className='citybike'/>
          <div className='tram'/>
          <div className='train'/>
          <div className='metro'/>
          <div className='jokerilightrail'/>
          <div className='ferry'/>
        </div>
        <div className='appElements'>
          <div className='hslpink'/>
          <div className='hslpinklight'/>
          <div className='hslgreen'/>
          <div className='hslgreenlight'/>
          <div className='hslwarning'/>
          <div className='hslhighlight'/>
          <div className='ferrylight'/>
        </div>
        <div className='appElements'>
          <div className='hslblue'/>
          <div className='digitransit'/>
          <div className='dgray'/>
          <div className='gray'/>
          <div className='lgray'/>
          <div className='vlgray'/>
          <div className='jbamber'/>
        </div>
        <div className='appElements'>
          <div className='jbsiena'/>
          <div className='jbcrimson'/>
          <div className='jbcarmine'/>
          <div className='jbfuchsia'/>
          <div className='jbmauve'/>
          <div className='jblilac'/>
          <div className='jbpurple'/>
        </div>
        <div className='appElements'>
          <div className='jbskyblue'/>
          <div className='jbgreen'/>
          <div className='jblemon'/>
          <div className='slackblue'/>
          <div className='slackgreen'/>
          <div className='slackyellow'/>
          <div className='slackred'/>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(Colors);