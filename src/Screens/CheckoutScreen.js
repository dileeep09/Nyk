import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import Header from '../Components/Header';
import CustomButton from '../Components/CustomButton';
import {COLORS} from '../Utilities/AppColors';
import {useDispatch} from 'react-redux';
import {setCartItems} from '../Redux/Actions';
import {useNavigation, useRoute} from '@react-navigation/native';

const CheckoutScreen = () => {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const route = useRoute();
  const navigation = useNavigation();
  const {totalAmount} = route.params;
  const paymentOptions = [
    {id: 'card', label: `Credit/Debit Card $(${totalAmount})`},
    {id: 'upi', label: `UPI $(${totalAmount})`},
    {id: 'cod', label: `Cash on Delivery (COD) $(${totalAmount})`},
  ];
  const handleOrderCompletion = () => {
    if (!selectedPayment) {
      Alert.alert('Error', 'Please select a payment method.');
      return;
    }
    // Clear cart after placing the order
    dispatch(setCartItems([]));
    // Show success modal
    setShowModal(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header backButton text={'Checkout'} />
      <View style={styles.content}>
        <Text style={styles.title}>Select Payment Method</Text>
        <View style={styles.optionsContainer}>
          {paymentOptions.map(option => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.option,
                selectedPayment === option.id && styles.optionSelected,
              ]}
              onPress={() => setSelectedPayment(option.id)}>
              <Text
                style={[
                  styles.optionText,
                  selectedPayment === option.id && styles.optionTextSelected,
                ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <CustomButton
          buttonText="Place Order"
          buttonStyles={styles.orderButton}
          textStyles={styles.orderButtonText}
          onPress={handleOrderCompletion}
        />
      </View>

      {/* Success Modal */}
      <Modal visible={showModal} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>🎉 Congratulations!</Text>
            <Text style={styles.modalMessage}>
              Your order has been successfully placed using{' '}
              {selectedPayment?.toUpperCase()}!
            </Text>
            <CustomButton
              buttonText="Close"
              buttonStyles={styles.modalButton}
              textStyles={styles.modalButtonText}
              onPress={() => {
                setShowModal(false);
                navigation.navigate('BottomTabs', {screen: 'Home'});
              }}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.APP_PRIMARY_COLOR,
    textAlign: 'center',
    marginBottom: 24,
  },
  optionsContainer: {
    marginBottom: 32,
  },
  option: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.LIGHT_GRAY,
    marginBottom: 12,
    backgroundColor: COLORS.LIGHTER_GRAY,
  },
  optionSelected: {
    borderColor: COLORS.APP_PRIMARY_COLOR,
    backgroundColor: COLORS.LIGHT_GRAY,
  },
  optionText: {
    fontSize: 16,
    color: COLORS.DARK_GRAY,
    textAlign: 'center',
  },
  optionTextSelected: {
    color: COLORS.APP_PRIMARY_COLOR,
    fontWeight: 'bold',
  },
  orderButton: {
    backgroundColor: COLORS.APP_PRIMARY_COLOR,
    paddingVertical: 14,
    borderRadius: 8,
    alignSelf: 'center',
    width: '100%',
  },
  orderButtonText: {
    color: COLORS.WHITE,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: COLORS.WHITE,
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    width: '80%',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.APP_PRIMARY_COLOR,
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: COLORS.DARK_GRAY,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: COLORS.APP_PRIMARY_COLOR,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalButtonText: {
    color: COLORS.WHITE,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
