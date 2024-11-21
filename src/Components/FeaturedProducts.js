import React, {useState, useEffect} from 'react';
import {View, StyleSheet, VirtualizedList} from 'react-native';
import {BASE_URL, callApi} from '../Utilities/ApiCall';
import TextComponent from './TextComponent';
import Loader from './Loader';
import {DeviceHeight, DeviceWidth} from '../Utilities/Config';
import {COLORS} from '../Utilities/AppColors';
import Cards from './Cards';
const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getFeaturedProducts();
  }, []);
  // Fetch featured products
  const getFeaturedProducts = async () => {
    const category = 'blush'; 
    try {
      const products = await callApi(BASE_URL, 'GET', {product_type: category});
      setFeaturedProducts(products);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching featured products:', error.message);
      setLoading(false);
    }
  };
  // Render each item in the VirtualizedList
  const renderItem = ({item, index}) =>
    index % 2 == 0 && (
      <View style={styles.row}>
        <Cards item={item} />
        {featuredProducts[index + 1] && (
          <Cards item={featuredProducts[index + 1]} />
        )}
      </View>
    );

  const getItemCount = () => featuredProducts.length;
  const getItem = (data, index) => data[index];
  if (loading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <TextComponent
        text={'Featured Products'}
        type={'subHeading'}
        textAlign={'flex-start'}
        styles={{marginVertical: 14}}
      />
      <VirtualizedList
        contentContainerStyle={{paddingBottom: DeviceHeight / 2.5}}
        data={featuredProducts}
        getItemCount={getItemCount}
        getItem={getItem}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    width: DeviceWidth * 0.9,
    backgroundColor: COLORS.WHITE,
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
});

export default FeaturedProducts;
