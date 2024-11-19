import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {IMAGES} from '../Utilities/Images';
import CustomButton from '../Components/CustomButton';
import {COLORS} from '../Utilities/AppColors';
import Tracker from '../Components/Tracker';
import {useNavigation} from '@react-navigation/native';
import Logo from '../Components/Logo';

const Splash = () => {
  const navigation = useNavigation();
  const handleNavigation = screen => {
    if (screen == 'Login') {
      navigation.navigate('Login');
    } else {
      navigation.navigate('Signup');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={IMAGES.splashImage}
        style={styles.imageStyle}
        resizeMode="cover">
        <View style={styles.overlay} />
        <View style={styles.contentContainer}>
            <Logo/>
          <Image
            source={IMAGES.splashText}
            style={styles.textStyle}
            resizeMode="contain"
          />
          <View style={styles.buttonContainer}>
            <Tracker />
            <CustomButton
              buttonText={'Create an account'}
              onPress={handleNavigation}
            />
            <CustomButton
              buttonStyles={styles.buttonStyle}
              buttonText={'Existing user'}
              textStyles={styles.buttonTextStyle}
              onPress={() => handleNavigation('Login')}
            />
            <Text style={styles.TCStyle}>T&C Apply*</Text>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageStyle: {
    height: '100%',
    width: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  contentContainer: {
    flex: 1,
  },
  textStyle: {height: '25%', width: '65%', marginLeft: 16, marginTop: 20},
  buttonStyle: {
    backgroundColor: COLORS.APP_PRIMARY_COLOR,
  },
  buttonTextStyle: {color: COLORS.WHITE},
  buttonContainer: {position: 'absolute', bottom: 25, alignSelf: 'center'},
  TCStyle: {color: COLORS.GREY, textAlign: 'center'},
});

export default Splash;
