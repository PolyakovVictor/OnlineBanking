interface userRegisterData {
    username: string,
    first_name: string,
    last_name: string,
    address: string,
    email: string,
    password: string,
};

interface userLoginData {
    username: string,
    password: string,
};

interface EmailVerificationData {
    confirmation_code: string;
};

interface AuthService {
    getCookie(name: string): Promise<any>;
    register(userData: userRegisterData): Promise<any>;
    login(userData: userLoginData) : Promise<any>;
    refreshToken(): Promise<any>;
    logout(): void ;
    sendEmailVerificationCode(data: EmailVerificationData): Promise<any>;
};

interface CustomerAccountData{
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    phone_number: string
}

interface CustomerService {
    getCustomerInfo(): Promise<any>;
}

interface ProfileCustomerInfoPanel {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
  }
  
  interface Transaction {
    id: number;
    date: string;
    description: string;
    amount: number;
  }