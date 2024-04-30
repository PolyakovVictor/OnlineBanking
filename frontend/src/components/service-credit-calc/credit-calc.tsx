import React, { useState } from 'react';

interface CreditCalcProps {
  currency: string;
  minLoanAmount: number;
  maxLoanAmount: number;
  minTerm: number;
  maxTerm: number;
  annualInterestRate: number;
}

const CreditCalc: React.FC<CreditCalcProps> = ({
  currency,
  minLoanAmount,
  maxLoanAmount,
  minTerm,
  maxTerm,
  annualInterestRate,
}) => {
  const [loanAmount, setLoanAmount] = useState<number>(minLoanAmount);
  const [loanTerm, setLoanTerm] = useState<number>(minTerm);

  const calculateMonthlyPayment = (loanAmount: number, loanTerm: number) => {
    const monthlyInterestRate = annualInterestRate / 12 / 100;
    const numberOfPayments = loanTerm * 12;
    const numerator = loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments);
    const denominator = Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1;
    const monthlyPayment = numerator / denominator;
    return monthlyPayment;
  };

  const monthlyPayment = calculateMonthlyPayment(loanAmount, loanTerm);

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Кредитний калькулятор</h2>
          <div className="mb-3">
            <label htmlFor="loanAmountInput" className="form-label">
              Сума кредиту
            </label>
            <input
              type="number"
              id="loanAmountInput"
              value={loanAmount}
              onChange={(e) => setLoanAmount(parseInt(e.target.value, 10))}
              min={minLoanAmount}
              max={maxLoanAmount}
              className="form-control"
            />
            <small className="form-text text-muted">
              Діапазон суми кредиту: {minLoanAmount} - {maxLoanAmount} {currency}
            </small>
          </div>
          <div className="mb-3">
            <label htmlFor="loanTermInput" className="form-label">
              Термін кредиту (роки)
            </label>
            <input
              type="number"
              id="loanTermInput"
              value={loanTerm}
              onChange={(e) => setLoanTerm(parseInt(e.target.value, 10))}
              min={minTerm}
              max={maxTerm}
              className="form-control"
            />
            <small className="form-text text-muted">
              Діапазон терміну кредиту: {minTerm} - {maxTerm} років
            </small>
          </div>
          <div className="mb-3">
            <label className="form-label">Сума кредиту</label>
            <p className="card-text">
              {loanAmount} {currency}
            </p>
          </div>
          <div className="mb-3">
            <label className="form-label">Термін кредиту</label>
            <p className="card-text">{loanTerm} років</p>
          </div>
          <div className="mb-3">
            <label className="form-label">Процентна ставка</label>
            <p className="card-text">{annualInterestRate}% річних</p>
          </div>
          <div className="mb-3">
            <label className="form-label">Щомісячний платіж</label>
            <p className="card-text">
              {monthlyPayment.toFixed(2)} {currency}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCalc;