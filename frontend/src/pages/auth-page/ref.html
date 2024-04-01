import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';

const LoginForm: React.FC<{ onLogin: (username: string, password: string) => void }> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Ваша логіка входу
    if (username && password) {
      onLogin(username, password);
    } else {
      setError('Введіть ім\'я користувача та пароль');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="form-group">
        <label htmlFor="login-username">Ім'я користувача</label>
        <input
          type="text"
          className="form-control"
          id="login-username"
          placeholder="Введіть ім'я користувача"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="login-password">Пароль</label>
        <input
          type="password"
          className="form-control"
          id="login-password"
          placeholder="Введіть пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Увійти
      </button>
    </form>
  );
};

const RegistrationForm: React.FC<{ onRegister: (username: string, password: string) => void }> = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Ваша логіка реєстрації
    if (username && password) {
      onRegister(username, password);
    } else {
      setError('Введіть ім\'я користувача та пароль');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="form-group">
        <label htmlFor="reg-username">Ім'я користувача</label>
        <input
          type="text"
          className="form-control"
          id="reg-username"
          placeholder="Введіть ім'я користувача"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="reg-password">Пароль</label>
        <input
          type="password"
          className="form-control"
          id="reg-password"
          placeholder="Введіть пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Зареєструватися
      </button>
    </form>
  );
};

const AuthPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'registration'>('login');

  const handleLogin = (username: string, password: string) => {
    // Логіка входу
    console.log('Вхід:', username, password);
  };

  const handleRegister = (username: string, password: string) => {
    // Логіка реєстрації
    console.log('Реєстрація:', username, password);
  };

  return (
    <>
    <Navbar/>
    <div className="container mt-5">
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
          <RegistrationForm onRegister={handleRegister} />
        </div>
      </div>
    </div>
    </>
  );
};

export default AuthPage;