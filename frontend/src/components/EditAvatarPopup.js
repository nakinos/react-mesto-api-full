import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, isLoading, onClose, onUpdateAvatar }) {
    const urlInputRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: urlInputRef.current.value
        });
    }

    return (
        <PopupWithForm name="update-avatar" title="Обновить аватар" buttonText="Сохранить" onClose={onClose}
            isOpen={isOpen} isLoading={isLoading} onSubmit={handleSubmit}>
            <fieldset className="popup__input-container">
                <label className="popup__field">
                    <input
                        ref={urlInputRef}
                        className="popup__input popup__input_type_avatar-url"
                        id="avatar-url-input"
                        type="url"
                        name="avatar"
                        placeholder="Ссылка на картинку"
                        autoComplete="off"
                        required
                    />
                    <span className="popup__input-error avatar-input-error"></span>
                </label>
            </fieldset>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;