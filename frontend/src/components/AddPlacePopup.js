import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, isLoading, onClose, onAddPlace }) {
    const nameInputRef = useRef();
    const linkInputRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();

        onAddPlace({
            name: nameInputRef.current.value,
            link: linkInputRef.current.value
        });
    }

    useEffect(() => {
        nameInputRef.current.value = '';
        linkInputRef.current.value = '';
    }, [isOpen]);

    return (
        <PopupWithForm name="add-place" title="Новое место" buttonText="Создать" onClose={onClose}
            isOpen={isOpen} isLoading={isLoading} onSubmit={handleSubmit}>
            <fieldset className="popup__input-container">
                <label className="popup__field">
                    <input
                        ref={nameInputRef}
                        className="popup__input popup__input_type_place-name"
                        id="place-name-input"
                        type="text"
                        name="place-name"
                        placeholder="Название"
                        autoComplete="off"
                        minLength="2"
                        maxLength="30"
                        required
                    />
                    <span className="popup__input-error place-name-input-error"></span>
                </label>
                <label className="popup__field">
                    <input
                        ref={linkInputRef}
                        className="popup__input popup__input_type_image-url"
                        id="url-input"
                        type="url"
                        name="link"
                        placeholder="Ссылка на картинку"
                        autoComplete="off"
                        required
                    />
                    <span className="popup__input-error url-input-error"></span>
                </label>
            </fieldset>
        </PopupWithForm>
    );
}

export default AddPlacePopup;