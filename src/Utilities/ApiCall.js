import axios from 'axios';
export const loginUrl= 'https://tor.appdevelopers.mobi/api/login'
export const signupUrl='https://tor.appdevelopers.mobi/api/register'
export const callApi = async (url, method = 'GET', data = {}, headers = {}) => {
  try {
    const response = await axios({
      url,
      method,
      ...(method === 'GET' ? { params: data } : { data }), // Use `params` for GET and `data` for others
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    });
    return response?.data; // Return only the response data
  } catch (error) {
    console.error(`API call error: ${error}`);
    throw new Error('An error occurred while making the API call.');
  }
};
