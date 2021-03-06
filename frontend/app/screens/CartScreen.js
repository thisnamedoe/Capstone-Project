/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { FlatList, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';

import Item from '../components/Checkout/Item';
import AppBase from '../base_components/AppBase';
import BillReceipt from '../components/Checkout/BillReceipt';
import BR from '../base_components/BR';
import ViewRow from '../base_components/ViewRow';
import PrimaryText from '../base_components/PrimaryText';
import { deleteCartItem, fetchCartItems, updateCartItemQty } from '../../src/actions/cart';
import { createOrder } from '../../src/actions/index';
import { getTableNumber } from '../../src/actions/table';

const FooterContainer = styled.View`
  height: 10%;
  width: 100%;
  background-color: white;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const AmountContainer = styled.View`
  flex: 0.5;
  align-items: center;
  height: 100%;
  background-color: #d9d9d9;
  justify-content: center;
`;

const PayButton = styled.TouchableOpacity`
  height: 100%;
  background-color: green;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const FooterText = styled(PrimaryText)`
  font-weight: bold;
  color: #eee;
  font-size: 16px;
  width: 100%;
`;


class CartScreen extends Component {
  componentDidMount() {
    this.props.fetchCartItems();
    this.props.getTableNumber();
  }

  handleItemValueChange = (item, qty) => {
    if (qty === 0) {
      this.props.deleteCartItem(item.id);
    } else {
      this.props.updateCartItemQty(item.id, qty);
    }
  };

  handlePayment = (totalAmount) => {
    const { cartData, tableNumber } = this.props;

    if (cartData.length > 0) {
      const postData = cartData.map(item => ({
        id: item.id,
        quantity: item.qty,
        price: item.price,
      }));

      this.props.createOrder(tableNumber, cartData, totalAmount);
      Actions.paymentHome({
        totalAmount: parseFloat(totalAmount),
      });
    }
  };

  renderItem = ({ item }) => {
    return (<Item
      key={item.id}
      name={item.name}
      price={`$${item.price * item.qty}`}
      qty={item.qty}
      onChange={qty => this.handleItemValueChange(item, qty)}
    />);
  };

  renderCartItems = (cartData) => {
    if (cartData.length > 0) {
      return (
        <FlatList
          style={{
            elevation: 2,
            borderWidth: 1,
            borderColor: '#fcfcfc',
          }}
          data={cartData}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
        />
      );
    }

    return (
      <ViewRow>
        <PrimaryText>
          Your Cart is empty.
        </PrimaryText>
      </ViewRow>
    );
  };

  renderBillReceipt = (billInfo) => {
    const { cartData } = this.props;

    if (cartData.length > 0) {
      return (
        <BillReceipt
          style={{
            borderTopWidth: 4,
            borderTopColor: '#eee',
          }}
          billInfo={billInfo}
        />
      );
    }
    return null;
  };

  renderFooter = (totalAmount) => {
    const { cartData } = this.props;

    if (cartData.length > 0) {
      return (
        <FooterContainer>
          <PayButton
            onPress={() => this.handlePayment(totalAmount)}
          >
            <FooterText>
              Proceed To Pay
            </FooterText>
          </PayButton>
        </FooterContainer>
      );
    }
    return null;
  };

  render() {
    const { cartData } = this.props;
    let totalBill = parseFloat(cartData.reduce(
      (total, item) => total + (item.price * item.qty),
      0,
    )).toFixed(2);

    const taxPercent = 13;
    const tipPercent = 15;

    const tax = parseFloat(totalBill * (taxPercent / 100)).toFixed(2);
    const tipTotal = parseFloat(totalBill * (tipPercent / 100)).toFixed(2);
    let overallTotal = 0;
    overallTotal = parseFloat(totalBill) + parseFloat(tax) + parseFloat(tipTotal);
    const billInfo = [
      {
        name: 'Items Total',
        total: totalBill,
      },
      {
        name: `Taxes (${taxPercent}%)`,
        total: tax,
      },
      {
        name: `Tip (${tipPercent}%)`,
        total: tipTotal,
      },
    ];


    return (
      <AppBase
        style={{
          alignItems: 'stretch',
        }}
      >
        <ScrollView>
          <BR size={10} />
          {this.renderCartItems(cartData)}
          <BR />
          {this.renderBillReceipt(billInfo)}
          <BR />
        </ScrollView>
        {this.renderFooter(overallTotal)}
      </AppBase>
    );
  }
}

CartScreen.defaultProps = {
  createdOrder: null,
  tableNumber: null,
};

CartScreen.propTypes = {
  cartData: PropTypes.array.isRequired,
  deleteCartItem: PropTypes.func.isRequired,
  fetchCartItems: PropTypes.func.isRequired,
  updateCartItemQty: PropTypes.func.isRequired,
  getTableNumber: PropTypes.func.isRequired,
  createOrder: PropTypes.func.isRequired,
  createdOrder: PropTypes.object,
};


function initMapStateToProps(state) {
  return {
    cartData: state.cart.cartData,
    createdOrder: state.orders.createdOrder,
    tableNumber: state.table.tableNumber,
  };
}

function initMapDispatchToProps(dipatch) {
  return bindActionCreators({
    deleteCartItem,
    fetchCartItems,
    updateCartItemQty,
    createOrder,
    getTableNumber,
  }, dipatch);
}

export default connect(initMapStateToProps, initMapDispatchToProps)(CartScreen);