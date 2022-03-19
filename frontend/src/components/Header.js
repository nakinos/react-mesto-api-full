import { Link, Route, Switch } from "react-router-dom";

function Header({ email, onSignOutClick }) {
    return (
        <header className="header">
            <Link to="/" className="header__logo"></Link>
            <nav className="header__nav">
                <Switch>
                    <Route path="/sign-in">
                        <Link className="header__link" to="/sign-up">Регистрация</Link>
                    </Route>
                    <Route path="/sign-up">
                        <Link className="header__link" to="/sign-in">Войти</Link>
                    </Route>
                    <Route exact path="/">
                        <span className="header__email">{email}</span>
                        <Link className="header__sign-out" to="/sign-in" onClick={onSignOutClick}>Выйти</Link> 
                    </Route>
                </Switch>
            </nav> 
        </header>
  );
}

export default Header;