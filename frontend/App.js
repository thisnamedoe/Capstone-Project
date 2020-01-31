import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './src/store/index';
import AppRouter from './router';
import LoadingView from './app/base_components/LoadingView';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<LoadingView />} persistor={persistor}>
          <AppRouter />
        </PersistGate>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('RestaurantApp', () => App);