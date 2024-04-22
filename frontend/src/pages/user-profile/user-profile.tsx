import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { CustomerService } from '../../services/customer.service';
import CustomerInfoPanel from '../../components/profile-customer-info-panel/profile-customer-info-panel';


const UserProfile: React.FC = () => {
  const [customerData, setCustomerData] = useState<CustomerAccountData | null>(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchCustomerInfo = async () => {
      try {
        const data = await CustomerService.getCustomerInfo();
        setCustomerData(data);
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
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Баланс рахунку</h5>
            <p className="card-text">
              <strong>Поточний баланс:</strong> {userAccount.balance.toFixed(2)}
            </p>
            <button className="btn btn-success">Поповнити рахунок</button>
          </div>
        </div>
        <div className="card mt-4">
          <div className="card-body">
            <h5 className="card-title">Останні транзакції</h5>
            <table className="table">
              <thead>
                <tr>
                  <th>Дата</th>
                  <th>Опис</th>
                  <th>Сума</th>
                </tr>
              </thead>
              <tbody>
                {userAccount.transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.date}</td>
                    <td>{transaction.description}</td>
                    <td>{transaction.amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
  );
};

export default UserProfile;