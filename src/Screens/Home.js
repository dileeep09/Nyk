import {SafeAreaView, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Logo from '../Components/Logo';
import {COLORS} from '../Utilities/AppColors';
import TextComponent from '../Components/TextComponent';
import {DeviceWidth} from '../Utilities/Config';
import {useSelector} from 'react-redux';
import Categories from '../Components/Categories';
import FeaturedProducts from '../Components/FeaturedProducts';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import the Icon library
const Home = () => {
  const navigation = useNavigation();
  const getUserData = useSelector(state => state?.getUserData);
  const userName =
    Object.keys(getUserData).length > 0
      ? getUserData?.name?.charAt(0).toUpperCase() + getUserData?.name?.slice(1)
      : 'Guest';

  // Function to navigate to the Search Screen
  const handleSearchNavigation = () => {
    navigation.navigate('Search');
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Logo />
        {/* Search Icon */}
        <TouchableOpacity onPress={handleSearchNavigation} style={styles.searchIcon}>
          <Icon name="search" size={24} color={COLORS.DARK_GRAY} />
        </TouchableOpacity>
      </View>
      <View style={styles.wrapper}>
        <TextComponent
          text={`Hello, ${userName}!`}
          type={'Heading'}
          textAlign={'flex-start'}
          styles={styles.categoryText}
        />
      </View>
      <Categories navigation={navigation} />
      <FeaturedProducts />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: COLORS.WHITE,
  },
  searchIcon: {
    padding: 8, 
  },
  wrapper: {
    width: DeviceWidth * 0.9,
    alignSelf: 'center',
  },
  categoryText: {
    marginVertical: 20,
  },
});
