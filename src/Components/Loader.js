import React from 'react';
import {View, ActivityIndicator, StyleSheet, Modal} from 'react-native';
import {COLORS} from '../Utilities/AppColors';

const Loader = ({show}) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={!show}
      onRequestClose={() => {}}>
      <View style={styles.container}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={COLORS.APP_PRIMARY_COLOR} />
        </View>
      </View>
    </Modal>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  loaderContainer: {
    padding: 20,
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
    elevation: 10,
  },
});
