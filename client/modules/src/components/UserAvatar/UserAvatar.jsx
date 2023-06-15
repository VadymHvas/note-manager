import React from 'react';
import "./UserAvatar.css";

const UserAvatar = ({user, className}) => {
    return (
        <div className={`user-avatar ${className}`}>
            {user.avatar && (
                <img src={`http://localhost:4444/userAvatars/${user.avatar}`} alt="errrr" />
            )}
        </div>
    );
};

export default UserAvatar;