import {CountryPicker} from 'react-native-country-codes-picker';
import {StyleSheet, Text, TouchableOpacity, View, TextInput} from 'react-native';
import React, {useState} from 'react';

const CodePicker = () => {
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState('+1'); // Default country code
  const [search, setSearch] = useState(''); // Search term state

  return (
    <View style={styles.container}>
      {/* Button to Open Picker */}
      <TouchableOpacity
        onPress={() => setShow(true)}
        style={styles.button}>
        <Text style={styles.buttonText}>
          {`Selected Code: ${countryCode}`}
        </Text>
      </TouchableOpacity>

      {/* Country Picker with Search Bar and Cancel Button */}
      {show && (
        <View style={styles.modal}>
          {/* Search Bar */}
          <TextInput
            style={styles.searchInput}
            placeholder="Search country"
            value={search}
            onChangeText={setSearch}
          />

          {/* Cancel Button */}
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setShow(false)}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>

          {/* Country Picker */}
          <CountryPicker
            show={show}
            pickerButtonOnPress={(item) => {
              setCountryCode(item.dial_code);
              setShow(false);
            }}
            searchMessage={search} // Pass search query to the picker
            onBackdropPress={() => setShow(false)} // Close on backdrop press
            style={styles.countryPickerStyles}
          />
        </View>
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
  button: {
    width: '80%',
    height: 50,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  modal: {
    position: 'absolute',
    top: '10%',
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    elevation: 5,
  },
  searchInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  cancelButton: {
    alignSelf: 'flex-end',
    marginVertical: 5,
  },
  cancelButtonText: {
    color: 'red',
    fontSize: 16,
  },
  countryPickerStyles: {
    itemsList: {
      height: 300, // Limit picker height
    },
  },
});

export default CodePicker;
