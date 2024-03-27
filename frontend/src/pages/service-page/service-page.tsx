import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';

const КредитнийСервіс: React.FC = () => {
  return (
    <div>
      <h3>Кредити</h3>
      <ul>
        <li>Потребительскі кредити</li>
        <li>Іпотечні кредити</li>
        <li>Автокредити</li>
        <li>Бізнес-кредити</li>
      </ul>
      {/* Додайте тут калькулятор кредиту */}
    </div>
  );
};

const ДепозитнийСервіс: React.FC = () => {
  return (
    <div>
      <h3>Депозити</h3>
      <ul>
        <li>Депозити до запиту</li>
        <li>Термінові депозити</li>
        <li>Накопичувальні рахунки</li>
      </ul>
      {/* Додайте тут калькулятор депозиту */}
    </div>
  );
};

const ІнвестиційнийСервіс: React.FC = () => {
  return (
    <div>
      <h3>Інвестиції</h3>
      <ul>
        <li>Інвестиційні фонди</li>
        <li>Акції та облігації</li>
        <li>Інвестиційні частки</li>
      </ul>
      {/* Додайте тут інформацію про інвестиційні можливості */}
    </div>
  );
};

const ІншіСервіси: React.FC = () => {
  return (
    <div>
      <h3>Інші послуги</h3>
      <ul>
        <li>Грошові перекази</li>
        <li>Оплата послуг</li>
        <li>Валютні операції</li>
      </ul>
      {/* Додайте тут інші доступні послуги */}
    </div>
  );
};

const СторінкаСервісів: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'credit' | 'deposit' | 'investment' | 'other'>('credit');

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
              className={`nav-link ${activeTab === 'other' ? 'active' : ''}`}
              onClick={() => setActiveTab('other')}
            >
              Інші послуги
            </button>
          </li>
        </ul>
        <div className="tab-content">
          <div className={`tab-pane fade ${activeTab === 'credit' ? 'show active' : ''}`}>
            <КредитнийСервіс />
          </div>
          <div className={`tab-pane fade ${activeTab === 'deposit' ? 'show active' : ''}`}>
            <ДепозитнийСервіс />
          </div>
          <div className={`tab-pane fade ${activeTab === 'investment' ? 'show active' : ''}`}>
            <ІнвестиційнийСервіс />
          </div>
          <div className={`tab-pane fade ${activeTab === 'other' ? 'show active' : ''}`}>
            <ІншіСервіси />
          </div>
        </div>
      </div>
    </>
  );
};

export default СторінкаСервісів;
