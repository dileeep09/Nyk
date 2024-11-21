import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  Image,
} from 'react-native';
import {IMAGES} from '../Utilities/Images';
import {COLORS} from '../Utilities/AppColors';
import TextComponent from './TextComponent';

const Categories = ({navigation}) => {
  // Local JSON for categories
  const cateData = [
    {
      name: 'blush',
      image: IMAGES.blush,
    },
    {
      name: 'mascara',
      image: IMAGES.mascara,
    },
    {
      name: 'lipstick',
      image: IMAGES.lipstick,
    },
    {
      name: 'foundation',
      image: IMAGES.foundation,
    },
    {
      name: 'eyebrow',
      image: IMAGES.eyebrow,
    },
  ];

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      activeOpacity={1}
      onPress={() =>
        navigation.navigate('SingleCategory', {category: item?.name})
      }>
      <Image source={item.image} style={styles.image} />
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <TextComponent
        text={'Categories'}
        type={'subHeading'}
        textAlign={'flex-start'}
        styles={{marginLeft: 18, marginVertical: 14}}
      />
      <FlatList
        data={cateData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  itemContainer: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40, // Round shape
    marginBottom: 5,
    borderWidth: 4, // Border width
    borderColor: COLORS.WHITE,
    elevation: 4,
  },
});
