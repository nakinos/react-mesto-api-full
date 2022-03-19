import { useState } from "react";

function Login({ onSignIn }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleChange(e) {
        if (e.target.name === "email") {
            setEmail(e.target.value);
        } else if (e.target.name === "password") {
            setPassword(e.target.value);
        }
    }

    function handleSubmit(e){
        e.preventDefault();

        if (!email || !password) return;
        
        onSignIn({ email, password });
    }

    return (
        <form className="auth" onSubmit={handleSubmit} noValidate>
            <h2 className="auth__title">Вход</h2>
            <fieldset className="auth__input-container">
                <label className="auth__field">
                    <input
                        className="auth__input auth__input_type_email"
                        type="email"
                        name="email"
                        placeholder="Email"
                        autoComplete="off"
                        required
                        onChange={handleChange}
                    />
                    <span className="auth__input-error"></span>
                </label>
                <label className="auth__field">
                    <input
                        className="auth__input auth__input_type_password"
                        type="password"
                        name="password"
                        placeholder="Пароль"
                        autoComplete="off"
                        required
                        onChange={handleChange}
                    />
                    <span className="auth__input-error"></span>
                </label>
            </fieldset>
            <button className="auth__submit-button" type="submit">
                Войти
            </button>
        </form>
    );
}

export default Login;