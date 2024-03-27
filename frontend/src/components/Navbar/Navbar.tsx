const Navbar: any = () => {
    return(
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
            <a className="navbar-brand" href="#">Онлайн Банкінг</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <a className="nav-link" href="#">Головна</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Послуги</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Про нас</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Контакти</a>
                </li>
                </ul>
            </div>
            </div>
        </nav>
        </>
    )
}

export default Navbar;