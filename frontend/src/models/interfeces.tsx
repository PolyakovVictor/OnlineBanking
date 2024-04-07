interface userRegisterData {
    username: string,
    first_name: string,
    last_name: string,
    address: string,
    phone_number: string;
    email: string,
    password: string,
}

interface userLoginData {
    username: string,
    password: string,
}

interface AuthService {
    register(userData: userRegisterData): Promise<any>;
    login(userData: userLoginData) : Promise<any>;
    refreshToken(): Promise<any>;
    logout(): void ;
}