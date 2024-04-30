import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import DepositCalc from '../../components/service-deposit-calc/deposite-calc';
import CreditCalc from '../../components/service-credit-calc/credit-calc';
import InvestmentCalc from '../../components/service-investment-calc/investment-calc';
import MoneyTransferForm from '../../components/service-money-transfers/service-money-transfers';
import { CustomerService } from '../../services/customer.service';


const OtherServices: React.FC = () => {
  return (
    <div>
      <h3>Інші послуги</h3>
      <ul>
        <li>Грошові перекази</li>
        <li>Оплата послуг</li>
        <li>Валютні операції</li>
      </ul>
    </div>
  );
};

const ServicePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'credit' | 'deposit' | 'investment' | 'other' | 'moneyTransfer'>('credit');
  const handleSubmit = async (data: MoneyTransferFormData) => {
    const response = await CustomerService.sendMoneyTransfer(data)
    console.log('Submitted data:', response);
  };

  return (
    <>
      <Navbar/>
      <div className="container mt-5">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'credit' ? 'active' : ''}`}
              onClick={() => setActiveTab('credit')}
            >
              Кредити
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'deposit' ? 'active' : ''}`}
              onClick={() => setActiveTab('deposit')}
            >
              Депозити
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'investment' ? 'active' : ''}`}
              onClick={() => setActiveTab('investment')}
            >
              Інвестиції
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'moneyTransfer' ? 'active' : ''}`}
              onClick={() => setActiveTab('moneyTransfer')}
            >
              Грошові перекази
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'other' ? 'active' : ''}`}
              onClick={() => setActiveTab('other')}
            >
              Інші послуги
            </button>
          </li>
        </ul>
        <div className="tab-content">
          <div className={`tab-pane fade ${activeTab === 'credit' ? 'show active' : ''}`}>
            <div className="container py-5">
              <CreditCalc
                currency="€"
                minLoanAmount={1000}
                maxLoanAmount={100000}
                minTerm={1}
                maxTerm={30}
                annualInterestRate={8}
              />
            </div>
          </div>
          <div className={`tab-pane fade ${activeTab === 'deposit' ? 'show active' : ''}`}>
            <div className='container py-5'>
              <DepositCalc
                initialDeposit={1000}
                currency="€"
                minDeposit={1000}
                term="24 місяці під 15%"
                annualInterestRate={15}
                taxRate={12.07}
              />
            </div>
          </div>
          <div className={`tab-pane fade ${activeTab === 'investment' ? 'show active' : ''}`}>
            <div className="container py-5">
              <InvestmentCalc
                currency="€"
                minInvestment={1000}
                expectedAnnualReturn={7}
              />
            </div>
          </div>
          <div className={`tab-pane fade ${activeTab === 'moneyTransfer' ? 'show active' : ''}`}>
            <MoneyTransferForm onSubmit={handleSubmit} />
          </div>
          <div className={`tab-pane fade ${activeTab === 'other' ? 'show active' : ''}`}>
            <OtherServices />
          </div>
        </div>
      </div>
    </>
  );
};

export default ServicePage;
