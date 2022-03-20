import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onCardDelete}) {
    const currentUser = useContext(CurrentUserContext);
    const isOwn = card.owner === currentUser._id;
    const isLiked = card.likes.some(like => like === currentUser._id);

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (
        <li className="place">
            <button className={`place__delete-button ${!isOwn && 'place__delete-button_disabled'}`} type="button" aria-label="Удалить" onClick={handleDeleteClick}></button>
            <img src={card.link} alt={card.name} className="place__image" onClick={handleClick} />
            <div className="place__info">
                <h2 className="place__title">{card.name}</h2>
                <div className="place__like-container">
                    <button className={`place__like-button ${isLiked && 'place__like-button_active'}`} type="button" aria-label="Лайк" onClick={handleLikeClick}></button>
                    <p className="place__like-count">{card.likes.length}</p>
                </div>
            </div>
        </li>
    );
}

export default Card;