import Navbar from "../../components/Navbar/Navbar";

function HomePage() {
    return (
      <>
      <Navbar/>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-6">
            <h1>Ласкаво просимо в Онлайн Банкінг</h1>
            <p className="lead">Керуйте своїми фінансами легко та безпечно з нашим онлайн-банкінгом.</p>
            <a href="#" className="btn btn-primary btn-lg">Дізнатися більше</a>
          </div>
          <div className="col-md-6 rounded">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwCZGktizP7Uwov28y8yGMOV8bFUWvXWHWW04JFHrMGA&s" alt="Онлайн Банкинг" className="img-fluid rounded"></img>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Безпека</h5>
                <p className="card-text">Ваші дані надійно захищені з використанням сучасних технологій шифрування.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Зручність</h5>
                <p className="card-text">Керуйте своїми фінансами в будь-який час і в будь-якому місці з нашим мобільним додатком.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Підтримка</h5>
                <p className="card-text">Наша служба підтримки готова допомогти вам у будь-який час.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
  )
}

export default HomePage;