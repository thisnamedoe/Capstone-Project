import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import AddItem from '../components/AddItem';
import { bindActionCreators } from 'redux';
import { addRestaurantItem } from '../../src/actions/index';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Actions } from 'react-native-router-flux';

email = 'admin1';
class ItemAdd extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            name: null,
            price: null,
            image: 'placeholderFood',
        };
    }

    componentWillMount() {
    }
    onSave = () => {
        const { name, price, image } = this.state;
        this.props.addRestaurantItem(email, name, price, name);
        Actions.restaurantItems();
    }
    onPriceChange = (price) => {
        this.setState({
            price,
        });
    }
    onItemNameChange = (name) => {
        this.setState({
            name,
        });
    }
    render() {
        const { food, addItem, addItemLoading, addItemError } = this.props;
        return (
            <AddItem
                data={food}
                addItem={addItem}
                addItemError={addItemError}
                onSave={this.onSave}
                onPriceChange={this.onPriceChange}
                onitemNameChange={this.onItemNameChange}
            />
        );
    }
}

ItemAdd.propTypes = {
    addRestaurantItem: PropTypes.func.isRequired,
};

function initMapStateToProps(state) {
    return {
    };
}

function initMapDispatchToProps(dispatch) {
    return bindActionCreators({
        addRestaurantItem,
    }, dispatch);
}

export default connect(initMapStateToProps, initMapDispatchToProps)(ItemAdd);
