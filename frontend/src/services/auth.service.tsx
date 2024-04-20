import axios from 'axios'


export const AuthService: AuthService = {

    async getCookie(name: string): Promise<string | undefined> {
        try {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
            return undefined;
        } catch (error) {
            console.error('Error when sending a request:', error);
            throw error;
        }
    },

    async register(data: userRegisterData) {
        try {
            const response = await axios.post(import.meta.env.VITE_API_URL + 'api/accounts/customers/', data);
            console.log('register response: ', response)
            document.cookie = `access_token=${response.data.access}; path=/`;
            document.cookie = `refresh_token=${response.data.refresh}; path=/`;
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
            document.cookie = `access_token=${response.data.access}; path=/`;
            document.cookie = `refresh_token=${response.data.refresh}; path=/`;
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
            document.cookie = `access_token=${response.data.access}; path=/`;
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
            document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            document.cookie = 'refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
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
                        Authorization: `Bearer ${this.getCookie('access_token')}`,
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