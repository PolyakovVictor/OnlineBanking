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
    phone_number: string,
    account: {
        account_number: number
        account_type: string
        balance: number
    }
    transactions: Transaction[]
}

interface CustomerService {
    getCustomerInfo(): Promise<CustomerAccountData>;
    sendMoneyTransfer(data: MoneyTransferFormData): Promise<any>;
    getCustomerTransaction(): Promise<TransactionResponse>
}

interface ProfileCustomerInfoPanel {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
}
  
interface Transaction {
    from_account_number: string;
    to_account_number: string;
    amount: string;
    description: string;
    category: string;
    date: string;
}
  
interface TransactionResponse {
    sender: Transaction[];
    receiver: Transaction[];
}

interface AccountInfoProps {
    balance: number;
    account_number: string;
}

interface MoneyTransferFormProps {
    onSubmit: (data: MoneyTransferFormData) => void;
}
  
interface MoneyTransferFormData {
    from_account_number: string;
    to_account_number: string;
    amount: number;
    category?: string;
    description?: string;
}