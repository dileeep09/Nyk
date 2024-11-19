import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {IMAGES} from '../Utilities/Images';

const Logo = ({alignSelf}) => {
  return (
    <View style={{alignSelf:alignSelf??'flex-start'}}>
      <Image
        source={IMAGES.logo}
        style={styles.logoStyle}
        resizeMode="contain"
      />
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({
  logoStyle: {height: 80, width: 80, marginLeft: 18, marginTop: 16},
});
