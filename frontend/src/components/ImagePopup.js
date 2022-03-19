function ImagePopup({card, onClose}) {
    const {name, link} = card || {};
    return (
        <article className={`popup popup_type_show-image ${card && 'popup_opened'}`} aria-label="Изображение">
            <div className="popup__image-container">
                <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={onClose}></button>
                <figure className="popup__figure">
                    <img src={link} alt={name} className="popup__image" />
                    <figcaption className="popup__image-description">{name}</figcaption>
                </figure>
            </div>
      </article>
    );
}

export default ImagePopup;