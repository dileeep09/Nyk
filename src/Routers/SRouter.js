import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from '../Screens/Splash';
import Login from '../Screens/Login';
import Signup from '../Screens/Signup';
const SRouter = () => {
  const Stack = createStackNavigator();
  const screenOptions = {headerShown: false};
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
};

export default SRouter;
