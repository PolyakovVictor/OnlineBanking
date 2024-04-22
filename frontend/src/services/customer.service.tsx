import axios from 'axios'
import { AuthService } from './auth.service';
import axiosInstance from '../interceptors/axiosInstance/axiosInstance';


export const CustomerService: CustomerService = {

    async getCustomerInfo() {
        try {
            const response = await axiosInstance.get(
                import.meta.env.VITE_API_URL + 'api/accounts/customers/me/',
                {
                    headers: {
                        Authorization: `Bearer ${await AuthService.getCookie('access_token')}`,
                        'Content-Type': 'application/json',
                    }
                }
            );
            return await response.data;
        } catch (error) {
            console.error('Error when sending a request:', error);
            throw error;
        }
    },
}