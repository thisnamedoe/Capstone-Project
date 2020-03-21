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
import FoodItem from '../components/FoodItem';
import ViewRow from '../base_components/ViewRow';
import BR from '../base_components/BR';
import { updateCartItems } from '../../src/actions/cart';
import { getRestaurantItems } from '../../src/actions/index';
import SignOutButton from '../components/RightHeaderButtons';

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
    name: 'Cupcake',
    image: 'desserts',
    price: '3.99',
  },
  {
    id: '4',
    name: 'Martini',
    image: 'beverages',
    price: '5.99',
  },
  {
    id: '5',
    name: 'Ice Cream',
    image: 'ice-creams',
    price: '4.99',
  },
  {
    id: '6',
    name: 'Taco',
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

class ItemInfoScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: <SignOutButton />,
  });

  constructor(props) {
    super(props);
  }

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
          onPress={() => this.props.updateCartItems(item, 1)}
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
          <View
            style={{
              backgroundColor: '#fff',
              padding: 15,
            }}
          >
            <PrimaryText align="left" size={24}>{restaurantName}</PrimaryText>
            <BR size={5} />
          </View>
          {this.renderFoodList(restaurantItems)}
        </ScrollView>
      </AppBase>
    );
  }
}

ItemInfoScreen.defaultProps = {};

ItemInfoScreen.propTypes = {
  updateCartItems: PropTypes.func.isRequired,
  getRestaurantItems: PropTypes.func.isRequired,
};

function initMapStateToProps(state) {
  return {
    restaurantItems: state.restaurant.restaurantItems,
  };
}

function initMapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateCartItems,
    getRestaurantItems,
  }, dispatch);
}

export default connect(initMapStateToProps, initMapDispatchToProps)(ItemInfoScreen);
