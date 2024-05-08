import React, { useState } from 'react';


const ProfileDepositPanel: React.FC<ProfileDepositPanelProps> = ({ deposits }) => {
  const [sortBy, setSortBy] = useState<keyof DepositsResponse>('start_date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const sortDeposits = (deposits: DepositsResponse[]) => {
    return deposits.sort((a, b) => {
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <>
      <div className="card-body">
        <h5 className="card-title">Депозити</h5>
        <table className="table">
          <thead>
            <tr>
              <th style={{ cursor: 'pointer' }} onClick={() => { setSortBy('start_date'); setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); }}>Дата початку</th>
              <th style={{ cursor: 'pointer' }} onClick={() => { setSortBy('end_date'); setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); }}>Дата закінчення</th>
              <th style={{ cursor: 'pointer' }} onClick={() => { setSortBy('amount'); setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); }}>Сума депозиту</th>
              <th style={{ cursor: 'pointer' }} onClick={() => { setSortBy('term'); setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); }}>Строк (днів)</th>
              <th style={{ cursor: 'pointer' }} onClick={() => { setSortBy('interest_rate'); setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); }}>Процентна ставка</th>
            </tr>
          </thead>
          <tbody>
            {sortDeposits(deposits).map((deposit, index) => (
              <tr key={`deposit-${index}`}>
                <td>{formatDate(deposit.start_date)}</td>
                <td>{formatDate(deposit.end_date)}</td>
                <td>{deposit.amount}</td>
                <td>{deposit.term}</td>
                <td>{deposit.interest_rate}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProfileDepositPanel;