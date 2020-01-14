
import React from 'react';
import {handleError, handleInfo} from '../store/reducers/AppReducer';

import {LOGIN} from '../graphql/rff/mutations/m_login';

import {connect} from 'react-redux';
import {useApolloClient, useMutation} from '@apollo/react-hooks';

const mapStateToProps = (state) => {
  return {
    loginState: state.loginState
  };
};

const mapDispatchToProps = {};

const Controller = (props) => {
  const client = useApolloClient();
  const [login] = useMutation(LOGIN, {
    refetchQueries: [{}]
  });

  const handleLogin = () => {
    try {
      login({
        variables: {
          username: props.loginState.username,
          password: props.loginState.password
        }
      }).then(async (result) => {
        const loginToken = result.data.login.value.toString();
        localStorage.setItem('rffUserToken', loginToken);
        await handleInfo('logged in successfully');
        return true;
      });
    } catch (e) {
      handleError(e);
      return false;
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Controller);