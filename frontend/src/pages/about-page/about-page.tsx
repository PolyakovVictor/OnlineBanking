import React from 'react';
import Navbar from '../../components/Navbar/Navbar';

const AboutPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="text-center mb-4">
          <h1 className="display-4">Про нас</h1>
          <p className="lead">
            Ми - ваш надійний фінансовий партнер, який завжди поруч з вами. Наша місія - надати найкращі фінансові послуги для задоволення потреб наших клієнтів.
          </p>
          <hr className="my-4" />
        </div>
        <div className="row">
          <div className="col-lg-6 mb-4">
            <h2>Наші цінності:</h2>
            <ul className="list-group">
              <li className="list-group-item">
                <h5 className="mb-1">Професіоналізм</h5>
                <p className="mb-1">Ми забезпечуємо високу якість обслуговування та консультацій.</p>
              </li>
              <li className="list-group-item">
                <h5 className="mb-1">Довіра</h5>
                <p className="mb-1">Ми прагнемо заслужити вашу довіру і відповідально ставимося до кожного клієнта.</p>
              </li>
              <li className="list-group-item">
                <h5 className="mb-1">Інновації</h5>
                <p className="mb-1">Ми постійно вдосконалюємося та впроваджуємо нові технології для зручності наших клієнтів.</p>
              </li>
              <li className="list-group-item">
                <h5 className="mb-1">Етика</h5>
                <p className="mb-1">Ми дотримуємося високих стандартів етики та ділової поведінки в усіх аспектах нашої роботи.</p>
              </li>
            </ul>
          </div>
          <div className="col-lg-6 mb-4">
            <h2>Наша команда:</h2>
            <p>
              Наша команда складається з висококваліфікованих фінансових експертів, які завжди готові надати вам професійну допомогу та пораду. Ми працюємо разом, щоб забезпечити ваш успіх та фінансовий розквіт.
            </p>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Зустрічайте наших експертів</h5>
                <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3rSjTieC8kIu2B2HRnanETnckM6cGAKU68Q&s" className="img-fluid rounded float-end"></img>
                <p className="card-text">Кожен член нашої команди є експертом у своїй галузі, готовим допомогти вам досягти фінансових цілей.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
