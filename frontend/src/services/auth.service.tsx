import { AxiosError } from 'axios';
import axiosInstance from '../interceptors/axiosInstance/axiosInstance';


export const AuthService: AuthService = {

    async getCookie(name: string): Promise<string | undefined> {
        try {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) {
                const cookieValue = parts.pop();
                if (cookieValue) {
                    return cookieValue.split(';').shift();
                }
            }
            return undefined;
        } catch (error) {
            console.error('Error when sending a request:', error);
            throw error;
        }
    },

    async register(data: userRegisterData) {
        try {
            const response = await axiosInstance.post(import.meta.env.VITE_API_URL + 'api/accounts/customers/', data);
            console.log('register response: ', response)
            await this.login({'username': data.username, 'password': data.password})
            return response;
        } catch (error) {
            console.error('Error when sending a request:', error);
            throw error;
        }
    },

    async login(data: userLoginData) {
        try {
            const response = await axiosInstance.post(import.meta.env.VITE_API_URL + 'api/token/', data);
            console.log(response.data)
            document.cookie = `access_token=${response.data.access}; path=/`;
            document.cookie = `refresh_token=${response.data.refresh}; path=/`;
            localStorage.setItem('customer_id', response.data.id);
            return response;
        } catch (error) {
            console.error('Error when sending a request:', error);
            throw error;
        }
    },

    async refreshToken() {
        try {
            const response = await axiosInstance.post(import.meta.env.VITE_API_URL + 'api/token/refresh/', {
                'refresh': await AuthService.getCookie('refresh_token')
            });
            document.cookie = `access_token=${response.data.access}; path=/`;
            console.log('access token refreshed')
        } catch (error) {
            if ((error as AxiosError).response?.status == 401) {
                this.logout()
            }
            console.error('Error when sending a request:', error);
            throw error;
        }
    },

    async logout() {
        try {
            document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            document.cookie = 'refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            window.location.replace('/')
        } catch (error) {
            console.error('Error while removing tokens:', error);
            throw error;
        }
    },

    async sendEmailVerificationCode(data: EmailVerificationData) {
        try {
            const response = await axiosInstance.post(
                import.meta.env.VITE_API_URL + 'api/accounts/confirm-email',
                data,
                {
                    headers: {
                        Authorization: `Bearer ${await this.getCookie('access_token')}`,
                        'Content-Type': 'application/json',
                    }
                }
            );
            console.log(response.data);
            return response;
        } catch (error) {
            console.error('Error when sending a request:', error);
            throw error;
        }
      }
}