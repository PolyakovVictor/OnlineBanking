import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const ProfileCreditPanel: React.FC<ProfileCreditPanelProps> = ({ credits }) => {
  const [sortBy, setSortBy] = useState<keyof CreditData>('start_date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  console.log('credits --->>>', credits)

  const sortCredits = (credits: CreditData[]) => {
    return credits.sort((a, b) => {
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
        <h5 className="card-title">Кредити</h5>
        <table className="table">
          <thead>
            <tr>
              <th style={{ cursor: 'pointer' }} onClick={() => { setSortBy('start_date'); setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); }}>Дата початку</th>
              <th style={{ cursor: 'pointer' }} onClick={() => { setSortBy('end_date'); setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); }}>Дата закінчення</th>
              <th style={{ cursor: 'pointer' }} onClick={() => { setSortBy('amount'); setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); }}>Сума кредиту</th>
              <th style={{ cursor: 'pointer' }} onClick={() => { setSortBy('term'); setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); }}>Строк (місяців)</th>
              <th style={{ cursor: 'pointer' }} onClick={() => { setSortBy('interest_rate'); setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); }}>Процентна ставка</th>
              <th style={{ cursor: 'pointer' }} onClick={() => { setSortBy('monthly_payment'); setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); }}>Щомісячний платіж</th>
            </tr>
          </thead>
          <tbody>
            {sortCredits(credits).map((loan, index) => (
              <tr key={`loan-${index}`}>
                <td>{formatDateTime(loan.start_date)}</td>
                <td>{formatDateTime(loan.end_date)}</td>
                <td>{loan.amount}</td>
                <td>{loan.term}</td>
                <td>{loan.interest_rate}%</td>
                <td>{loan.monthly_payment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProfileCreditPanel;