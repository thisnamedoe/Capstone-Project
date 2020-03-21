/* eslint-disable react/prop-types */
import React from 'react';
import { Drawer, Router, Scene } from 'react-native-router-flux';

import LoginScreen from './app/screens/LoginScreen';
import Colors from './src/constants/colors';
import SignupScreen from './app/screens/SignupScreen';
import ItemInfoScreen from './app/screens/ItemInfoScreen';
import CartScreen from './app/screens/CartScreen';
import PaymentHome from './app/screens/Payment/Home';
import PaymentComplete from './app/screens/Payment/Complete';
import PaymentFailed from './app/screens/Payment/Failed';
import SideDrawer from './app/screens/SideDrawer';
import DrawerImage from './app/components/DrawerImage';
import OrdersList from './app/screens/OrderListScreen';
import RestaurantItems from './app/screens/RestaurantItems';
import RestaurantSideDrawer from './app/screens/RestaurantSideDrawer';
import ItemEdit from './app/screens/ItemScreen';
import ItemAdd from './app/screens/ItemAdd';
import QRCodeScreen from './app/screens/QRCodeScreen';

const AppRouter = () => (
    <Router>

        <Scene key="root" title="">
            <Scene
                key="loginScreen"
                component={LoginScreen}
                initial
                hideNavBar
            />

            <Scene
                key="signupScreen"
                component={SignupScreen}
            />

            <Drawer
                key="restaurantDrawer"
                hideNavBar
                contentComponent={RestaurantSideDrawer}
                drawerIcon={<DrawerImage />}
                panHandlers={null}
                drawerWidth={300}
            >
                <Scene>
                    <Scene
                        key="restaurantItems"
                        component={RestaurantItems}
                        title="Restaurant App"
                        titleStyle={{
                            color: Colors.primaryColor,
                        }}
                    />
                    <Scene
                        key="showAllOrders"
                        component={OrdersList}
                        title="Restaurant App"
                    />
                    <Scene
                        key="editItem"
                        component={ItemEdit}
                        title="Restaurant App"
                    />
                    <Scene
                        key="addItem"
                        component={ItemAdd}
                        title="Restaurant App"
                    />
                </Scene>
            </Drawer>

            <Drawer
                key="drawer"
                hideNavBar
                contentComponent={SideDrawer}
                drawerIcon={<DrawerImage />}
                panHandlers={null}
                drawerWidth={300}
            >
                <Scene>
                    {/* <Scene
                        key="qrCode"
                        component={QRCodeScreen}
                        title="Scan Code"
                    /> */}
                    <Scene
                        key="itemScreen"
                        component={ItemInfoScreen}
                        title="Restaurant App"
                        titleStyle={{
                            color: Colors.primaryColor,
                        }}
                    />
                    <Scene
                        key="cartScreen"
                        component={CartScreen}
                        navigationBarStyle={{
                            backgroundColor: '#fff',
                            elevation: 2,
                            borderBottomWidth: 1,
                            borderBottomColor: '#eee',
                        }}
                        titleStyle={{
                            color: Colors.primaryColor,
                        }}
                        title="Cart"
                    />

                    <Scene
                        drawer={false}
                        key="paymentHome"
                        component={PaymentHome}
                    />

                    <Scene
                        key="paymentSuccess"
                        component={PaymentComplete}
                        title="Restaurant App"
                    />

                    <Scene
                        key="paymentFailed"
                        component={PaymentFailed}
                        title="Restaurant App"
                    />
                    <Scene
                        key="showAllOrders"
                        component={OrdersList}
                        title="My Orders"
                    />

                </Scene>
            </Drawer>
        </Scene>
    </Router>
);

export default AppRouter;
