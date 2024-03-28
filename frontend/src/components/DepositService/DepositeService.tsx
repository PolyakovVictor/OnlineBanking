import React, { useState } from 'react';

interface DepositServiceProps {
  initialDeposit: number;
  currency: string;
  minDeposit: number;
  term: string;
  annualInterestRate: number;
  taxRate: number;
}

const DepositService: React.FC<DepositServiceProps> = ({
  initialDeposit,
  currency,
  minDeposit,
  term,
  annualInterestRate,
  taxRate,
}) => {
  const [deposit, setDeposit] = useState<number>(initialDeposit);

  const calculateTotalAmount = (deposit: number) => {
    const interest = deposit * (annualInterestRate / 100);
    const tax = interest * (taxRate / 100);
    const totalAmount = deposit + interest - tax;
    return totalAmount;
  };

  const totalAmount = calculateTotalAmount(deposit);

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Хочу примножити</h2>
          <div className="mb-3">
            <label htmlFor="depositInput" className="form-label">
              Сума депозиту
            </label>
            <input
              type="number"
              id="depositInput"
              value={deposit}
              onChange={(e) => setDeposit(parseInt(e.target.value, 10))}
              min={minDeposit}
              className="form-control"
            />
            <small className="form-text text-muted">
              Мінімальна сума 1 000 {currency}
            </small>
          </div>
          <div className="mb-3">
            <label className="form-label">Термін</label>
            <p className="card-text">{term}</p>
          </div>
          <div className="mb-3">
            <label className="form-label">Вклади</label>
            <p className="card-text">
              {deposit} {currency}
            </p>
          </div>
          <div className="mb-3">
            <label className="form-label">Процентна ставка</label>
            <p className="card-text">{annualInterestRate}% річних</p>
          </div>
          <div className="mb-3">
            <label className="form-label">Процентна ставка після сплати податків</label>
            <p className="card-text">{taxRate}%</p>
          </div>
          <div className="mb-3">
            <label className="form-label">Ви отримаєте</label>
            <p className="card-text">
              {totalAmount.toFixed(2)} {currency}
            </p>
          </div>
          <div className="mb-3">
            <label className="form-label">Утримано податку</label>
            <p className="card-text">
              {(totalAmount - deposit).toFixed(2)} {currency}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositService;