import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import LoginForm from '../../forms/auth-forms/login.form';
import RegistrationForm from '../../forms/auth-forms/registration.form';
import { AuthService } from "../../service/auth.service";


const AuthPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'registration'>('login');

  const handleLogin = async (email: string, password: string, phone: string) => {
    console.log('Вхід:', email, password);
    const response = await AuthService.login(phone, email, password);
    return response
  };

  const handleRegistration = async (username: string, password: string) => {
    console.log('Реєстрація:', username, password);
    const response = await AuthService.register()
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
              The best offer <br />
              <span className="text-primary">for your business</span>
            </h1>
            <p style={{ color: 'hsl(217, 10%, 50.8%)'}}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Eveniet, itaque accusantium odio, soluta, corrupti aliquam
              quibusdam tempora at cupiditate quis eum maiores libero
              veritatis? Dicta facilis sint aliquid ipsum atque?
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
                    <RegistrationForm onRegister={handleRegistration} />
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