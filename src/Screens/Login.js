import {SafeAreaView, StyleSheet, View} from 'react-native';
import React from 'react';
import Logo from '../Components/Logo';
import {COLORS} from '../Utilities/AppColors';
import TextComponent from '../Components/TextComponent';
import CodePicker from '../Components/CodePicker'; // Correct import

const Login = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Logo alignSelf={'center'} />
      <View style={styles.headingContainer}>
        <TextComponent text={'Log in to your account'} type={'Heading'} />
        <TextComponent
          text={'Welcome back! Please enter your details.'}
          textColor={COLORS.GREY}
        />
      </View>
      <View>
        <CodePicker />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  headingContainer: {alignSelf: 'center'},
});

export default Login;
