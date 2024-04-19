import axios from 'axios'

function getCookie(name:string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

const csrftoken = getCookie('csrftoken');

axios.defaults.headers.common['X-CSRFToken'] = csrftoken;

export const AuthService: AuthService = {

    async register(data: userRegisterData) {
        try {
            const response = await axios.post(import.meta.env.VITE_API_URL + 'api/accounts/customers/', data);
            console.log('register response: ', response)
            localStorage.setItem("access_token", response.data.access);
            localStorage.setItem("refresh_token", response.data.refresh);
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
            console.log(localStorage.getItem('access_token'))
            const csrfToken = getCookie('csrftoken');
            const response = await axios.post(
                import.meta.env.VITE_API_URL + 'api/accounts/confirm-email',
                data,
                {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
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