/* eslint-disable react/prop-types */
import React from 'react';
import { Drawer, Router, Scene } from 'react-native-router-flux';

import LoginScreen from './app/screens/LoginScreen';
import HomeScreen from './app/screens/HomeScreen';
import Colors from './src/constants/colors';
import SignupScreen from './app/screens/SignupScreen';
import ItemInfoScreen from './app/screens/ItemInfoScreen';
import CuisineRestaurantsScreen from './app/screens/CuisineRestaurantsScreen';
import CartScreen from './app/screens/CartScreen';
import PaymentHome from './app/screens/Payment/Home';
import PaymentComplete from './app/screens/Payment/Complete';
import PaymentFailed from './app/screens/Payment/Failed';
import SideDrawer from './app/screens/SideDrawer';
import DrawerImage from './app/components/DrawerImage';
import OrdersList from './app/screens/OrderListScreen';


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
                key="drawer"
                hideNavBar
                contentComponent={SideDrawer}
                drawerIcon={<DrawerImage />}
                panHandlers={null}
                drawerWidth={300}
            >
                <Scene>
                    {/* <Scene
                        key="homeScreen"
                        component={HomeScreen}
                        title="Restaurant App"
                        titleStyle={{
                            color: Colors.primaryColor,
                        }}
                    /> */}

                    {/* <Scene
                        key="cuisineRestaurants"
                        component={CuisineRestaurantsScreen}
                        titleStyle={{
                            color: Colors.primaryColor,
                        }}
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
                    />

                    <Scene
                        key="paymentFailed"
                        component={PaymentFailed}
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
