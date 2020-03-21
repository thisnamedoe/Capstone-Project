import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import PrimaryText from '../base_components/PrimaryText';
import AppBase from '../base_components/AppBase';
import OrdersList from './OrderListScreen';

class SideDrawer extends Component {
    render() {
        return (
            <AppBase
                style={{
                    paddingTop: 40,
                }}
            >
                <TouchableOpacity onPress={Actions.showAllOrders}>
                <Text style={{ fontSize: 18 }}>Orders</Text>
                <OrdersList></OrdersList>
                </TouchableOpacity>
            </AppBase>
        );
    }
}

SideDrawer.propTypes = {};

export default SideDrawer;
