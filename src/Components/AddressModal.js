import React, { useState } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import CustomButton from '../Components/CustomButton';
import { COLORS } from '../Utilities/AppColors';
import { useDispatch } from 'react-redux';
import { setUserAddress } from '../Redux/Actions';

const AddressModal = ({ visible, onClose }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = () => {
    if (!name || !phone || !address) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }
    const fullAddress = `${name}, ${phone}, ${address}`;
    dispatch(setUserAddress(fullAddress));
    onClose();
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Shipping Address</Text>
          <Text style={styles.modalSubtitle}>
            Please fill in the details below.
          </Text>

          <TextInput
            placeholder="e.g., John Doe"
            placeholderTextColor={COLORS.GREY}
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            placeholder="e.g., +1 234 567 890"
            placeholderTextColor={COLORS.GREY}
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
          <TextInput
            placeholder="e.g., 123 Main Street, City, ZIP"
            placeholderTextColor={COLORS.GREY}
            style={[styles.input, styles.textArea]}
            value={address}
            onChangeText={setAddress}
            multiline
          />

          <View style={styles.modalButtons}>
            <CustomButton
              buttonText="Cancel"
              buttonStyles={styles.cancelButton}
              textStyles={styles.cancelButtonText}
              onPress={onClose}
            />
            <CustomButton
              buttonText="Submit"
              buttonStyles={styles.submitButton}
              textStyles={styles.submitButtonText}
              onPress={handleSubmit}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)', // Darker background overlay
  },
  modalContent: {
    backgroundColor: COLORS.WHITE,
    padding: 24,
    borderRadius: 12,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: COLORS.APP_PRIMARY_COLOR,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 14,
    color: COLORS.DARK_GRAY,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.LIGHT_GRAY,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 14,
    backgroundColor: COLORS.LIGHTER_GRAY,
    color: COLORS.DARK_GRAY,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top', // Align text at the top for multiline input
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  cancelButton: {
    backgroundColor: 'red',
    flex: 1,
    marginRight: 8,
    paddingVertical: 12,
    borderRadius: 8,
    borderColor:'red'
  },
  cancelButtonText: {
    color: COLORS.WHITE,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: COLORS.APP_PRIMARY_COLOR,
    flex: 1,
    marginLeft: 8,
    paddingVertical: 12,
    borderRadius: 8,
  },
  submitButtonText: {
    color: COLORS.WHITE,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AddressModal;
