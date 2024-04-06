import axios from 'axios'


export const AuthService: AuthService = {

    async register(data: userRegisterData) {
        try {
            const response = await axios.post(import.meta.env.VITE_API_URL + 'api/accounts/customers/', data);
            return response;
        } catch (error) {
            console.error('Error when sending a request:', error);
            throw error;
        }
    },

    async login(data: userLoginData) {
        try {
            const response = await axios.post(import.meta.env.VITE_API_URL + 'api/token/', data);
            console.log(response.data.access)
            localStorage.setItem("accessToken", response.data.access);
            localStorage.setItem("refreshToken", response.data.refresh);
            return response;
        } catch (error) {
            console.error('Error when sending a request:', error);
            throw error;
        }
    },

    async refreshToken() {
        try {
            const response = await axios.post(import.meta.env.VITE_API_URL + 'users/api/token/refresh/', {
                    'refresh': localStorage.getItem('refreshToken'),
            });
            localStorage.setItem("accessToken", response.data.access);
            console.log('access token refreshed')
        } catch (error) {
            if (error.response.status == 401) {
                this.logout()
            }
            console.error('Error when sending a request:', error);
            throw error;
        }
    },

    async logout() {
        try {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        } catch (error) {
            console.error('Error while removing tokens:', error);
            throw error;
        }
    },
}