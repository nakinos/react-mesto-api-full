function PopupWithForm({name, title, buttonText, children, isOpen, isLoading, onClose, onSubmit}) {
    return (
        <article className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`} aria-label={title}>
            <div className="popup__container">
                <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={onClose}></button>
                <form className="popup__form" name={name} onSubmit={onSubmit} noValidate>
                    <h2 className="popup__title">{title}</h2>
                    {children}
                    <button disabled={isLoading} className={`popup__submit-button ${isLoading && 'popup__submit-button_disabled'}`} type="submit">
                        {isLoading ? 'Сохранение...' : buttonText}
                    </button>
                </form>
            </div>
        </article>
    );
}

export default PopupWithForm;