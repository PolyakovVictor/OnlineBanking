import { Link } from "react-router-dom";

const Navbar: any = () => {
    return(
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
                <Link to="/"><a className="navbar-brand">Онлайн Банкінг</a></Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon">
                </span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link to="/"><a className="nav-link" href="#">Головна</a></Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/service"><a className="nav-link">Послуги</a></Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/about"><a className="nav-link" href="#">Про нас</a></Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/profile"><a className="nav-link" href="#">Особистий кабінет</a></Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/auth"><a className="nav-link" href="#">Увійти</a></Link>
                    </li>
                </ul>
            </div>
            </div>
        </nav>
        </>
    )
}

export default Navbar;