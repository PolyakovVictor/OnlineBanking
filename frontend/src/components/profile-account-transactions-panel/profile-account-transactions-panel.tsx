import React, { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const TransactionPanel: React.FC<TransactionResponse> = ({ sender, receiver }) => {
  const [key, setKey] = useState('sender');
  const [sortBy, setSortBy] = useState<keyof Transaction>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const sortTransactions = (transactions: Transaction[]) => {
    return transactions.sort((a, b) => {
      if (a[sortBy] === b[sortBy]) {
        return 0;
      }
      if (sortOrder === 'asc') {
        return a[sortBy] < b[sortBy] ? -1 : 1;
      } else {
        return a[sortBy] > b[sortBy] ? -1 : 1;
      }
    });
  };

  const formatDateTime = (dateTimeString: string) => {
    const dateTime = new Date(dateTimeString);
    return `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`;
  };

  return (
    <>
        <div className="card-body">
          <h5 className="card-title">Останні транзакції</h5>
          <Tabs activeKey={key} onSelect={(k) => setKey(k || 'sender')} id="transaction-tabs">
            <Tab eventKey="sender" title="Відправлені">
              <table className="table">
                <thead>
                  <tr>
                    <th style={{ cursor: 'pointer' }} onClick={() => { setSortBy('date'); setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); }}>Дата</th>
                    <th style={{ cursor: 'pointer' }} onClick={() => { setSortBy('to_account_number'); setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); }}>Отримувач</th>
                    <th style={{ cursor: 'pointer' }} onClick={() => { setSortBy('description'); setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); }}>Опис</th>
                    <th style={{ cursor: 'pointer' }} onClick={() => { setSortBy('amount'); setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); }}>Сума</th>
                    <th style={{ cursor: 'pointer' }} onClick={() => { setSortBy('category'); setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); }}>Категорія</th>
                  </tr>
                </thead>
                <tbody>
                  {sortTransactions(sender).map((transaction, index) => (
                    <tr key={`sender-${index}`}>
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
            <Tab eventKey="receiver" title="Отримані">
              <table className="table">
                <thead>
                  <tr>
                    <th style={{ cursor: 'pointer' }} onClick={() => { setSortBy('date'); setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); }}>Дата</th>
                    <th style={{ cursor: 'pointer' }} onClick={() => { setSortBy('from_account_number'); setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); }}>Відправник</th>
                    <th style={{ cursor: 'pointer' }} onClick={() => { setSortBy('description'); setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); }}>Опис</th>
                    <th style={{ cursor: 'pointer' }} onClick={() => { setSortBy('amount'); setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); }}>Сума</th>
                    <th style={{ cursor: 'pointer' }} onClick={() => { setSortBy('category'); setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); }}>Категорія</th>
                  </tr>
                </thead>
                <tbody>
                  {sortTransactions(receiver).map((transaction, index) => (
                    <tr key={`receiver-${index}`}>
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
          </Tabs>
        </div>
    </>
  );
};

export default TransactionPanel;
