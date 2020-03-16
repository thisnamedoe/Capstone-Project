import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import SingleItemEdit from '../components/SingleItemEdit';

class ItemScreen extends React.Component {
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
            <SingleItemEdit
                data={food}
                onSave={this.onSave}
                onPriceChange={this.onPriceChange}
                onitemNameChange={this.onItemNameChange}
            />
        );
    }
}

export default ItemScreen
