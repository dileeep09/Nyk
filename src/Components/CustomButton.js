import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS} from '../Utilities/AppColors';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

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
        <View style={styles.content}>
          {/* Left Icon */}
          {leftIcon && (
            <Image
              source={leftIcon}
              style={styles.iconImage}
              resizeMode="contain"
            />
          )}
          {/* Button Text */}
          <Text style={[styles.textStyle, textStyles]}>{buttonText}</Text>
          {/* Right Icon */}
          {rightIcon && (
            <Icons name={rightIcon} color={COLORS.WHITE} size={20} />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  buttonStyle: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    borderWidth: 1.5,
    borderColor: COLORS.APP_PRIMARY_COLOR,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignSelf: 'center', 
    borderRadius: 6,
    marginVertical: 8,
    backgroundColor: COLORS.WHITE,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center', 
  },
  textStyle: {
    color: COLORS.APP_PRIMARY_COLOR,
    fontSize: 17,
    fontWeight: '400',
    marginHorizontal: 10, 
  },
  iconImage: {
    height: 30,
    width: 30,
  },
});
