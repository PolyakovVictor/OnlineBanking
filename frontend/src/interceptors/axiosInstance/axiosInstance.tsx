import axios, { AxiosError } from 'axios'
import { AuthService } from '../../services/auth.service';

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
    response => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response && error.response.status === 401) {
        AuthService.refreshToken()
        console.log('Error 401: token not valid');
      }
      return Promise.reject(error);
    }
  );
  
  export default axiosInstance;