import * as yup from 'yup';
export const loginValidationSchema = yup.object().shape({
  phone: yup.string().required('Phone number is required'),
  password: yup.string().required('Password is required'),
});
export const signupValidationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  phone: yup
    .string()
    .required('Phone number is Required')
    .min(6, ({min}) => `Password must be at least ${min} digits`)
    .max(14, ({max}) => `Password must not be more than ${max} digits`),
  password: yup
    .string()
    .matches(/(?=.*[a-zA-Z])/, 'Password must contain at least one alphabet')
    .matches(
      /(?=.*[!@#$%^&*])/,
      'Password must contain at least one special character',
    )
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is Required'),
});
