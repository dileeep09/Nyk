import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  TouchableOpacity,
  VirtualizedList,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Header from '../Components/Header';
import {setWishList} from '../Redux/Actions';
import {COLORS} from '../Utilities/AppColors';
import CustomButton from '../Components/CustomButton';
import Logo from '../Components/Logo';
const WishLists = () => {
  const dispatch = useDispatch();
  const getWishList = useSelector(state => state?.getWishList);
  // Remove Item from Wishlist
  const handleRemoveFromWishList = productId => {
    const updatedWishList = getWishList.filter(item => item.id !== productId);
    dispatch(setWishList(updatedWishList));
    Alert.alert('Success', 'Item removed from wishlist.');
  };
  // Render Wishlist Item
  const renderWishListItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Image source={{uri: item.image_link}} style={styles.productImage} />
      <View style={styles.infoContainer}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
        <CustomButton
          buttonText="Remove"
          buttonStyles={styles.removeButton}
          textStyles={styles.removeButtonText}
          onPress={() => handleRemoveFromWishList(item.id)}
        />
      </View>
    </View>
  );

  // VirtualizedList Config
  const getItem = (data, index) => data[index];
  const getItemCount = data => data.length;

  return (
    <SafeAreaView style={styles.container}>
      <Logo />
      {getWishList?.length ? (
        <VirtualizedList
          data={getWishList}
          initialNumToRender={4}
          renderItem={renderWishListItem}
          keyExtractor={item => item.id.toString()}
          getItem={getItem}
          getItemCount={getItemCount}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your Wishlist is empty.</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default WishLists;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  listContent: {
    padding: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.LIGHT_GREY,
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
  removeButton: {
    backgroundColor: 'red',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    borderColor: 'red',
    alignSelf: 'flex-start',
  },
  removeButtonText: {
    color: COLORS.WHITE,
    fontSize: 14,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: COLORS.DARK_GRAY,
  },
});
