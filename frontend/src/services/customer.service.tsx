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
    async updateCustomerPhoneNumber(phone_number) {
        const data = {'phone_number': phone_number}
        try {
            const response = await axiosInstance.put(
                import.meta.env.VITE_API_URL + 'api/accounts/customers/me/',
                data,
                {
                    headers: {
                        Authorization: `Bearer ${await AuthService.getCookie('access_token')}`,
                        'Content-Type': 'application/json',
                    }
                }
            );
            window.location.reload();
            return await response.data;
        } catch (error) {
            console.error('Error when sending a request:', error);
            throw error;
        }
    },
    async sendMoneyTransfer(data: MoneyTransferFormData) {
        const user_data = this.getCustomerInfo() 
        try {
            data.from_account_number = (await user_data).account.account_number.toString()
            const response = await axiosInstance.post(
                import.meta.env.VITE_API_URL + 'api/transactions/transfer/',
                data,
                {
                    headers: {
                        Authorization: `Bearer ${await AuthService.getCookie('access_token')}`,
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
    },
    
    async sendDeposit(data: DepositData) {
        try {
            const response = await axiosInstance.post(
                import.meta.env.VITE_API_URL + 'api/transactions/deposits/',
                data,
                {
                    headers: {
                        Authorization: `Bearer ${await AuthService.getCookie('access_token')}`,
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
    },

    async sendCredit(data: CreditData) {
        try {
            const response = await axiosInstance.post(
                import.meta.env.VITE_API_URL + 'api/transactions/credits/',
                data,
                {
                    headers: {
                        Authorization: `Bearer ${await AuthService.getCookie('access_token')}`,
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
    },

    async getCustomerTransaction() {
        try {
            const response = await axiosInstance.get(
                import.meta.env.VITE_API_URL + 'api/transactions/',
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

    async getCustomerCredit() {
        try {
            const response = await axiosInstance.get(
                import.meta.env.VITE_API_URL + 'api/transactions/credits/',
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

    async getCustomerDeposit() {
        try {
            const response = await axiosInstance.get(
                import.meta.env.VITE_API_URL + 'api/transactions/deposits/',
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