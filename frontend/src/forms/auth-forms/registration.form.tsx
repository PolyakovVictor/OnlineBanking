import React, { useState } from 'react';

const RegistrationForm: React.FC<{ onRegister: (userInfo: UserInfo) => void }> = ({ onRegister }) => {
  const [registrationStep, setRegistrationStep] = useState<'basicInfo' | 'emailConfirmation'>('basicInfo');
  const [userInfo, setUserInfo] = useState<UserInfo>({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    password: '',
    phoneNumber: '',
  });
  const [error, setError] = useState('');

  const handleSubmitBasicInfo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userInfo.firstName && userInfo.lastName && userInfo.email && userInfo.address && userInfo.password) {
      setRegistrationStep('emailConfirmation');
    } else {
      setError('Будь ласка, заповніть усі поля');
    }
  };

  const handleSubmitEmailConfirmation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userInfo.phoneNumber) {
      onRegister(userInfo);
    } else {
      setError('Будь ласка, заповніть усі поля');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [e.target.id]: e.target.value });
  };

  const renderBasicInfoForm = () => (
    <form onSubmit={handleSubmitBasicInfo}>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="form-outline">
            <input
              type="text"
              id="firstName"
              className="form-control"
              value={userInfo.firstName}
              onChange={handleInputChange}
            />
            <label className="form-label" htmlFor="firstName">
              Ім'я
            </label>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="form-outline">
            <input 
              type="text"
              id="lastName" 
              className="form-control"
              value={userInfo.lastName}
              onChange={handleInputChange}
            />
            <label className="form-label" htmlFor="lastName"> 
              Прізвище
            </label>
          </div>
        </div>
      </div>

      <div className="form-outline mb-4">
        <input 
          type="email"
          id="email" 
          className="form-control"
          value={userInfo.email}
          onChange={handleInputChange}
        />
        <label className="form-label" htmlFor="email"> 
          Адреса електронної пошти
        </label>
      </div>

      <div className="form-outline mb-4">
        <input 
          type="text" 
          id="address" 
          className="form-control"
          value={userInfo.address}
          onChange={handleInputChange} 
        />
        <label className="form-label" htmlFor="address"> 
          Адреса проживання
        </label>
      </div>

      <div className="form-outline mb-4">
        <input 
          type="password" 
          id="password" 
          className="form-control" 
          value={userInfo.password}
          onChange={handleInputChange}
        />
        <label className="form-label" htmlFor="password"> 
          Пароль
        </label>
      </div>

      <button type="submit" className="btn btn-primary btn-block mb-4">
        Далее
      </button>
    </form>
  );

  const renderEmailConfirmationForm = () => (
    <form onSubmit={handleSubmitEmailConfirmation}>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="form-outline mb-4">
        <input
          type="tel"
          id="phoneNumber"
          className="form-control"
          value={userInfo.phoneNumber}
          onChange={handleInputChange}
        />
        <label className="form-label" htmlFor="phoneNumber">
          Номер телефону
        </label>
      </div>
      
      <button type="submit" className="btn btn-primary btn-block mb-4">
        Подтвердить
      </button>
    </form>
  );

  return (
    <div>
      {registrationStep === 'basicInfo' ? renderBasicInfoForm() : renderEmailConfirmationForm()}
    </div>
  );
};

interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  password: string;
  phoneNumber?: string;
}

export default RegistrationForm;
