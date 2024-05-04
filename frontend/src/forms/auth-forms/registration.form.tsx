import React, { useState } from 'react';

const RegistrationForm: React.FC<{ onRegister: (data: userRegisterData) => any, onConfirmCode: (confirmation_code: string) => void}> = ({ onRegister, onConfirmCode }) => {
  const [registrationStep, setRegistrationStep] = useState<'basicInfo' | 'emailConfirmation'>('basicInfo');
  const [data, setData] = useState<userRegisterData>({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    address: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [emailConfirmCode, setEmailConfirmCode] = useState('')

  const handleSubmitBasicInfo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (data.first_name && data.last_name && data.email && data.address && data.password) {
      data.username = data.email;
      try {
        const response = await onRegister(data);
        if (response.status !== 201) {
          setError(response.data);
        } else {
          console.log('emailConfirm')
          setError('')
          setRegistrationStep('emailConfirmation');
        }
      } catch (error) {
        setError((error as Error).message);
      }
    } else {
      setError('Будь ласка, заповніть усі поля');
    }
  };

  const handleSubmitEmailConfirmation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (emailConfirmCode) {
      onConfirmCode(emailConfirmCode)
      console.log('phone number step', emailConfirmCode)
      
    } else {
      setError('Будь ласка, заповніть усі поля');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const handleConfirmCodeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailConfirmCode(e.target.value);
  };

  const renderBasicInfoForm = () => (
    <form onSubmit={handleSubmitBasicInfo}>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="form-outline">
            <input
              type="text"
              id="first_name"
              className="form-control"
              value={data.first_name}
              onChange={handleInputChange}
            />
            <label className="form-label" htmlFor="first_name">
              Ім'я
            </label>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="form-outline">
            <input 
              type="text"
              id="last_name" 
              className="form-control"
              value={data.last_name}
              onChange={handleInputChange}
            />
            <label className="form-label" htmlFor="last_name"> 
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
          value={data.email}
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
          value={data.address}
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
          value={data.password}
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
          type="text"
          id="verif_code"
          className="form-control"
          value={emailConfirmCode}
          onChange={handleConfirmCodeInputChange}
        />
        <label className="form-label" htmlFor="verif_code">
          Код з електронної пошти
        </label>
      </div>
      
      <button type="submit" className="btn btn-primary btn-block mb-4">
        Підтвердити
      </button>
    </form>
  );

  return (
    <div>
      {registrationStep === 'basicInfo' ? renderBasicInfoForm() : renderEmailConfirmationForm()}
    </div>
  );
};


export default RegistrationForm;
