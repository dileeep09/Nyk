import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {IMAGES} from '../Utilities/Images';
import CustomButton from '../Components/CustomButton';
import {COLORS} from '../Utilities/AppColors';
import Tracker from '../Components/Tracker';
import {useNavigation} from '@react-navigation/native';
import Logo from '../Components/Logo';
import {useSelector} from 'react-redux';
import Loader from '../Components/Loader';
import {object} from 'yup';
import { DeviceWidth } from '../Utilities/Config';
const Splash = () => {
  const navigation = useNavigation();
  const [checkLogin, setCheckLogin] = useState(false);
  const getUserData = useSelector(state => state?.getUserData);
  console.log(getUserData);
  useEffect(() => {
    setTimeout(() => {
      if (Object.keys(getUserData)?.length > 0) {
        navigation.replace('BottomTabs');
      }
      setCheckLogin(true);
    }, 2000);
  }, []);
  // handle buttonPress
  const handleNavigation = screen => {
    if (screen == 'Login') {
      navigation.replace('Login');
    } else {
      navigation.replace('Signup');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {!checkLogin && <Loader show={false} />}
      <ImageBackground
        source={IMAGES.splashImage}
        style={styles.imageStyle}
        resizeMode="cover">
        <View style={styles.overlay} />
        <View style={styles.contentContainer}>
          <Logo />
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
              buttonStyles={{width:DeviceWidth*0.9}}
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
    width:DeviceWidth*0.9
  },
  buttonTextStyle: {color: COLORS.WHITE},
  buttonContainer: {position: 'absolute', bottom: 25, alignSelf: 'center'},
  TCStyle: {color: COLORS.GREY, textAlign: 'center'},
});

export default Splash;
