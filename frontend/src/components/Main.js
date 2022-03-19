import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import Card from "./Card.js";

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete}) {
    const currentUser = useContext(CurrentUserContext);

    return (
        <main>
            <section className="profile root__section">
                <div className="profile__container">
                    <div className="profile__avatar-container">
                        <img src={currentUser.avatar} alt={`Аватар ${currentUser.name}`} className="profile__avatar" />
                        <button className="profile__edit-avatar-button" type="button" aria-label="Редактировать аватар" 
                            onClick={onEditAvatar}></button>
                    </div>
                    <div className="profile__info-container">
                        <div className="profile__info">
                            <h1 className="profile__name">{currentUser.name}</h1>
                            <p className="profile__job">{currentUser.about}</p>
                        </div>
                        <button className="profile__edit-button" type="button" aria-label="Редактировать" 
                            onClick={onEditProfile}></button>
                    </div>
                </div>
                <button className="profile__add-button" type="button" aria-label="Добавить"
                    onClick={onAddPlace}></button>
            </section>
            <section className="places root__section" aria-label="Список мест">
                <ul className="places__list">
                    {cards.map(card => (<Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />))}
                </ul>
            </section>
        </main>
    );
}

export default Main;