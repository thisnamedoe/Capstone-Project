/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import startCase from 'lodash/startCase';

import SignOutButton from '../components/RightHeaderButtons';
import AppBase from '../base_components/AppBase';
import CuisineGrid from '../components/CuisineGrid';
import PrimaryText from '../base_components/PrimaryText';
import { fetchCuisineTypes } from '../../src/actions/index';
import { fetchCartItems } from '../../src/actions/cart';


const cuisines = [
  {
    id: 1,
    name: 'Noodles',
    image: 'chinese',
    price: '10.99'
  },
  {
    id: 2,
    name: 'Pizza',
    image: 'pizza',
    price: '8.99'
  },
  {
    id: 3,
    name: 'Cupcake',
    image: 'desserts',
    price: '3.99'
  },
  {
    id: 4,
    name: 'Martini',
    image: 'beverages',
    price: '5.99'
  },
]

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <PrimaryText>Restaurant App</PrimaryText>,
    headerRight: <SignOutButton />,
  });

  constructor(props) {
    super(props);
    this.filterModalRef = React.createRef();
  }

  componentDidMount() {
  }

  openCuisineScreen = (value) => {
    Actions.itemScreen({
      data: value,
      title: startCase(value.name),
      backTitle: 'Back',
      rightTitle: 'Sign Out',
      onRight: () => this.handleSignOut(),
    });
  };

  render() {
    return (
      <AppBase style={{
        alignItems: 'stretch',
        backgroundColor: '#fff',
      }}
      >
        <ScrollView>
          <CuisineGrid
            data={cuisines}
            onPress={this.openCuisineScreen}
          />
        </ScrollView>
      </AppBase>
    );
  }
}

HomeScreen.defaultProps = {
  cuisineTypes: [],
};

HomeScreen.propTypes = {
  fetchCuisineTypes: PropTypes.func.isRequired,
  fetchCartItems: PropTypes.func.isRequired,
  cuisineTypes: PropTypes.array,
};

function initMapStateToProps(state) {
  return {
    cuisineTypes: state.food.cuisineTypes,
  };
}

function initMapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchCuisineTypes,
    fetchCartItems,
  }, dispatch);
}

export default connect(initMapStateToProps, initMapDispatchToProps)(HomeScreen);
