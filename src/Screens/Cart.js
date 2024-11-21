import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS} from '../Utilities/AppColors';
import Logo from '../Components/Logo';
import Header from '../Components/Header';
import CustomButton from '../Components/CustomButton';
import {setCartItems} from '../Redux/Actions';
import AddressModal from '../Components/AddressModal';
import {useNavigation} from '@react-navigation/native';

const Cart = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const getCartItems = useSelector(state => state?.getCartItems);
  const userAddress = useSelector(state => state?.userAddress);
  const [isModalVisible, setIsModalVisible] = useState(false);
  // Update quantity of an item
  const updateQuantity = (id, action) => {
    const updatedItems = getCartItems.map(item =>
      item.id === id
        ? {
            ...item,
            quantity:
              action === 'increment'
                ? item.quantity + 1
                : Math.max(1, item.quantity - 1),
          }
        : item,
    );
    dispatch(setCartItems(updatedItems));
  };

  // Remove item from cart
  const removeItem = id => {
    const updatedItems = getCartItems.filter(item => item.id !== id);
    dispatch(setCartItems(updatedItems));
    Alert.alert('Success', 'Item removed from cart.');
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    return getCartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  // Render Cart Item
  const renderCartItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Image source={{uri: item.image_link}} style={styles.productImage} />
      <View style={styles.infoContainer}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
        <View style={styles.quantityContainer}>
          <CustomButton
            buttonText="-"
            buttonStyles={styles.quantityButton}
            textStyles={styles.quantityButtonText}
            onPress={() => updateQuantity(item.id, 'decrement')}
          />
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <CustomButton
            buttonText="+"
            buttonStyles={styles.quantityButton}
            textStyles={styles.quantityButtonText}
            onPress={() => updateQuantity(item.id, 'increment')}
          />
        </View>
        <CustomButton
          buttonText="Remove"
          buttonStyles={styles.removeButton}
          textStyles={styles.removeButtonText}
          onPress={() => removeItem(item.id)}
        />
      </View>
    </View>
  );
  const handleCheckout = () => {
    // call api for cart operations here....
    // i do not  have relevent api to perform this action that's why i am navigating it to checkout screen
    userAddress
      ? getCartItems?.length < 1
        ? Alert.alert('Error', 'Cart is empty.')
        : navigation.navigate('CheckoutScreen', {
          totalAmount: calculateTotalPrice(),
          })
      : Alert.alert('Error', 'Please add a shipping address first.');
  };
  return (
    <SafeAreaView style={styles.container}>
      <Logo />
      <Header text="Your Cart" />

      {/* Address Section */}
      <View style={styles.addressContainer}>
        <Text style={styles.addressTitle}>Shipping Address:</Text>
        {userAddress ? (
          <View>
            <Text style={styles.addressText}>{userAddress}</Text>
            <CustomButton
              buttonText="Update Address"
              buttonStyles={styles.updateAddressButton}
              textStyles={styles.updateAddressButtonText}
              onPress={() => setIsModalVisible(true)}
            />
          </View>
        ) : (
          <TouchableOpacity onPress={() => setIsModalVisible(true)}>
            <Text style={styles.addAddressText}>Add Address</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Cart Items */}
      {getCartItems?.length ? (
        <FlatList
          data={getCartItems}
          keyExtractor={item => item.id.toString()}
          renderItem={renderCartItem}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your cart is empty.</Text>
        </View>
      )}

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.totalText}>Total: ${calculateTotalPrice()}</Text>
        <CustomButton
          buttonText="Checkout"
          buttonStyles={styles.checkoutButton}
          textStyles={styles.checkoutButtonText}
          onPress={handleCheckout}
          rightIcon={'arrow-right'}
        />
      </View>
      <AddressModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  addressContainer: {
    padding: 16,
    backgroundColor: COLORS.LIGHT_GRAY,
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.APP_PRIMARY_COLOR,
  },
  addressText: {
    fontSize: 14,
    color: COLORS.DARK_GRAY,
    marginTop: 4,
  },
  addAddressText: {
    fontSize: 14,
    color: COLORS.APP_PRIMARY_COLOR,
    marginTop: 4,
  },
  listContent: {
    padding: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.LIGHT_GRAY,
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.APP_PRIMARY_COLOR,
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    color: COLORS.DARK_GRAY,
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: COLORS.APP_PRIMARY_COLOR,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  quantityButtonText: {
    color: COLORS.WHITE,
    fontWeight: 'bold',
    fontSize: 16,
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.DARK_GRAY,
  },
  removeButton: {
    backgroundColor: 'red',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginTop: 10,
    borderColor: 'red',
    alignSelf: 'flex-start',
  },
  removeButtonText: {
    color: COLORS.WHITE,
    fontWeight: 'bold',
    fontSize: 14,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.LIGHT_GRAY,
    backgroundColor: COLORS.WHITE,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.APP_PRIMARY_COLOR,
  },
  checkoutButton: {
    backgroundColor: COLORS.APP_PRIMARY_COLOR,
    borderColor: COLORS.APP_PRIMARY_COLOR,
    width: '100%',
  },
  checkoutButtonText: {
    color: COLORS.WHITE,
    fontWeight: 'bold',
    fontSize: 18,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: COLORS.GREY,
  },
  updateAddressButton: {
    backgroundColor: COLORS.APP_PRIMARY_COLOR,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  updateAddressButtonText: {
    color: COLORS.WHITE,
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
});
