/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';

import { cleanCart } from '../../src/actions/cart';
import { authLogin } from '../../src/actions/index'
import LoginComponent from '../components/Login';

class LoginScreen extends Component {
  displayName = 'LoginScreen';

  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      isRestaurant: null,
    };
  }

  componentDidMount() {
    const { loginMessage } = this.props;
    if (loginMessage !== null) {
      Actions.reset('drawer');
    }

  }

  async componentWillReceiveProps(nextProps, nextContext) {
    await this.handleRedirect(nextProps.loginMessage);
  }


  handleLoginSubmit = () => {
    const { email, password } = this.state;
    this.props.authLogin(email, password);
    this.props.cleanCart();
  };

  handleEmailChange = (email) => {
    this.setState({
      email,
    });
  };

  handlePasswordChange = (password) => {
    this.setState({
      password,
    });
  };

  handleRedirect = (loginMessage) => {
    if (loginMessage) {
      if (loginMessage.isRestaurant) {
        Actions.reset('restaurantDrawer');
      }
      else {
        try {
          Actions.reset('drawer');
        } catch (e) {
        }
      }
    }
  };

  render() {
    const { loginLoading, loginMessage } = this.props;
    if (loginMessage) {
      return null;
    }

    let { loginError } = this.props;

    const { email, password } = this.state;

    // eslint-disable-next-line react/prop-types
    loginError = loginError || this.props.navigation.state.params.loginError;

    const disableLogin = (!email || email.length === 0 || !password || password.length === 0);

    return (
      <LoginComponent
        loading={loginLoading}
        loginError={loginError}
        disableLogin={disableLogin}
        onLoginSubmit={this.handleLoginSubmit}
        onEmailChange={this.handleEmailChange}
        onPasswordChange={this.handlePasswordChange}
      />);
  }
}

LoginScreen.defaultProps = {
  loginError: null,
  loginMessage: null,
};

LoginScreen.propTypes = {
  loginLoading: PropTypes.bool.isRequired,
  loginError: PropTypes.object,
  loginMessage: PropTypes.object,
  cleanCart: PropTypes.func.isRequired,
};

function initMapStateToProps(state) {
  return {
    loginError: state.auth.loginError,
    loginLoading: state.auth.loginLoading,
    loginMessage: state.auth.loginMessage,
  };
}

function initMapDispatchToProps(dispatch) {
  return bindActionCreators({
    cleanCart,
    authLogin,
  }, dispatch);
}

// export default LoginScreen;
export default connect(initMapStateToProps, initMapDispatchToProps)(LoginScreen);
