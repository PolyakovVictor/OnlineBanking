import axios from 'axios'


export const AuthService: AuthService = {

    async register(data: userRegisterData) {
        try {
            const response = await axios.post(import.meta.env.VITE_API_URL + 'api/accounts/customers/', data);
            console.log('register response: ', response)
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
            localStorage.setItem("access_token", response.data.access);
            localStorage.setItem("refresh_token", response.data.refresh);
            return response;
        } catch (error) {
            console.error('Error when sending a request:', error);
            throw error;
        }
    },

    async refreshToken() {
        try {
            const response = await axios.post(import.meta.env.VITE_API_URL + 'users/api/token/refresh/', {
                    'refresh': localStorage.getItem('refresh_token'),
            });
            localStorage.setItem("access_token", response.data.access);
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
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
        } catch (error) {
            console.error('Error while removing tokens:', error);
            throw error;
        }
    },

    async sendEmailVerificationCode(data: EmailVerificationData) {
        try {
            const response = await axios.post(
                import.meta.env.VITE_API_URL + 'api/accounts/confirm-email',
                data,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`
                    }
                }
            );
            console.log(response.data)
            return response;
        } catch (error) {
            console.error('Error when sending a request:', error);
            throw error;
        }
    },
}