import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { CustomerService } from '../../services/customer.service';
import CustomerInfoPanel from '../../components/profile-customer-info-panel/profile-customer-info-panel';
import AccountInfoPanel from '../../components/profile-account-info-panel/profile-account-info-panel';
import TransactionPanel from '../../components/profile-account-transactions-panel/profile-account-transactions-panel';


const UserProfile: React.FC = () => {
  const [customerData, setCustomerData] = useState<CustomerAccountData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [transactionsResponse, setTransactionsResponse] = useState<TransactionResponse | null>(null);


  useEffect(() => {
    const fetchCustomerInfo = async () => {
      try {
        const responseCustomer = await CustomerService.getCustomerInfo();
        setCustomerData(responseCustomer);
        const responseTransaction = await CustomerService.getCustomerTransaction();
        setTransactionsResponse(responseTransaction);
      } catch (error) {
        console.error('Error fetching customer info:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomerInfo();
  }, []);



  const userAccount: CustomerAccount = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 123 456 7890',
    balance: 5000.0,
    transactions: [
      { id: 1, date: '2023-03-25', description: 'Salary', amount: 3000.0 },
      { id: 2, date: '2023-03-22', description: 'Groceries', amount: -200.0 },
      { id: 3, date: '2023-03-20', description: 'Online Shopping', amount: -150.0 },
    ],
  };

  return (
    <>
    <Navbar/>
    <div className="container my-5">
    <div className="row">
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
      <div className="col-md-8">
        {isLoading ? (
          <div>Loading...</div>
        ) : customerData ? (
          <AccountInfoPanel balance={customerData.account.balance} />
        ) : (
          <div>No customer data available</div>
        )}

        {isLoading ? (
          <div>Loading...</div>
        ) : transactionsResponse ? (
          <TransactionPanel {...transactionsResponse} />
        ) : (
          <div>No customer data available</div>
        )}
      </div>
    </div>
    </div>
    </>
  );
};

export default UserProfile;