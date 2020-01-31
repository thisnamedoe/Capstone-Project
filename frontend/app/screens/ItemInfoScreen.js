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
import SignOutButton from '../components/RightHeaderButtons';

const restaurantName = 'SE 4450 Restaurant'

const cuisines = [
  {
    id: '1',
    name: 'Noodles',
    image: 'chinese',
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
]

class ItemInfoScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: <SignOutButton />,
  });

  componentDidMount() {
  }

  renderFoodList = () => {
    return (<FlatList
      data={cuisines}
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
    const { data } = this.props;
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
            {/* <SecondaryText align="left" size={16}>{details}</SecondaryText> */}
          </View>
          {this.renderFoodList(data)}
        </ScrollView>
      </AppBase>
    );
  }
}

ItemInfoScreen.defaultProps = {};

ItemInfoScreen.propTypes = {
  updateCartItems: PropTypes.func.isRequired,
};

function initMapStateToProps(state) {
  return {
  };
}

function initMapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateCartItems,
  }, dispatch);
}

export default connect(initMapStateToProps, initMapDispatchToProps)(ItemInfoScreen);
