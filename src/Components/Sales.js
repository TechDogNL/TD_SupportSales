import axios from "axios";
import Cookies from "universal-cookie";

// I made this so you only have to add the endpoint for each request and that you dont have to always get the token.
// How to use it:
// Just do sales.method('endpoint') its almost the same as axios but you dont have to put the baseUrl in every request.

const cookies = new Cookies();

const sales = axios.create({
  baseURL: 'https://support.sales.techdog.cloud/api/',
});

try {
  sales.interceptors.request.use(config => {
    const token = cookies.get('token');
    if (token) {
      config.headers.ApiKey = token; // Adds the header to the request if it exists.
    }
    return config;
  });  
} catch (error) {
  console.error(`Unkown error:`, error);
}


export default sales;