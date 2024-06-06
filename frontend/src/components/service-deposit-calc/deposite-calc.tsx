import React, { useState } from 'react';
import DepositTermsModal from '../modal-deposit-terms-window/modal-deposit-terms-window';

interface DepositCalcProps {
  onSubmit: (data: any) => void;
  initialDeposit: number;
  currency: string;
  minDeposit: number;
  maxTerm: number;
  annualInterestRate: number;
  taxRate: number;
}

const DepositCalc: React.FC<DepositCalcProps> = ({
  onSubmit,
  initialDeposit,
  currency,
  minDeposit,
  maxTerm,
  annualInterestRate,
  taxRate,
}) => {
  const [deposit, setDeposit] = useState<number>(initialDeposit);
  const [term, setTerm] = useState<number>(1);
  const [showTermsModal, setShowTermsModal] = useState<boolean>(false);

  const calculateTotalAmount = (deposit: number, term: number) => {
    const interest = (deposit * (annualInterestRate / 100)) * (term / 12);
    const tax = interest * (taxRate / 100);
    const totalAmount = deposit + interest - tax;
    return totalAmount;
  };

  const totalAmount = calculateTotalAmount(deposit, term);

  const handleAcceptTerms = () => {
    const depositData = {
      amount: deposit,
      term: term,
      interest_rate: annualInterestRate,
      start_date: new Date().toISOString().split('T')[0],
      end_date: new Date(new Date().setMonth(new Date().getMonth() + term)).toISOString().split('T')[0],
    };

    onSubmit(depositData);
    setShowTermsModal(false);
  };

  const handleOpenTermsModal = () => {
    setShowTermsModal(true);
  };

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
            <label htmlFor="termInput" className="form-label">
              Термін (місяців)
            </label>
            <input
              type="number"
              id="termInput"
              value={term}
              onChange={(e) => setTerm(parseInt(e.target.value, 10))}
              min={12}
              max={maxTerm}
              className="form-control"
            />
            <small className="form-text text-muted">
              Максимальний термін {maxTerm} місяців
            </small>
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
          <button className="btn btn-primary" onClick={handleOpenTermsModal}>
            Відкрити депозит
          </button>
        </div>
      </div>

      <DepositTermsModal
        show={showTermsModal}
        onHide={() => setShowTermsModal(false)}
        onAccept={handleAcceptTerms}
      />
    </div>
  );
};

export default DepositCalc;
