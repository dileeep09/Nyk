import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {DeviceWidth} from '../Utilities/Config';
import {COLORS} from '../Utilities/AppColors';

const CustomButton = ({
  buttonText,
  leftIcon,
  rightIcon,
  buttonStyles,
  textStyles,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[styles.buttonStyle, {...buttonStyles}]}
      onPress={onPress}>
      <Text style={[styles.textStyle, {...textStyles}]}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
const styles = StyleSheet.create({
  buttonStyle: {
    width: DeviceWidth * 0.9,
    borderWidth: 1.5,
    borderColor: COLORS.BLACK,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 6,
    borderColor: COLORS.APP_PRIMARY_COLOR,
    marginVertical: 5,
  },
  textStyle: {color: COLORS.APP_PRIMARY_COLOR, fontSize: 17, fontWeight: '400'},
});
