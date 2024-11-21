import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {COLORS} from '../Utilities/AppColors';
import Header from '../Components/Header';
import {BASE_URL, callApi} from '../Utilities/ApiCall';
import Loader from '../Components/Loader';
import Cards from '../Components/Cards';
import TextComponent from '../Components/TextComponent';
import { DeviceHeight } from '../Utilities/Config';

// Auto-suggestions list (e.g., recent search or suggestions list)
const autoSuggestions = [
  {id: '1', name: 'lipstick'},
  {id: '2', name: 'eyebrow'},
  {id: '3', name: 'mascara'},
  {id: '4', name: 'blush'},
  {id: '5', name: 'foundation'},
  {id: '6', name: 'concealer'},
  {id: '7', name: 'eyeliner'},
];

const Search = () => {
  const [searchText, setSearchText] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Handle text input change
  const handleSearch = text => {
    setSearchText(text);
  };

  // Handle selection from suggestions or recent searches
  const handleSelect = itemName => {
    setSearchText(itemName);
    setRecentSearches(prev => [
      itemName,
      ...prev.filter(item => item !== itemName),
    ]);
    Keyboard.dismiss();
  };

  // Fetch products when component mounts
  useEffect(() => {
    getAllProducts();
  }, []);

  // Fetch products from API
  const getAllProducts = async () => {
    try {
      const products = await callApi(BASE_URL, 'GET');
      setFilteredProducts(products);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching featured products:', error.message);
      setLoading(false);
    }
  };

  // Filter products based on search text
  const handleSearchButtonClick = () => {

    if (searchText.trim()) {
      // Filter products based on product_type
      const filtered = filteredProducts.filter(product =>
        product.product_type.toLowerCase().includes(searchText.toLowerCase()),
      );
      setFilteredProducts(filtered);

      // Update recent searches
      setRecentSearches(prev => [
        searchText,
        ...prev.filter(item => item !== searchText),
      ]);
    } else {
      alert('Please enter a search term');
    }
  };

  const renderItem = ({item, index}) =>
    index % 2 === 0 && (
      <View style={styles.row}>
        <Cards item={item} />
        {filteredProducts[index + 1] && (
          <Cards item={filteredProducts[index + 1]} />
        )}
      </View>
    );

  return (
    <SafeAreaView style={styles.container}>
      <Header backButton text="Search" />
      {loading && <Loader />}
      {/* Search Input and Button in the same row */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for products..."
          placeholderTextColor={COLORS.GREY}
          value={searchText}
          onChangeText={handleSearch}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={handleSearchButtonClick}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {/* Suggestions / Search Results */}
      <View style={styles.suggestionsContainer}>
        {/* Recent Searches */}
        <View style={{marginBottom: 20}}>
          <TextComponent
            type={'subHeading'}
            text={'Recent searches'}
            textAlign={'flex-start'}
          />
          <FlatList
            data={recentSearches}
            horizontal
            keyExtractor={(item, index) => `${item}-${index}`}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.chip}
                onPress={() => handleSelect(item)}>
                <Text style={styles.chipText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Suggestions List */}
        <View style={{marginBottom: 25}}>
          <TextComponent
            type={'subHeading'}
            text={'Suggestions'}
            textAlign={'flex-start'}
          />
          <FlatList
            data={autoSuggestions}
            horizontal
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.chip}
                onPress={() => handleSelect(item.name)}>
                <Text style={styles.chipText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Filtered Products List */}
        {filteredProducts.length > 0 && (
          <>
            <FlatList
            contentContainerStyle={{paddingBottom:DeviceHeight/2}}
              data={filteredProducts}
              keyExtractor={item => item.id}
              renderItem={renderItem}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  suggestionsContainer: {
    paddingHorizontal: 16,
    marginVertical: 20,
  },
  chip: {
    backgroundColor: COLORS.APP_PRIMARY_COLOR,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginRight: 12,
    elevation: 4,
  },
  chipText: {
    color: COLORS.WHITE,
    fontSize: 14,
    fontWeight: 'bold',
  },
  recentSearchesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.DARK_GRAY,
    marginBottom: 10,
  },
  searchButton: {
    backgroundColor: COLORS.APP_PRIMARY_COLOR,
    paddingVertical: 14,
    paddingHorizontal: 20,  // Added padding to both sides for flexibility
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  searchButtonText: {
    color: COLORS.WHITE,
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.LIGHT_GREY,
    margin: 16,
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  searchInput: {
    flex: 1,
    backgroundColor: COLORS.LIGHTER_GRAY,
    borderRadius: 25,
    padding: 12,
    fontSize: 16,
    color: COLORS.DARK_GRAY,
    marginLeft: 8,
    fontFamily: 'Roboto',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
});
