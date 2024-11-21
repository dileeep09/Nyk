import {SafeAreaView, StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import Logo from '../Components/Logo';
import {COLORS} from '../Utilities/AppColors';
import TextComponent from '../Components/TextComponent';
import {DeviceWidth} from '../Utilities/Config';
import {useSelector} from 'react-redux';
import Categories from '../Components/Categories';
import {BASE_URL, callApi} from '../Utilities/ApiCall';
import FeaturedProducts from '../Components/FeaturedProducts';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  const getUserData = useSelector(state => state?.getUserData);
  const userName =
    Object.keys(getUserData).length > 0
      ? getUserData?.name?.charAt(0).toUpperCase() + getUserData?.name?.slice(1)
      : 'Guest';
  return (
    <SafeAreaView style={styles.container}>
      <Logo />
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
  scrollContent: {
    paddingBottom: 20, // To provide padding at the bottom of the ScrollView
  },
  wrapper: {
    width: DeviceWidth * 0.9,
    alignSelf: 'center',
  },
  categoryText: {
    marginVertical: 20, // Add margin between the name and categories text
  },
});
