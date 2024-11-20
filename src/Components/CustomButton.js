import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {DeviceWidth} from '../Utilities/Config';
import {COLORS} from '../Utilities/AppColors';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {IMAGES} from '../Utilities/Images';

const CustomButton = ({
  buttonText,
  leftIcon,
  rightIcon,
  buttonStyles,
  textStyles,
  onPress,
  loader,
  indicatorColor,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[styles.buttonStyle, buttonStyles]}
      onPress={onPress}>
      {/* Loader condition */}
      {loader ? (
        <ActivityIndicator color={indicatorColor ?? COLORS.WHITE} />
      ) : (
        <>
          {/* Left Icon */}
          {leftIcon && (
            <Image
              source={leftIcon}
              style={{height: 30, width: 30}}
              resizeMode="contain"
            />
          )}
          {/* Button Text */}
          <Text style={[styles.textStyle, textStyles]}>{buttonText}</Text>

          {/* Right Icon */}
          {rightIcon && (
            <Icons name={rightIcon} color={COLORS.WHITE} size={20} />
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  buttonStyle: {
    width: DeviceWidth * 0.9,
    flexDirection: 'row', // Align items horizontally
    alignItems: 'center', // Vertically center items
    justifyContent: 'center', // Center content in the button
    borderWidth: 1.5,
    borderColor: COLORS.APP_PRIMARY_COLOR,
    paddingVertical: 10,
    alignSelf: 'center',
    borderRadius: 6,
    marginVertical: 8,
  },
  textStyle: {
    color: COLORS.APP_PRIMARY_COLOR,
    fontSize: 17,
    fontWeight: '400',
    marginHorizontal: 10, // Add spacing between text and icons
  },
  iconStyle: {
    color: COLORS.APP_PRIMARY_COLOR,
    fontSize: 20, // Adjust as per your design
  },
});
