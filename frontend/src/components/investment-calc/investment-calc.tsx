import React, { useState } from 'react';

interface InvestmentCalcProps {
  currency: string;
  minInvestment: number;
  expectedAnnualReturn: number;
}

const InvestmentCalc: React.FC<InvestmentCalcProps> = ({
  currency,
  minInvestment,
  expectedAnnualReturn,
}) => {
  const [investmentAmount, setInvestmentAmount] = useState<number>(minInvestment);
  const [investmentPeriod, setInvestmentPeriod] = useState<number>(1);

  const calculateFutureValue = (investmentAmount: number, investmentPeriod: number) => {
    const annualGrowthRate = expectedAnnualReturn / 100;
    const futureValue = investmentAmount * Math.pow(1 + annualGrowthRate, investmentPeriod);
    return futureValue;
  };

  const futureValue = calculateFutureValue(investmentAmount, investmentPeriod);

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Калькулятор інвестицій</h2>
          <div className="mb-3">
            <label htmlFor="investmentAmountInput" className="form-label">
              Сума інвестиції
            </label>
            <input
              type="number"
              id="investmentAmountInput"
              value={investmentAmount}
              onChange={(e) => setInvestmentAmount(parseInt(e.target.value, 10))}
              min={minInvestment}
              className="form-control"
            />
            <small className="form-text text-muted">
              Мінімальна сума інвестиції: {minInvestment} {currency}
            </small>
          </div>
          <div className="mb-3">
            <label htmlFor="investmentPeriodInput" className="form-label">
              Період інвестування (роки)
            </label>
            <input
              type="number"
              id="investmentPeriodInput"
              value={investmentPeriod}
              onChange={(e) => setInvestmentPeriod(parseInt(e.target.value, 10))}
              min={1}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Сума інвестиції</label>
            <p className="card-text">
              {investmentAmount} {currency}
            </p>
          </div>
          <div className="mb-3">
            <label className="form-label">Період інвестування</label>
            <p className="card-text">{investmentPeriod} років</p>
          </div>
          <div className="mb-3">
            <label className="form-label">Очікувана річна норма прибутку</label>
            <p className="card-text">{expectedAnnualReturn}%</p>
          </div>
          <div className="mb-3">
            <label className="form-label">Майбутня вартість інвестиції</label>
            <p className="card-text">
              {futureValue.toFixed(2)} {currency}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentCalc;