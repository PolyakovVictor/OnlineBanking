import React, { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const TransactionPanel: React.FC<TransactionResponse> = ({ sender, receiver }) => {
  const [key, setKey] = useState('sender');

  const formatDateTime = (dateTimeString: string) => {
    const dateTime = new Date(dateTimeString);
    return `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`;
  };

  return (
    <>
      <div className="card mt-4">
        <div className="card-body">
          <h5 className="card-title">Останні транзакції</h5>
          <Tabs activeKey={key} onSelect={(k) => setKey(k || 'sender')} id="transaction-tabs">
            <Tab eventKey="sender" title="Відправлені">
              <table className="table">
                <thead>
                  <tr>
                    <th>Дата</th>
                    <th>Відправник</th>
                    <th>Опис</th>
                    <th>Сума</th>
                    <th>Категорія</th>
                  </tr>
                </thead>
                <tbody>
                  {sender.map((transaction, index) => (
                    <tr key={`sender-${index}`}>
                      <td>{formatDateTime(transaction.date)}</td>
                      <td>{transaction.from_account_number}</td>
                      <td>{transaction.description}</td>
                      <td>{transaction.amount}</td>
                      <td>{transaction.category}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Tab>
            <Tab eventKey="receiver" title="Отримані">
              <table className="table">
                <thead>
                  <tr>
                    <th>Дата</th>
                    <th>Отримувач</th>
                    <th>Опис</th>
                    <th>Сума</th>
                    <th>Категорія</th>
                  </tr>
                </thead>
                <tbody>
                  {receiver.map((transaction, index) => (
                    <tr key={`receiver-${index}`}>
                      <td>{formatDateTime(transaction.date)}</td>
                      <td>{transaction.to_account_number}</td>
                      <td>{transaction.description}</td>
                      <td>{transaction.amount}</td>
                      <td>{transaction.category}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default TransactionPanel;
