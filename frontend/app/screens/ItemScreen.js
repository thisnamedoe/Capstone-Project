import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import SingleItemEdit from '../components/SingleItemEdit';
import { updateRestaurantItem } from '../../src/actions/index';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Actions } from 'react-native-router-flux';

class ItemScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            price: null,
            image: null,
        };
    }

    componentWillMount() {
    }
    onSave = () => {
        console.log('here');
    }
    onPriceChange = () => {
        this.setState({
            price,
        });
    }
    onItemNameChange = () => {
        this.setState({
            name,
        });
    }
    render() {
        const { food } = this.props;
        return (
            <SingleItemEdit
                data={food}
                onSave={this.onSave}
                onPriceChange={this.onPriceChange}
                onitemNameChange={this.onItemNameChange}
            />
        );
    }
}

ItemScreen.propTypes = {
    updateRestaurantItem: PropTypes.func.isRequired,
};

function initMapStateToProps(state) {
    return {
    };
}

function initMapDispatchToProps(dispatch) {
    return bindActionCreators({
        updateRestaurantItem,
    }, dispatch);
}

export default ItemScreen
