import {SafeAreaView, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../Utilities/AppColors';
import TextComponent from './TextComponent';
import CodePicker from './CodePicker';
import {TextInput} from 'react-native-paper';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Formik} from 'formik';
import {DeviceHeight, DeviceWidth} from '../Utilities/Config';
import {
  loginValidationSchema,
  signupValidationSchema,
} from '../Utilities/ValidationSchemas';
import CustomButton from './CustomButton';
import {IMAGES} from '../Utilities/Images';
import {callApi, loginUrl, signupUrl} from '../Utilities/ApiCall';
import {useDispatch} from 'react-redux';
import {setUserData} from '../Redux/Actions';
const AuthenticationScreensComponent = ({navigation, type}) => {
  const dispatch = useDispatch();
  const [getCountryDetails, setCountryDetails] = useState({
    code: '+91',
    country: 'IN',
  });
  const [securePassword, setSecurePassword] = useState(true);
  const [loader, setLoader] = useState(false);
  const [checked, setChecked] = useState(false);
  const trueValue = type == 'Signup';
  const handleFormSubmit = async (values, actions) => {
    setLoader(true); // Enable loader before API calls
    try {
      if (trueValue) {
        // Handle Signup
        await handleSignup(values, actions);
      } else {
        // Handle Login
        await handleLogin(values, actions);
      }
    } catch (error) {
      console.log('error', error);
      ToastAndroid.show(
        'An error occurred. Please try again.',
        ToastAndroid.SHORT,
      );
    } finally {
      setLoader(false); // Ensure loader is turned off after the API call completes
    }
  };

  // Signup API call function
  const handleSignup = async (values, actions) => {
    console.log('called');
    try {
      const responseData = await callApi(signupUrl, 'POST', {
        phone: values.phone,
        password: values.password,
        name: values.name,
      });
       
      if (responseData?.data?.message === 'Registration successful') {
        ToastAndroid.show(responseData?.data?.message, ToastAndroid.LONG);
        dispatch(setUserData(responseData?.data))
        navigation.replace('BottomTabs');
      } else {
        ToastAndroid.show(responseData?.data?.message, ToastAndroid.LONG);
      }
    } catch (error) {
      console.log('Signup error:', error);
      ToastAndroid.show(
        'An error occurred. Please try again.',
        ToastAndroid.SHORT,
      );
    }
  };

  // Login API call function
  const handleLogin = async (values, actions) => {
    try {
      const responseData = await callApi(loginUrl, 'POST', {
        phone: values.phone,
        password: values.password,
      });

      if (responseData?.status) {
        ToastAndroid.show(responseData?.message, ToastAndroid.LONG);
        navigation.replace('BottomTabs');
        dispatch(setUserData(responseData?.data))
      } else {
        ToastAndroid.show(responseData?.message, ToastAndroid.LONG);
      }
    } catch (error) {
      console.log('Login error:', error);
      ToastAndroid.show(
        'An error occurred. Please try again.',
        ToastAndroid.SHORT,
      );
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        validationSchema={
          trueValue ? signupValidationSchema : loginValidationSchema
        }
        initialValues={
          trueValue
            ? {name: '', phone: '', password: ''}
            : {phone: '', password: ''}
        }
        onSubmit={(values, action) => {
          handleFormSubmit(values, action);
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
          touched,
        }) => (
          <>
            {trueValue && (
              <>
                <TextComponent text={'Name*'} textAlign={'flex-start'} />
                <TextInput
                  mode="flat"
                  activeUnderlineColor="transparent"
                  underlineColor="transparent"
                  textColor={COLORS.BLACK}
                  placeholderTextColor={COLORS.GREY}
                  cursorColor={COLORS.GREY}
                  placeholder={'Enter your name'}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  keyboardType="email-address"
                  style={styles.textInputStyle}
                />
                {touched.name && errors.name && (
                  <Text style={styles.errorText}>{errors.name}</Text>
                )}
              </>
            )}
            <TextComponent text={'Phone number'} textAlign={'flex-start'} />
            <TextInput
              mode="flat"
              activeUnderlineColor="transparent"
              underlineColor="transparent"
              textColor={COLORS.BLACK}
              placeholderTextColor={COLORS.GREY}
              cursorColor={COLORS.GREY}
              placeholder={`${getCountryDetails?.code} 123456788`}
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
              value={values.phone}
              keyboardType="phone-pad"
              style={styles.textInputStyle}
              left={
                !trueValue && (
                  <TextInput.Icon
                    icon={() => (
                      <CodePicker
                        getCountryDetails={getCountryDetails}
                        setCountryDetails={setCountryDetails}
                      />
                    )}
                  />
                )
              }
            />
            {touched.phone && errors.phone && (
              <Text style={styles.errorText}>{errors.phone}</Text>
            )}
            <TextComponent text={'Password'} textAlign={'flex-start'} />
            <TextInput
              mode="flat"
              activeUnderlineColor="transparent"
              underlineColor="transparent"
              secureTextEntry={securePassword} // use securePassword here
              textColor={COLORS.BLACK}
              placeholderTextColor={COLORS.GREY}
              cursorColor={COLORS.GREY}
              placeholder="*********"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              keyboardType="default"
              style={styles.textInputStyle}
              right={
                <TextInput.Icon
                  icon={() => (
                    <MaterialIcon
                      name={securePassword ? 'eye-off' : 'eye-outline'}
                      color={COLORS.LIGHT_GREY}
                      size={20}
                      onPress={() => setSecurePassword(prev => !prev)} // toggle visibility
                    />
                  )}
                />
              }
            />
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
            {!trueValue && (
              <View style={styles.textContainer}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Icons
                    name={
                      checked ? 'checkbox-marked' : 'checkbox-blank-outline'
                    }
                    size={25}
                    color={checked ? COLORS.BLACK : COLORS.LIGHT_GREY}
                    style={{marginRight: 5}}
                    onPress={() => setChecked(prev => !prev)}
                  />
                  <TextComponent text={'Remember for 30 days'} />
                </View>
                <TextComponent
                  text={'Forget password?'}
                  textColor={COLORS.APP_PRIMARY_COLOR}
                />
              </View>
            )}
            <CustomButton
              loader={loader}
              buttonText={trueValue ? 'Create an account' : 'Sign in now'}
              buttonStyles={{backgroundColor: COLORS.APP_PRIMARY_COLOR,width:DeviceWidth*0.9}}
              textStyles={{color: COLORS.WHITE}}
              rightIcon={'arrow-right'}
              onPress={handleSubmit}
            />
          </>
        )}
      </Formik>
      <CustomButton
        leftIcon={IMAGES.google}
        buttonText={`Sign ${trueValue ? 'up' : 'in'} with Google`}
        buttonStyles={{borderColor: COLORS.LIGHT_GREY,width:DeviceWidth*0.9}}
        onPress={()=>navigation.replace("BottomTabs")}
      />
      <CustomButton
        leftIcon={IMAGES.apple}
        buttonText={`Sign ${trueValue ? 'up' : 'in'} with Apple`}
        buttonStyles={{
          backgroundColor: COLORS.BLACK,
          borderColor: COLORS.BLACK,
          width:DeviceWidth*0.9
        }}
        textStyles={{color: COLORS.WHITE}}
      />
    </View>
  );
};

export default AuthenticationScreensComponent;

const styles = StyleSheet.create({
  container: {
    width: DeviceWidth * 0.9,
    alignSelf: 'center',
    marginTop: DeviceHeight * 0.06,
  },
  headingContainer: {alignSelf: 'center'},
  textInputStyle: {
    backgroundColor: COLORS.WHITE,
    width: DeviceWidth * 0.9,
    alignSelf: 'center',
    borderWidth: 1,
    marginVertical: 8,
    borderRadius: 6,
    borderColor: COLORS.LIGHT_GREY,
    height: 50,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: DeviceWidth * 0.9,
    alignSelf: 'center',
    marginBottom: DeviceHeight * 0.03,
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    alignSelf: 'center',
  },
});
