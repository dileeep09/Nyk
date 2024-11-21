import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useRoute} from '@react-navigation/native';
import Header from '../Components/Header';
import {COLORS} from '../Utilities/AppColors';
import CustomButton from '../Components/CustomButton';
import {setCartItems, setWishList} from '../Redux/Actions';
import TextComponent from '../Components/TextComponent';

const ProductDetails = () => {
  const route = useRoute();
  const {product} = route.params;

  const dispatch = useDispatch();
  const getCartItems = useSelector((state) => state?.getCartItems);
  const getWishList = useSelector((state) => state?.getWishList);

  // Handle Add to Cart
  const handleAddToCart = () => {
    const isAlreadyInCart = getCartItems?.some((item) => item.id === product.id);

    if (isAlreadyInCart) {
      Alert.alert('Info', 'This product is already in your cart.');
      return;
    }

    const updatedCart = [...getCartItems, {...product,quantity:1}];
    dispatch(setCartItems(updatedCart));
    Alert.alert('Success', `${product.name} has been added to the cart!`);
  };

  // Handle Add to Wishlist
  const handleAddToWishList = () => {
    const isAlreadyInWishList = getWishList?.some(
      (item) => item.id === product.id
    );

    if (isAlreadyInWishList) {
      Alert.alert('Info', 'This product is already in your wishlist.');
      return;
    }

    const updatedWishList = [...getWishList, product];
    dispatch(setWishList(updatedWishList));
    Alert.alert('Success', `${product.name} has been added to your wishlist!`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header text="Product Details" backButton/>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Product Image */}
        <Image
          source={{uri: product.image_link}}
          style={styles.productImage}
          resizeMode="contain"
        />
        {/* Product Info */}
        <View style={styles.infoContainer}>
          <TextComponent type="subHeading" text={product?.name} />
          <TextComponent type="subHeading" text={`$${product?.price}`} />
          <TextComponent text={product.description} />
        </View>
        {/* Add to Cart Button */}
        <CustomButton
          buttonText="Add to Cart"
          buttonStyles={styles.addToCartButton}
          textStyles={styles.addToCartText}
          onPress={handleAddToCart}
        />
        {/* Add to Wishlist Button */}
        <CustomButton
          buttonText="Add to Wishlist"
          buttonStyles={styles.addToWishListButton}
          textStyles={styles.addToWishListText}
          onPress={handleAddToWishList}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  contentContainer: {
    padding: 16,
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  infoContainer: {
    width: '100%',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  addToCartButton: {
    backgroundColor: COLORS.APP_PRIMARY_COLOR,
    borderColor: COLORS.APP_PRIMARY_COLOR,
    width: '100%',
    marginBottom: 10,
  },
  addToCartText: {
    color: COLORS.WHITE,
    fontWeight: 'bold',
    fontSize: 18,
  },
  addToWishListButton: {
    backgroundColor: COLORS.WHITE, 
    borderColor: COLORS.APP_PRIMARY_COLOR,
    width: '100%',
  },
  addToWishListText: {
    color: COLORS.APP_PRIMARY_COLOR,
    fontWeight: 'bold',
    fontSize: 18,
  },
});
