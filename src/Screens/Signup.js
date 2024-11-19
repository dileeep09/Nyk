import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../Utilities/AppColors';
import Logo from '../Components/Logo';

const Signup = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Logo alignSelf={'center'} />
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
});
