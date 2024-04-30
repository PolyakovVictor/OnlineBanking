import React from 'react';

const TransactionPanel: React.FC<TransactionResponse> = ({ sender, receiver }) => {
  const sortByDate = (transactions: Transaction[]) => {
    return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  return (
    <>
      <div className="card mt-4">
        <div className="card-body">
          <h5 className="card-title">Останні транзакції</h5>
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
              {sortByDate(sender).map((transaction, index) => (
                <tr key={`sender-${index}`}>
                  <td>{transaction.date}</td>
                  <td>{transaction.from_account_number}</td>
                  <td>{transaction.description}</td>
                  <td>{transaction.amount}</td>
                  <td>{transaction.category}</td>
                </tr>
              ))}
              {sortByDate(receiver).map((transaction, index) => (
                <tr key={`receiver-${index}`}>
                  <td>{transaction.date}</td>
                  <td>{transaction.to_account_number}</td>
                  <td>{transaction.description}</td>
                  <td>{transaction.amount}</td>
                  <td>{transaction.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TransactionPanel;
