interface userRegisterData {
    username: string,
    first_name: string,
    last_name: string,
    address: string,
    email: string,
    password: string,
}

interface userLoginData {
    username: string,
    password: string,
}

interface EmailVerificationData {
    confirmation_code: string;
}

interface AuthService {
    register(userData: userRegisterData): Promise<any>;
    login(userData: userLoginData) : Promise<any>;
    refreshToken(): Promise<any>;
    logout(): void ;
    sendEmailVerificationCode(data: EmailVerificationData): void;
}