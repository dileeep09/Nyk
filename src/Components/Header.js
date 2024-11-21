import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import TextComponent from './TextComponent';
import {DeviceWidth} from '../Utilities/Config';
import {useNavigation} from '@react-navigation/native';
const Header = ({text, backButton}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {backButton && (
        <Icons
          name={'arrow-left'}
          size={28}
          style={{marginRight: 25}}
          onPress={() => navigation.goBack()}
        />
      )}
      <TextComponent type={'subHeading'} text={text} textAlign={'flex-start'} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: DeviceWidth * 0.9,
    alignSelf: 'center',
    paddingVertical: 15,
  },
});
