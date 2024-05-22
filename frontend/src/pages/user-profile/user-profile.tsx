import React, { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import Navbar from '../../components/Navbar/Navbar';
import { CustomerService } from '../../services/customer.service';
import CustomerInfoPanel from '../../components/profile-customer-info-panel/profile-customer-info-panel';
import AccountInfoPanel from '../../components/profile-account-info-panel/profile-account-info-panel';
import TransactionPanel from '../../components/profile-account-transactions-panel/profile-account-transactions-panel';
import ProfileServicesList from '../../components/profile-services-list.tsx/profile-services-list';
import ProfileCreditPanel from '../../components/profile-credit-panel/profile-credit-panel';
import ProfileDepositPanel from '../../components/profile-deposit-panel/profile-deposit-panel';
import NotificationModal from '../../components/modal-notification-window/modal-notification-window';


const UserProfile: React.FC = () => {
  const [customerData, setCustomerData] = useState<CustomerAccountData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [transactionsResponse, setTransactionsResponse] = useState<TransactionResponse | null>(null);
  const [selectedService, setSelectedService] = useState('transactions');
  const [creditResponse, setCreditResponse] = useState<CreditData[] | null>(null);
  const [depositResponse, setDepositResponse] = useState<DepositsResponse[] | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState<'phone' | 'deposit' | 'moneyTransfer' | null>(null);
  const [phone_number, setPhone_number] = useState<string | undefined>('');


  useEffect(() => {
    const fetchCustomerInfo = async () => {
      try {
        const responseCustomer = await CustomerService.getCustomerInfo();
        setCustomerData(responseCustomer);
        const responseTransaction = await CustomerService.getCustomerTransaction();
        setTransactionsResponse(responseTransaction);
        const responseCredit = await CustomerService.getCustomerCredit();
        setCreditResponse(responseCredit);
        const responseDeposit = await CustomerService.getCustomerDeposit();
        setDepositResponse(responseDeposit);
      } catch (error) {
        console.error('Error fetching customer info:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomerInfo();
  }, []);

  const handlePhoneSubmit = async () => {
    if (phone_number){
      const response = await CustomerService.updateCustomerPhoneNumber(phone_number);
      if (response.status === 201) {
        handleModalClose();
        console.log('phone updated:', response);
      }
    }
  };

  const handleTopup = async (data: TopupData) => {
    const response = await CustomerService.sendTopup(data);
    if (response.status === 201) {
      console.log('TopUp submit:', response);
    }
};

  const handlePhoneNumberUpdate = async () => {
    setShowNotification(true);
    setNotificationType('phone');
  };

  const handleModalClose = () => {
    setShowNotification(false);
    setNotificationType(null);
  };

  return (
    <>
      <Navbar/>
      {showNotification && (
        <NotificationModal title="Повідомлення" duration={60000} onClose={handleModalClose}>
          <div className="notification-content">
            {notificationType === 'phone' && (
              <p>Введіть будь ласка ваш номер телефону</p>
            )}
            <InputMask
              mask="+38 (999) 999-99-99"
              maskChar="_"
              type="tel"
              id="form3Example3"
              className="form-control"
              value={phone_number}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone_number(e.target.value)}
            />
            <div className="buttons-container mt-4">
              <button className="btn btn-primary pl-4 pr-4" type="button" onClick={handlePhoneSubmit}>
                <span className="icon-primary">Ок</span>
              </button>
            </div>
          </div>
        </NotificationModal>
      )}
      <div className="container my-5">
        <div className="row">
          <div className="col-md-4">
            {isLoading ? (
              <div>Loading...</div>
            ) : customerData ? (
              <CustomerInfoPanel
                first_name={customerData.first_name}
                last_name={customerData.last_name}
                email={customerData.email}
                phone_number={customerData.phone_number}
                handlePhoneNumberUpdate={handlePhoneNumberUpdate}
              />
            ) : (
              <div>No customer data available</div>
            )}

            <ProfileServicesList setSelectedService={setSelectedService}/>
          </div>
          <div className="col-md-8">
            {isLoading ? (
              <div>Loading...</div>
            ) : customerData ? (
              <AccountInfoPanel onSubmit={handleTopup} balance={customerData.account.balance} account_number={customerData.account.account_number} />
            ) : (
              <div>No customer data available</div>
            )}

            <div className="card mt-4">
              {isLoading ? (
                <div>Loading...</div>
              ) : transactionsResponse ? (
                <>
                  {selectedService === 'transactions' && (
                    <TransactionPanel {...transactionsResponse} />
                  )}
                </>
              ) : (
                <div>No customer data available</div>
              )}

              {isLoading ? (
                <div>Loading...</div>
              ) : creditResponse ? (
                <>
                  {selectedService === 'credit' && <ProfileCreditPanel credits={creditResponse} />}
                </>
              ) : (
                <div>No customer data available</div>
              )}

              {isLoading ? (
                <div>Loading...</div>
              ) : depositResponse ? (
                <>
                  {selectedService === 'deposit' && (
                    <ProfileDepositPanel deposits={depositResponse} />
                  )}
                </>
              ) : (
                <div>No customer data available</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;