import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Actions } from 'react-native-router-flux';

import RoundButton from '../../base_components/RoundButton';
import AppBase from '../../base_components/AppBase';
import Assets from '../../../src/constants/assets';
import PrimaryText from '../../base_components/PrimaryText';

const Divider = styled.View`
  width: 80%;
  margin: 30px auto 10px auto;
  border-bottom-width: 1px;
  border-bottom-color: #E0E2E5;
`;

const SuccessText = styled.Text`
  color: #6EC015;
  font-size: 20px;
  text-align: center;
  margin: 20px auto;
`;

class PaymentComplete extends Component {

  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    headerLeft: null,
  };

  render() {
    const { totalAmount } = this.props;


    return (
      <AppBase
        style={{
          backgroundColor: '#ffffff',
          justifyContent: 'space-evenly',
        }}
      >
        <SuccessText>Payment Successful</SuccessText>
        <Image
          style={{
            width: 120,
            height: 120,
          }}
          resizeMode="contain"
          source={Assets.Images.paymentComplete}
        />

        <SuccessText>Your payment has been approved!</SuccessText>
        <Divider />
        {/* 
        <View
          style={{
            flexDirection: 'row',
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Currency>$</Currency>
          <PriceText>{totalAmount}</PriceText>
        </View> */}

        <RoundButton
          baseStyle={{
            alignSelf: 'flex-end',
          }}
          title="Back to Home"
          onPress={() => {
            Actions.reset('drawer');
          }}
        />
      </AppBase>
    );
  }
}

PaymentComplete.propTypes = {
  totalAmount: PropTypes.number.isRequired,
};

export default PaymentComplete;
