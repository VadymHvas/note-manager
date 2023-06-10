import React from 'react';
import "./Header.css";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from 'react-redux';

const Header = () => {
    const { user } = useSelector(state => state.auth);

    return (
        <header>
            <div className="header-logo">
                <Link to="/">
                    Менеджер Нотатків 
                </Link>
            </div>
            <div className="header-user">
                <div className="user">
                    <Link to="/myprofile">
                        {user.username} <FontAwesomeIcon icon={faUser} />
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;