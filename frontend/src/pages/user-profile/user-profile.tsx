import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { CustomerService } from '../../services/customer.service';
import CustomerInfoPanel from '../../components/profile-customer-info-panel/profile-customer-info-panel';
import AccountInfoPanel from '../../components/profile-account-info-panel/profile-account-info-panel';
import TransactionPanel from '../../components/profile-account-transactions-panel/profile-account-transactions-panel';
import ProfileServicesList from '../../components/profile-services-list.tsx/profile-services-list';
import ProfileCreditPanel from '../../components/profile-credit-panel/profile-credit-panel';


const UserProfile: React.FC = () => {
  const [customerData, setCustomerData] = useState<CustomerAccountData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [transactionsResponse, setTransactionsResponse] = useState<TransactionResponse | null>(null);
  const [selectedService, setSelectedService] = useState('transactions');
  const [creditResponse, setCreditResponse] = useState<CreditData[] | null>(null);


  useEffect(() => {
    const fetchCustomerInfo = async () => {
      try {
        const responseCustomer = await CustomerService.getCustomerInfo();
        setCustomerData(responseCustomer);
        const responseTransaction = await CustomerService.getCustomerTransaction();
        setTransactionsResponse(responseTransaction);
        const responseCredit = await CustomerService.getCustomerCredit();
        setCreditResponse(responseCredit);
      } catch (error) {
        console.error('Error fetching customer info:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomerInfo();
  }, []);

  return (
    <>
      <Navbar/>
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
              <AccountInfoPanel balance={customerData.account.balance} account_number={customerData.account.account_number} />
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

              {/* {isLoading ? (
                <div>Loading...</div>
              ) : transactionsResponse ? (
                <>
                  {selectedService === 'transactions' && (
                    <TransactionPanel {...transactionsResponse} />
                  )}
                </>
              ) : (
                <div>No customer data available</div>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;