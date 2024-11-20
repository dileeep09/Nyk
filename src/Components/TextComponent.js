import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../Utilities/AppColors';

const TextComponent = ({type, textColor, text, fontSize, textAlign,onPress}) => {
  return (
    <Text
    onPress={onPress}
      style={{
        color: textColor ?? COLORS.BLACK,
        marginTop:3,
        textAlign: textAlign ?? 'center',
        fontSize:
          type == 'Heading'
            ? fontSize ?? 24
            : type == 'subHeading'
            ? fontSize ?? 18
            : fontSize ?? 15,
        fontWeight:
          type == 'Heading' ? '600' : type == 'subHeading' ? '500' : '400',
      }}>
      {text}
    </Text>
  );
};

export default TextComponent;

const styles = StyleSheet.create({});
