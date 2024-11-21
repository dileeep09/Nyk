import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  VirtualizedList,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {BASE_URL, callApi} from '../Utilities/ApiCall';
import Cards from '../Components/Cards';
import Header from '../Components/Header';
import Loader from '../Components/Loader';
import CustomButton from '../Components/CustomButton';
import {COLORS} from '../Utilities/AppColors';

const SingleCategory = () => {
  const route = useRoute();
  const {category} = route.params;
  const [categoryData, setCategoryData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [sortOption, setSortOption] = useState(''); // Options: 'price', 'popularity'
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  useEffect(() => {
    fetchCategoryData();
  }, []);

  useEffect(() => {
    sortProducts(sortOption);
  }, [categoryData, sortOption]);

  const fetchCategoryData = async () => {
    try {
      const products = await callApi(BASE_URL, 'GET', {product_type: category});
      setCategoryData(products);
    } catch (error) {
      console.error('Error fetching category products:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const sortProducts = option => {
    if (!option) {
      setSortedData(categoryData);
      return;
    }
    const sorted = [...categoryData].sort((a, b) => {
      if (option === 'price') {
        return a.price - b.price;
      } else if (option === 'popularity') {
        return b.popularity - a.popularity;
      }
      return 0;
    });

    setSortedData(sorted);
  };

  const getItem = (data, index) => data[index];
  const getItemCount = data => data.length;

  const renderItem = ({item, index}) =>
    index % 2 === 0 && (
      <View style={styles.row}>
        <Cards item={item} />
        {sortedData[index + 1] && <Cards item={sortedData[index + 1]} />}
      </View>
    );

  const handleSortChange = option => {
    setSortOption(option);
  };

  const heading = category?.charAt(0)?.toUpperCase() + category?.slice(1);

  return (
    <SafeAreaView style={styles.container}>
      <Header text={heading} backButton/>
      <View style={styles.sortOptions}>
        <CustomButton
          buttonStyles={{marginRight: 10}}
          buttonText={'Sort by price'}
          onPress={() => handleSortChange('price')}
        />
        <CustomButton
          buttonText={'Sort by popularity'}
          onPress={() => handleSortChange('popularity')}
        />
      </View>
      {loading ? (
        <Loader />
      ) : (
        <VirtualizedList
          data={sortedData}
          initialNumToRender={10}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          getItemCount={getItemCount}
          getItem={getItem}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </SafeAreaView>
  );
};

export default SingleCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  sortOptions: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },

  listContainer: {
    paddingHorizontal: 10,
  },
});
