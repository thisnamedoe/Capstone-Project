import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import AddItem from '../components/AddItem';

class ItemAdd extends React.Component {
    componentWillMount() {
    }
    onSave = () => {
        console.log('here');
    }
    onPriceChange = () => {
        console.log('dede');
    }
    onItemNameChange = () => {
        console.log('keke');
    }
    render() {
        const { food } = this.props;
        return (
            <AddItem
                data={food}
                onSave={this.onSave}
                onPriceChange={this.onPriceChange}
                onitemNameChange={this.onItemNameChange}
            />
        );
    }
}

export default ItemAdd
