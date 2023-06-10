import React from 'react';
import "./UserAvatar.css";

const UserAvatar = ({user}) => {
    return (
        <div className="user-avatar">
            {user.avatar && (
                <img src={`http://localhost:4444/userAvatars/${user.avatar}`} alt="errrr" />
            )}
        </div>
    );
};

export default UserAvatar;