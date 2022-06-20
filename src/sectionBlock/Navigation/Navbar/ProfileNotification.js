import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';
const ProfileNotification = ({callLogout, getActiveColor, language}) => {
  return (
    <div className={`profile-notification`}>
        <div className="profile">
            <Link to="/Profile">
            <img src="img/navbar-icon/profile.svg" alt="profile" />
            </Link>
            <div className="profile-info">
            <Link to='/Profile'><p className="name">{JSON.parse(sessionStorage.getItem("infoUser")).name?JSON.parse(sessionStorage.getItem("infoUser")).name:"No Name"}</p></Link>
            <Link to='/Profile'><p className={`session ${getActiveColor('/Profile')}`}>{language.navBar.My_Profile}</p></Link>
            <p onClick={callLogout} className="session">{language.navBar.close_session}</p>
            </div>
        </div>
        <div className="notification">
            <Link to="/Notification">
            <img src="img/navbar-icon/bell.svg" alt="notification" />
            </Link>
        </div>
    </div>
  )
}

export default ProfileNotification;