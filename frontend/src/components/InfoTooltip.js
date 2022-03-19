import successImage from "../images/success.svg";
import failureImage from "../images/failure.svg";

function InfoTooltip({ isOpen, type, onClose }) {
    const image = {
        'success': successImage,
        'failure': failureImage
    };
    const text = {
        'success': 'Вы успешно зарегистрировались!',
        'failure': 'Что-то пошло не так! Попробуйте ещё раз.'
    }
    return (
        <article className={`popup popup_type_register-result ${isOpen && 'popup_opened'}`} aria-label="Результат регистрации">
            <div className="popup__container popup__container_type_infotooltip">
                <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={onClose}></button>
                <img className="popup__info-image" src={image[type]} alt={text[type]}></img>
                <h2 className="popup__title popup__title_type_infotooltip">
                    {text[type]}
                </h2>
            </div>
        </article>
    );
}

export default InfoTooltip;