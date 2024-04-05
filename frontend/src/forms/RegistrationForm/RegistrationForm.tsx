import React, { useState } from 'react';

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
        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="form-outline">
              <input type="text" id="form3Example1" className="form-control" />
              <label className="form-label" htmlFor="form3Example1">Ім'я</label>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="form-outline">
              <input type="text" id="form3Example2" className="form-control" />
              <label className="form-label" htmlFor="form3Example2">Прізвище</label>
            </div>
          </div>
        </div>
  
        <div className="form-outline mb-4">
          <input type="email" id="form3Example3" className="form-control" />
          <label className="form-label" htmlFor="form3Example3">Адреса електронної пошти</label>
        </div>
  
        <div className="form-outline mb-4">
          <input type="password" id="form3Example4" className="form-control" />
          <label className="form-label" htmlFor="form3Example4">Пароль</label>
        </div>
  
        <div className="form-check d-flex justify-content-center mb-4">
          <input className="form-check-input me-2" type="checkbox" value="" id="form2Example33" checked />
          <label className="form-check-label" htmlFor="form2Example33">
            Subscribe to our newsletter
          </label>
        </div>
  
        <button type="submit" className="btn btn-primary btn-block mb-4">
          Зареєструватися
        </button>
      </form>
    );
  };

export default RegistrationForm;