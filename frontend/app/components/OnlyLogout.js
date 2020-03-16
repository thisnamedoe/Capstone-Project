/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { authLogout } from '../../src/actions/index';
import ViewRow from '../base_components/ViewRow';
import RippleIcon from '../base_components/RippleIcon';
import PrimaryText from '../base_components/PrimaryText';

class RightHeaderButtons extends Component {
    componentWillReceiveProps(nexProps, nextContext) {
        const { loginMessage } = nexProps;
        if (!loginMessage || !loginMessage.token) {
            Actions.reset('loginScreen');
        }
    }


    handleSignOut = () => {
        this.props.authLogout();
        Actions.reset('loginScreen');
    };

    render() {
        return (
            <ViewRow
                jc="flex-end"
                ai="center"
            >

                <RippleIcon
                    dark
                    size={20
                    }
                    name="ios-log-out"
                    onPress={this.handleSignOut}
                />
            </ViewRow>
        );
    }
}

RightHeaderButtons.defaultProps = {
    loginMessage: {},
};

RightHeaderButtons.propTypes = {
    loginMessage: PropTypes.object,
    authLogout: PropTypes.func.isRequired,
};


function initMapStateToProps(state) {
    return {
        loginMessage: state.auth.loginMessage,
    };
}

function initMapDispatchToProps(dispatch) {
    return bindActionCreators({
        authLogout,
    }, dispatch);
}


export default connect(initMapStateToProps, initMapDispatchToProps)(RightHeaderButtons);
