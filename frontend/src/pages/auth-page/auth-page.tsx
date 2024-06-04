import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import LoginForm from '../../forms/auth-forms/login.form';
import RegistrationForm from '../../forms/auth-forms/registration.form';
import { AuthService } from "../../services/auth.service";


const AuthPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'registration'>('login');

  const handleLogin = async (data: userLoginData) => {
    console.log('Вхід:', data.username, data.password);
    const response = await AuthService.login(data);
    return response;
  };

  const handleRegistration = async (data: userRegisterData) => {
    console.log('Реєстрація:', data.email, data.password);
    const response = await AuthService.register(data);
    return response;
  };

  const handleConfirmCode = async (confirmation_code: string) => {
    console.log('handleConfirmCode ', confirmation_code)
    const data = {
      'confirmation_code': confirmation_code
    }
    const response = await AuthService.sendEmailVerificationCode(data);
    return response;
  };

  return (
    <>
    <Navbar/>
    <section className="">
    <div className="px-4 py-5 px-md-5 text-center text-lg-start">
      <div className="container">
        <div className="row gx-lg-5 align-items-center">
          <div className="col-lg-6 mb-5 mb-lg-0">
            <h1 className="my-5 display-3 fw-bold ls-tight">
              Ласкаво просимо<br />
              <span className="text-primary">в Онлайн Банкінг</span>
            </h1>
            <p style={{ color: 'hsl(217, 10%, 50.8%)'}}>
              Будь ласка, увійдіть у свій обліковий запис, щоб отримати доступ до всіх функцій нашого онлайн-банкінгу.
            </p>
          </div>
  
          <div className="col-lg-6 mb-5 mb-lg-0">
            <div className="card">
              <div className="card-body py-5 px-md-5">
                <ul className="nav nav-tabs">
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === 'login' ? 'active' : ''}`}
                      onClick={() => setActiveTab('login')}
                    >
                      Вхід
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === 'registration' ? 'active' : ''}`}
                      onClick={() => setActiveTab('registration')}
                    >
                      Реєстрація
                    </button>
                  </li>
                </ul>
                <div className="tab-content">
                  <div className={`tab-pane fade ${activeTab === 'login' ? 'show active' : ''}`}>
                    <h2 className="mt-3">Форма входу</h2>
                    <LoginForm onLogin={handleLogin} />
                  </div>
                  <div className={`tab-pane fade ${activeTab === 'registration' ? 'show active' : ''}`}>
                    <h2 className="mt-3">Форма реєстрації</h2>
                    <RegistrationForm onRegister={handleRegistration} onConfirmCode={handleConfirmCode}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </section>
    </>
  );
};

export default AuthPage;