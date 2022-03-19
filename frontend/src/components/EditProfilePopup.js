import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, isLoading, onClose, onUpdateUser }) {
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        setName(currentUser.name || '');
        setDescription(currentUser.about || '');
    }, [currentUser, isOpen]);

    function handleChange(e) {
        if (e.target.name === 'name') {
            setName(e.target.value);
        } else if (e.target.name === 'about') {
            setDescription(e.target.value);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateUser({
            name,
            about: description
        });
    }

    return (
        <PopupWithForm name="edit-profile" title="Редактировать профиль" buttonText="Сохранить" onClose={onClose}
            isOpen={isOpen} isLoading={isLoading} onSubmit={handleSubmit}>
            <fieldset className="popup__input-container">
                <label className="popup__field">
                    <input
                        value={name}
                        onChange={handleChange}
                        className="popup__input popup__input_type_name"
                        id="name-input"
                        type="text"
                        name="name"
                        placeholder="Имя"
                        autoComplete="off"
                        minLength="2"
                        maxLength="40"
                        required
                    />
                    <span className="popup__input-error name-input-error"></span>
                </label>
                <label className="popup__field">
                    <input
                        value={description}
                        onChange={handleChange}
                        className="popup__input popup__input_type_job"
                        id="job-input"
                        type="text"
                        name="about"
                        placeholder="О себе"
                        autoComplete="off"
                        minLength="2"
                        maxLength="200"
                        required
                    />
                    <span className="popup__input-error about-input-error"></span>
                </label>
            </fieldset>
        </PopupWithForm>
    );
}

export default EditProfilePopup;