import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from '../Screens/Splash';
import Login from '../Screens/Login';
import Signup from '../Screens/Signup';
import BottomTabs from './BottomTabs';
import SingleCategory from '../Screens/SingleCategory';
import ProductDetails from '../Screens/ProductDetails';
import CheckoutScreen from '../Screens/CheckoutScreen';
const SRouter = () => {
  const Stack = createStackNavigator();
  const screenOptions = {headerShown: false};
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
      <Stack.Screen name="SingleCategory" component={SingleCategory} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
    </Stack.Navigator>
  );
};

export default SRouter;
