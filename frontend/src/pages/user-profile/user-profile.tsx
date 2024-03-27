import React from 'react';
import Navbar from '../../components/Navbar/Navbar';

interface UserAccount {
  name: string;
  email: string;
  phone: string;
  balance: number;
  transactions: Transaction[];
}

interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: number;
}

const UserProfile: React.FC = () => {
  const userAccount: UserAccount = {
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
      <div className="col-md-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Особиста інформація</h5>
            <p className="card-text">
              <strong>Ім'я:</strong> {userAccount.name}
            </p>
            <p className="card-text">
              <strong>Email:</strong> {userAccount.email}
            </p>
            <p className="card-text">
              <strong>Телефон:</strong> {userAccount.phone}
            </p>
            <button className="btn btn-primary">Змінити інформацію</button>
          </div>
        </div>
      </div>
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