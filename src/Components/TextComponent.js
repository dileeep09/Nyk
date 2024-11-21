import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../Utilities/AppColors';

const TextComponent = ({
  type,
  textColor,
  text,
  fontSize,
  textAlign,
  onPress,
  styles,
  NOL,
  fontWeight,
}) => {
  return (
    <Text
      numberOfLines={NOL}
      onPress={onPress}
      style={{
        ...styles,
        color: textColor ?? COLORS.BLACK,
        marginTop: 3,
        textAlign: textAlign ?? 'center',
        fontSize:
          type == 'Heading'
            ? fontSize ?? 26
            : type == 'subHeading'
            ? fontSize ?? 22
            : fontSize ?? 15,
        fontWeight:
          fontWeight ?? type == 'Heading'
            ? '700'
            : type == 'subHeading'
            ? '600'
            : '400',
      }}>
      {text}
    </Text>
  );
};

export default TextComponent;
