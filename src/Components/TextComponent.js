import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../Utilities/AppColors';

const TextComponent = ({type, textColor, text, fontSize, textAlign}) => {
  return (
    <Text
      style={{
        color: textColor ?? COLORS.BLACK,
        marginVertical: 3,
        textAlign: textAlign ?? 'center',
        fontSize:
          type == 'Heading'
            ? fontSize ?? 24
            : type == 'subHeading'
            ? fontSize ?? 18
            : fontSize ?? 15,
        fontWeight:
          type == 'Heading' ? '600' : type == 'subHeading' ? '500' : '300',
      }}>
      {text}
    </Text>
  );
};

export default TextComponent;

const styles = StyleSheet.create({});
