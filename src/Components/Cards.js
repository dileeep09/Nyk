import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {DeviceHeight, DeviceWidth} from '../Utilities/Config';
import TextComponent from './TextComponent';
import {COLORS} from '../Utilities/AppColors';
import {useNavigation} from '@react-navigation/native';
const Cards = ({item, onPress}) => {
  const navigation=useNavigation()
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('ProductDetails', {product: item})}
      activeOpacity={1}>
      <Image
        source={{uri: item?.image_link}}
        style={styles.imageStyle}
        resizeMode="cover"
      />
      <TextComponent
        text={item?.name}
        textAlign={'flex-start'}
        NOL={2}
        fontWeight={'500'}
      />
      <TextComponent
        text={`$${item?.price ?? '0.00'}`}
        textAlign={'flex-start'}
        NOL={2}
        fontWeight={'500'}
      />
    </TouchableOpacity>
  );
};

export default Cards;

const styles = StyleSheet.create({
  container: {
    height: DeviceHeight / 3.8,
    width: DeviceWidth / 2.5,
  },
  imageStyle: {
    height: '70%',
    width: '100%',
    borderWidth: 4,
    borderRadius: 8,
    borderColor: COLORS.WHITE,
    elevation: 5,
  },
});
