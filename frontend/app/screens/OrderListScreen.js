import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { fetchOrders } from '../../src/actions';
import colors from '../../src/constants/colors';

const myOrders = [
  {
    id: '5',
    totalCost: '28.14',
    items: [
      {
        id: 'noodles',
        price: '28.14'
      },
    ]
  }
]
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.lightGrey,
    padding: '1%',
    margin: '1%',
    elevation: 2,
    backgroundColor: colors.white,
  },
  divider: {
    margin: '1%',
  },
  heading: {
    color: colors.primaryColor,
    fontSize: 16,
  },
  item: {
    color: colors.blue,
    fontSize: 16,
  },
});

class OrdersList extends React.Component {
  // componentWillMount() {
  //   this.props.fetchOrders();
  // }
  mapItems = ({ item }) => (
    <View>
      <Text>{`Item Name: ${item.id}`}</Text>
      <Text>{`Price: $${item.price}`}</Text>
    </View>
  )
  renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.divider}>
        <Text style={styles.heading}>Order Id</Text>
        <Text>{item.id}</Text>
      </View>
      <View style={styles.divider}>
        <Text style={styles.heading}>Table Number</Text>
        <Text>1</Text>
      </View>
      <View style={styles.divider}>
        <Text style={styles.heading}>Total Price:</Text>
        <Text>{`$ ${item.totalCost}`}</Text>
      </View>
      <View style={styles.divider}>
        <Text style={styles.item}>Items ordered</Text>
        <FlatList
          data={item.items}
          renderItem={this.mapItems}
        />
      </View>
    </View>
  )
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={myOrders}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

// OrdersList.propTypes = {
//   ordersList: PropTypes.arrayOf(PropTypes.object).isRequired,
//   fetchOrders: PropTypes.func.isRequired,
// };

// const mapStateToProps = ({ orders }) => ({ ordersList: orders.ordersList });

export default OrdersList;
