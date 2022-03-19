import { useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/api";
import { auth } from "../utils/auth";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmPopup from "./ConfirmPopup";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import Footer from "./Footer";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import Main from "./Main";
import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { useHistory } from "react-router-dom";

function App() {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
  const [tooltipType, setTooltipType] = useState('');

  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [deleteCard, setDeleteCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);

  const [isEditProfileLoading, setIsEditProfileLoading] = useState(false);
  const [isEditAvatarLoading, setIsEditAvatarLoading] = useState(false);
  const [isAddPlaceLoading, setIsAddPlaceLoading] = useState(false);

  useEffect(() => {
    const currentUserId = localStorage.getItem('userId');
    if (currentUserId) {
      auth.checkToken()
        .then(res => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.data.email);
            history.push('/');
          } else {
            localStorage.removeItem('userId');
          }
        })
        .catch(err => console.log(err));
    } 
  }, []);

  useEffect(() => {
    const currentUserId = localStorage.getItem('userId');
    if (currentUserId) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([currenUserInfo, cardsData]) => {
          setCurrentUser(currenUserInfo);
          setCards(cardsData);
        })
        .catch(err => console.log(err));
    }
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCard(null);
    setDeleteCard(null);
  }

  function handleCardLikeClick(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err));
  }

  function handleCardDelete(card) {
    setDeleteCard(card);
    setIsConfirmPopupOpen(true);
  }

  function handleCardDeleteConfirm() {
    api.deleteCard(deleteCard._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== deleteCard._id));
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser({ name, about }) {
    setIsEditProfileLoading(true);
    api.editProfileInfo({ name, about })
      .then(userData => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsEditProfileLoading(false));
  }

  function handleUpdateAvatar({ avatar }) {
    setIsEditAvatarLoading(true);
    api.editProfileAvatar({ avatar })
      .then(userData => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsEditAvatarLoading(false));
  }

  function handleAddPlace({ name, link }) {
    setIsAddPlaceLoading(true);
    api.addCard({ name, link })
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsAddPlaceLoading(false));
  }

  function handleRegisterPopupClose() {
    setIsRegisterPopupOpen(false);
  }

  function handleSignUp({ email, password }) {
    auth.signup({ email, password })
      .then(() => {
        setTooltipType('success');
        setIsRegisterPopupOpen(true);

        setTimeout(() => handleSignIn({ email, password }), 500);
        // handleSignIn({ email, password });
      })
      .catch(err => {
        console.log(err);
        setTooltipType('failure');
        setIsRegisterPopupOpen(true);
      });
  }

  function handleSignIn({ email, password }) {
    auth.signin({ email, password })
      .then(data => {
        if (data._id) {
          localStorage.setItem('userId', data._id);
          setEmail(email);
          setLoggedIn(true);
          history.push('/');
        }
      })
      .catch(err => {
        console.log(err);
        setTooltipType('failure');
        setIsRegisterPopupOpen(true);
      });
  }

  function handleSignOut() {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header email={email} onSignOutClick={handleSignOut}/>
      <Switch>
        <Route path="/sign-up">
          <Register onSignUp={handleSignUp} />
        </Route>
        <Route path="/sign-in">
          <Login onSignIn={handleSignIn} />
        </Route>
        <ProtectedRoute 
          loggedIn={loggedIn}
          component={Main}
          path="/"
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLikeClick}
          onCardDelete={handleCardDelete}
          />
      </Switch>
      <Footer />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        isLoading={isEditProfileLoading}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser} />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        isLoading={isEditAvatarLoading}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar} />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        isLoading={isAddPlaceLoading}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlace} />
      <ConfirmPopup
        isOpen={isConfirmPopupOpen}
        onClose={closeAllPopups}
        onConfirm={handleCardDeleteConfirm} />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <InfoTooltip
            isOpen={isRegisterPopupOpen}
            type={tooltipType}
            onClose={handleRegisterPopupClose} />
    </CurrentUserContext.Provider>
  );
}

export default App;
