import {CountryPicker} from 'react-native-country-codes-picker';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {DeviceHeight} from '../Utilities/Config';
import {COLORS} from '../Utilities/AppColors';
import TextComponent from './TextComponent';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
const CodePicker = ({getCountryDetails, setCountryDetails}) => {
  const [search, setSearch] = useState('');
  const [show, setShow] = useState(false);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{flexDirection: 'row', alignItems: 'center'}}
        activeOpacity={0.5}
        onPress={() => setShow(true)}>
        <TextComponent text={getCountryDetails?.country} />
        <MaterialIcon name="chevron-down" size={20} color={COLORS.GREY} />
      </TouchableOpacity>
      {show && (
        <CountryPicker
          show={show}
          pickerButtonOnPress={item => {
            setCountryDetails({
              code: item.dial_code,
              country: item.code,
            });
            setShow(false);
          }}
          searchMessage={search}
          onBackdropPress={() => setShow(false)}
          style={styles.countryPickerStyles}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countryPickerStyles: {
    itemsList: {
      height: DeviceHeight / 2.5, // Limit picker height
    },
  },
});

export default CodePicker;
