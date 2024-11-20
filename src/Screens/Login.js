import {SafeAreaView, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import React from 'react';
import Logo from '../Components/Logo';
import {COLORS} from '../Utilities/AppColors';
import TextComponent from '../Components/TextComponent';
import {DeviceHeight, DeviceWidth} from '../Utilities/Config';

import {useNavigation} from '@react-navigation/native';
import AuthenticationScreensComponent from '../Components/AuthenticationScreensComponent';
const Login = () => {
  const navigation = useNavigation();
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
      <AuthenticationScreensComponent navigation={navigation}/>
      <View style={{flexDirection: 'row', alignSelf: 'center'}}>
        <TextComponent
          text={"Don't have an account? "}
          textColor={COLORS.GREY}
        />
        <TextComponent
          text={'Sign up'}
          textColor={COLORS.APP_PRIMARY_COLOR}
          onPress={() => navigation.navigate('Signup')}
        />
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
