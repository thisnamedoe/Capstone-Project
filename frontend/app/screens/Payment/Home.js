/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import styled from 'styled-components';
import Stripe from 'react-native-stripe-api';
import { CreditCardInput } from 'react-native-credit-card-input';
import { Dimensions, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import RoundButton from '../../base_components/RoundButton';
import AppBase from '../../base_components/AppBase';
import BR from '../../base_components/BR';
import Colors from '../../../src/constants/colors';
import PrimaryText from '../../base_components/PrimaryText';
import { doCancelOrder } from '../../../src/actions';

const windowWidth = Dimensions.get('window').width - 18;

const Heading = styled.Text`
  font-size: 14px;
  color: #9DA8BA;
  text-align: center;
  margin-bottom: 10px;
`;

const SubHeading = styled.Text`
  font-size: 16px;
  color: #213052;
  text-align: center;
`;

const Section = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  padding: 15px 20px;
  background: #FFF;
`;
const SectionItem = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;  
`;

class PaymentHome extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cardData: {},
      validData: false,
      loadingPayment: false,
    };
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.createdOrder === null) {
      Actions.pop();
    }
  }


  _onChange = (form) => {
    console.log(form);
    this.setState(cardData, form);
    this.setState(validData,form.valid);
  };

  doPayment = async () => {
    this.setState({
      loadingPayment: true,
    });

    const { totalAmount } = this.props;

    Actions.paymentSuccess({
      totalAmount,
    });
  };

  handleCancelOrder = () => {
    this.props.doCancelOrder();
  };

  render() {
    const { totalAmount } = this.props;
    return (
      <AppBase>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : ''}
        >
          <ScrollView
            bounces={false}
          >
            <BR size={10} />
            <Section>
              <SectionItem>
                <Heading>Order ID</Heading>
                <SubHeading>1</SubHeading>
              </SectionItem>
            </Section>

            <Section>
              <SectionItem>
                <Heading>Restaurant</Heading>
                <SubHeading>SE 4450</SubHeading>
              </SectionItem>
              <SectionItem>
                <Heading>Price</Heading>
                <SubHeading>${totalAmount.toFixed(2)}</SubHeading>
              </SectionItem>
            </Section>

            <Section style={{
              elevation: 2,
              borderBottomWidth: 2,
              borderBottomColor: '#eee',
            }}
            >
              <SectionItem>
                <Heading>Date</Heading>
                <SubHeading>{new Date().toDateString()}</SubHeading>
              </SectionItem>
            </Section>

            <View style={{
              marginTop: 20,
            }}
            >
              <CreditCardInput
                requiresCVC
                cardScale={1}
                onChange={debounce(this._onChange, 500)}
              />
            </View>

            <RoundButton
              loading={this.state.loadingPayment}
              title="Pay Bill"
              buttonColor={Colors.green}
              onPress={() => this.doPayment()}
              disabled={!this.state.validData}
              baseStyle={{
                marginTop: 30,
                marginBottom: Platform.OS === 'ios' ? 100 : 20,
              }}
            />

            <RoundButton
              title="Split Bill"
              onPress={() => this.handleCancelOrder()}
              buttonColor={Colors.blue}
              baseStyle={{
                marginTop: 30,
                marginBottom: Platform.OS === 'ios' ? 100 : 20,
              }}
            />

          </ScrollView>
        </KeyboardAvoidingView>
      </AppBase>
    );
  }
}

PaymentHome.defaultProps = {
  createdOrder: null,
};

PaymentHome.propTypes = {
  totalAmount: PropTypes.number.isRequired,
  doCancelOrder: PropTypes.func.isRequired,
  createdOrder: PropTypes.object,
};

function initMapStateToProps(state) {
  return {
    createdOrder: state.orders.createdOrder,
  };
}

function initMapDispatchToProps(dipatch) {
  return bindActionCreators({
    doCancelOrder,
  }, dipatch);
}


export default connect(initMapStateToProps, initMapDispatchToProps)(PaymentHome);
