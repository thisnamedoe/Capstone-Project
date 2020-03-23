import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import SingleItemEdit from '../components/SingleItemEdit';
import { updateRestaurantItem } from '../../src/actions/index';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Actions } from 'react-native-router-flux';

email = 'admin1';
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
        const { food, addItem, editItemLoading, editItemError } = this.props;
        return (
            <SingleItemEdit
                data={food}
                editItemLoading={editItemLoading}
                editItemError={editItemError}
                onSave={() => {
                    const { name, price, image } = this.state;
                    this.props.updateRestaurantItem(food.id, email, name, price, name);
                    Actions.restaurantItems();
                }}
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

export default connect(initMapStateToProps, initMapDispatchToProps)(ItemScreen);
