import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const LoginForm: React.FC<{ onLogin: (data: userLoginData) => void }> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username && password) {
      setError('')
      const userLoginData = {
        'username': username,
        'password': password,
      }
      try {
        const response = await onLogin(userLoginData);
        if (response) {
          console.log("success login");
          navigate("/");
        }
      } catch (error) {
        setError(error.message);
      }
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

      <button type="submit" className="btn btn-primary btn-block mb-4">
        Увійти
      </button>
    </form>
  );
};

export default LoginForm;