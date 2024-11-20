import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../Utilities/AppColors';
import Logo from '../Components/Logo';
import TextComponent from '../Components/TextComponent';
import AuthenticationScreensComponent from '../Components/AuthenticationScreensComponent';
import {useNavigation} from '@react-navigation/native';

const Signup = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <Logo alignSelf={'center'} />
      <View style={styles.headingContainer}>
        <TextComponent text={'Create an account'} type={'Heading'} />
        <TextComponent
          text={'Please enter your details to start your juorney'}
          textColor={COLORS.GREY}
        />
      </View>
      <AuthenticationScreensComponent navigation={navigation} type={'Signup'}/>
      <View style={{flexDirection: 'row', alignSelf: 'center'}}>
        <TextComponent
          text={"Don't have an account? "}
          textColor={COLORS.GREY}
        />
        <TextComponent
          text={'Sign in'}
          textColor={COLORS.APP_PRIMARY_COLOR}
          onPress={() => navigation.navigate('Login')}
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
export default Signup;
