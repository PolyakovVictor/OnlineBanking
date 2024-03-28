import React from 'react';
import Navbar from '../../components/Navbar/Navbar';

const AboutPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h1>Про нас</h1>
        <p>
          Ми - ваш надійний фінансовий партнер, який завжди поруч з вами. Наша місія - надати найкращі фінансові
          послуги для задоволення потреб наших клієнтів. Ми працюємо, щоб забезпечити ваш комфорт та впевненість у майбутньому.
        </p>
        <h2>Наші цінності:</h2>
        <ul>
          <li>Професіоналізм: ми забезпечуємо високу якість обслуговування та консультацій</li>
          <li>Довіра: ми прагнемо заслужити вашу довіру і відповідально ставимося до кожного клієнта</li>
          <li>Інновації: ми постійно вдосконалюємося та впроваджуємо нові технології для зручності наших клієнтів</li>
          <li>Етика: ми дотримуємося високих стандартів етики та ділової поведінки в усіх аспектах нашої роботи</li>
        </ul>
        <h2>Наша команда:</h2>
        <p>
          Наша команда складається з висококваліфікованих фінансових експертів, які завжди готові надати вам професійну
          допомогу та пораду. Ми працюємо разом, щоб забезпечити ваш успіх та фінансовий розквіт.
        </p>
      </div>
    </>
  );
};

export default AboutPage;
