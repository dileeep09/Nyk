import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../Utilities/AppColors';
import Home from '../Screens/Home';
import Profile from '../Screens/Profile';
import WishLists from '../Screens/WishLists';
import Offers from '../Screens/Offers';
import Cart from '../Screens/Cart';
import {IMAGES} from '../Utilities/Images';
const Tab = createBottomTabNavigator();
const BottomTabs = () => {
  const MyTabBar = ({state, descriptors, navigation}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 15,
          backgroundColor: COLORS.WHITE,
          borderTopWidth:1,
          borderTopColor:COLORS.LIGHT_GREY
        }}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const isFocused = state.index === index;
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };
          return (
            <TouchableOpacity
            activeOpacity={0.5}
              key={route.key}
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarButtonTestID}
              onPress={onPress}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={options.tabBarIcon}
                style={{height: 28, width: 28,marginBottom:4}}
                resizeMode="contain"
                tintColor={isFocused ? COLORS.APP_PRIMARY_COLOR : COLORS.GREY}
              />
              <Text
                style={{
                  color: isFocused ? COLORS.APP_PRIMARY_COLOR : COLORS.GREY,
                  fontWeight: '600',
                }}>
                {route?.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}
      tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{tabBarIcon: IMAGES.home}}
      />
      <Tab.Screen
        name="WishList"
        component={WishLists}
        options={{tabBarIcon: IMAGES.heart}}
      />
      <Tab.Screen
        name="Offers"
        component={Offers}
        options={{tabBarIcon: IMAGES.discount}}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{tabBarIcon: IMAGES.buy}}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{tabBarIcon: IMAGES.profile}}
      />
    </Tab.Navigator>
  );
};
export default BottomTabs;
