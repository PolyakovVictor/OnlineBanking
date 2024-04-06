import React, { useState } from 'react';

const LoginForm: React.FC<{ onLogin: (username: string, password: string) => void }> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (username && password) {
        setError('')
        console.log(onLogin(username, password));
      } else {
        setError('Введіть ім\'я користувача та пароль');
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}
  
        <div className="form-outline mb-4">
          <input 
            type="text" 
            id="form3Example3" 
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
             />
          <label className="form-label" htmlFor="form3Example3">
              Адреса електронної пошти або номер телефону
          </label>
        </div>
  
        <div className="form-outline mb-4">
          <input 
            type="password" 
            id="form3Example4" 
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
             />
          <label className="form-label" htmlFor="form3Example4">Пароль</label>
        </div>
  
        <div className="form-check d-flex justify-content-center mb-4">
          <input className="form-check-input me-2" type="checkbox" value="" id="form2Example33" checked />
          <label className="form-check-label" htmlFor="form2Example33">
            Subscribe to our newsletter
          </label>
        </div>
  
        <button type="submit" className="btn btn-primary btn-block mb-4">
          Увійти
        </button>
      </form>
    );
  };

export default LoginForm;