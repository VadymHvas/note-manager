import React from 'react';
import "./Header.css";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from 'react-redux';
import Skeleton from "../Loader/Skeleton";

const Header = () => {
    const { user, loading } = useSelector(state => state.auth);

    return (
        <header>
            <div className="header-logo">
                <Link to="/">
                    Менеджер Нотатків 
                </Link>
            </div>
            <div className="header-user">
                <div className="user">
                    {loading ? (
                        <span>
                            <Skeleton w={"50px"} h={"15px"} color={"#b7b7b7"} /> <FontAwesomeIcon icon={faUser} />
                        </span>
                    ) : (
                        <Link to="/myprofile">
                            {user.username} <FontAwesomeIcon icon={faUser} />
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;