import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import CreditCalc from '../../components/service-credit-calc/credit-calc';
import InvestmentCalc from '../../components/service-investment-calc/investment-calc';
import MoneyTransferForm from '../../components/service-money-transfers/service-money-transfers';
import { CustomerService } from '../../services/customer.service';
import NotificationModal from '../../components/modal-notification-window/modal-notification-window';
import DepositCalc from '../../components/service-deposit-calc/deposite-calc';

const OtherServices: React.FC = () => {
  return (
    <div>
      <h3>Інші послуги</h3>
      <ul>
        <li>Грошові перекази</li>
        <li>Оплата послуг</li>
        <li>Валютні операції</li>
      </ul>
    </div>
  );
};

const ServicePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'credit' | 'deposit' | 'investment' | 'other' | 'moneyTransfer'>('credit');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState<'credit' | 'deposit' | 'moneyTransfer' | 'error' | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (data: MoneyTransferFormData) => {
    try {
      const response = await CustomerService.sendMoneyTransfer(data);
      if (response.status === 200) {
        setShowNotification(true);
        setNotificationType('moneyTransfer');
        console.log('Submitted data:', response);
      }
    } catch (error) {
      setErrorMessage('Виникла помилка при відправці грошового переказу.');
      setShowNotification(true);
      setNotificationType('error');
    }
  };

  const handleDespositSubmit = async (data: DepositData) => {
    try {
      const response = await CustomerService.sendDeposit(data);
      if (response.status === 201) {
        setShowNotification(true);
        setNotificationType('deposit');
        console.log('Deposit submit:', response);
      }
    } catch (error) {
      setErrorMessage('Виникла помилка при відкритті депозиту.');
      setShowNotification(true);
      setNotificationType('error');
    }
  };

  const handleCreditSubmit = async (data: CreditData) => {
    try {
      const response = await CustomerService.sendCredit(data);
      if (response.status === 201) {
        setShowNotification(true);
        setNotificationType('credit');
        console.log('Credit submit:', response);
      }
    } catch (error) {
      setErrorMessage('Виникла помилка при оформленні кредиту.');
      setShowNotification(true);
      setNotificationType('error');
    }
  };

  const handleModalClose = () => {
    setShowNotification(false);
    setNotificationType(null);
    setErrorMessage(null);
  };

  return (
    <>
      <Navbar/>
      {showNotification && (
        <NotificationModal title="Повідомлення" duration={15000} onClose={handleModalClose}>
          <div className="notification-content">
            {notificationType === 'error' ? (
              <p>{errorMessage}</p>
            ) : (
              <>
                {notificationType === 'credit' && (
                  <p>Вітання! Ваш кредит успішно оформлений!</p>
                )}
                {notificationType === 'deposit' && (
                  <p>Вітання! Ваш депозит успішно оформлений!</p>
                )}
                {notificationType === 'moneyTransfer' && (
                  <p>Вітання! Ваш грошовий переказ успішно відправлений!</p>
                )}
              </>
            )}
            <div className="buttons-container">
              <button className="btn btn-primary" type="button" onClick={handleModalClose}>
                <span className="icon-primary">Ок</span>
              </button>
            </div>
          </div>
        </NotificationModal>
      )}
      <div className="container mt-5">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'credit' ? 'active' : ''}`}
              onClick={() => setActiveTab('credit')}
            >
              Кредити
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'deposit' ? 'active' : ''}`}
              onClick={() => setActiveTab('deposit')}
            >
              Депозити
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'investment' ? 'active' : ''}`}
              onClick={() => setActiveTab('investment')}
            >
              Інвестиції
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'moneyTransfer' ? 'active' : ''}`}
              onClick={() => setActiveTab('moneyTransfer')}
            >
              Грошові перекази
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'other' ? 'active' : ''}`}
              onClick={() => setActiveTab('other')}
            >
              Інші послуги
            </button>
          </li>
        </ul>
        <div className="tab-content">
          <div className={`tab-pane fade ${activeTab === 'credit' ? 'show active' : ''}`}>
            <div className="container py-5">
              <CreditCalc
                onSubmit={handleCreditSubmit}
                currency="€"
                minLoanAmount={1000}
                maxLoanAmount={100000}
                minTerm={1}
                maxTerm={30}
                annualInterestRate={8}
              />
            </div>
          </div>
          <div className={`tab-pane fade ${activeTab === 'deposit' ? 'show active' : ''}`}>
            <div className='container py-5'>
              <DepositCalc
                onSubmit={handleDespositSubmit}
                initialDeposit={1000}
                currency="€"
                minDeposit={1000}
                maxTerm={60}
                annualInterestRate={15}
                taxRate={12.07}
              />
            </div>
          </div>
          <div className={`tab-pane fade ${activeTab === 'investment' ? 'show active' : ''}`}>
            <div className="container py-5">
              <InvestmentCalc
                currency="€"
                minInvestment={1000}
                expectedAnnualReturn={7}
              />
            </div>
          </div>
          <div className={`tab-pane fade ${activeTab === 'moneyTransfer' ? 'show active' : ''}`}>
            <div className="container py-5">
              <MoneyTransferForm onSubmit={handleSubmit} />
            </div>
          </div>
          <div className={`tab-pane fade ${activeTab === 'other' ? 'show active' : ''}`}>
            <OtherServices />
          </div>
        </div>
      </div>
    </>
  );
};

export default ServicePage;
