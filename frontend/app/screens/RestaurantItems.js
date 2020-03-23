/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { FlatList, Image, ScrollView, View } from 'react-native';

import AppBase from '../base_components/AppBase';
import PrimaryText from '../base_components/PrimaryText';
import SecondaryText from '../base_components/SecondaryText';
import Assets from '../../src/constants/assets';
import FoodItem from '../components/RestaurantFoodItem';
import ViewRow from '../base_components/ViewRow';
import BR from '../base_components/BR';
import SignOutButton from '../components/OnlyLogout';
import { getRestaurantItems, deleteRestaurantItems } from '../../src/actions/index';
import TextButton from '../base_components/TextButton';
import { Actions } from 'react-native-router-flux';
import styled from 'styled-components';

const restaurantName = 'SE 4450 Restaurant'
const email = 'admin1';

const cuisines = [
    {
        id: '1',
        name: 'Noodles',
        image: 'noodles',
        price: '10.99',
    },
    {
        id: '2',
        name: 'Pizza',
        image: 'pizza',
        price: '8.99',
    },
    {
        id: '3',
        name: 'desserts',
        image: 'desserts',
        price: '3.99',
    },
    {
        id: '4',
        name: 'beverages',
        image: 'beverages',
        price: '5.99',
    },
    {
        id: '5',
        name: 'ice-creams',
        image: 'ice-creams',
        price: '4.99',
    },
    {
        id: '6',
        name: 'taco',
        image: 'taco',
        price: '3.99',
    },
    {
        id: '7',
        name: 'Burger',
        image: 'burger',
        price: '5.99',
    },
    {
        id: '8',
        name: 'Salad',
        image: 'salad',
        price: '9.99',
    },
]
const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  background-color: white;
`;

const NameView = styled.View`
  flex-wrap: wrap;
  align-items: center;
  flex-direction: row;
  flex: 1;
`;

const RightSection = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const PriceText = styled.Text`
  text-align: right;
`;

class ItemInfoScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            delete_item: null
        }
    }

    static navigationOptions = ({ navigation }) => ({
        headerRight: <SignOutButton />,
    });

    componentDidMount() {
        this.props.getRestaurantItems(email);
    }

    renderFoodList = (items) => {
        return (<FlatList
            data={items.items}
            bounces={false}
            ListHeaderComponent={this.renderHeader}
            keyExtractor={item => item.id}
            renderItem={this.renderFoodItem}
        />);
    };


    renderHeader = () => (
        <ViewRow
            jc="space-between"
            style={{
                backgroundColor: '#fff',
                borderColor: '#eee',
                padding: 20,
                borderBottomWidth: 1,
                marginTop: 2,
            }}
        >
            <PrimaryText
                style={{
                    flex: 1,
                }}
                size={20}>
                Menu
      </PrimaryText>
        </ViewRow>
    );

    renderFoodItem = ({ item }) => {
        if (item) {
            return (
                <FoodItem
                    food={item}
                    editItem={() => Actions.editItem({ food: item })}
                    deleteItem={() => {
                        this.props.deleteRestaurantItems(email, item.id);
                        this.props.getRestaurantItems(email);
                        this.forceUpdate();
                    }}
                />
            );
        }
        return null;
    };

    render() {
        const { restaurantItems, restaurantLoading, restaurantError } = this.props;
        return (

            <AppBase
                style={{
                    justifyContent: 'flex-start',
                    alignItems: 'stretch',
                }}
            >
                <ScrollView>
                    <Image
                        source={Assets.Images.placeholderRestaurant}
                        style={{
                            width: '100%',
                            height: 200,
                        }}
                        resizeMode="cover"
                    />
                    <Container>
                        <NameView>
                            <PrimaryText size={24}>{restaurantName}</PrimaryText>
                        </NameView>
                        <RightSection>
                            <TextButton
                                onPress={() => Actions.addItem()}
                                title="Add Item"
                            />
                        </RightSection>
                    </Container>
                    {this.renderFoodList(restaurantItems)}
                </ScrollView>

            </AppBase>
        );
    }
}

ItemInfoScreen.defaultProps = {};

ItemInfoScreen.propTypes = {
    getRestaurantItems: PropTypes.func.isRequired,
    deleteRestaurantItems: PropTypes.func.isRequired,
};

function initMapStateToProps(state) {
    return {
        restaurantItems: state.restaurant.restaurantItems,
        deleteItem: state.restaurant.deleteItem,
        deleteItemLoading: state.restaurant.deleteItemLoading,
        deleteItemError: state.restaurant.deleteItemError,
    };
}

function initMapDispatchToProps(dispatch) {
    return bindActionCreators({
        getRestaurantItems,
        deleteRestaurantItems,
    }, dispatch);
}

export default connect(initMapStateToProps, initMapDispatchToProps)(ItemInfoScreen);
