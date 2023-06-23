import React from 'react';
import "./MyNote.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from "react-router-dom";
import { faBookmark, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import UserAvatar from "../UserAvatar/UserAvatar";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote, getMyNotes, addToFavorite, removeFromFavorite } from '../../redux/features/NoteSlice';

const MyNote = ({note}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isFavorite, setIsFavorite] = React.useState(false);

    const { user } = useSelector(state => state.auth);

    const deleteNoteHandler = (id) => {
        document.querySelector(`.note.note-${id}`).style.display = "none";
        
        dispatch(deleteNote({id}));

        setTimeout(() => {
            dispatch(getMyNotes());
        }, 400);
    };

    const addFavoriteHandler = (id) => {
        dispatch(addToFavorite({id}));

        setIsFavorite(!isFavorite);

        document.querySelector(`.note.note-${id} .add-to-favorite`).style.color = "#ffc400";
    };

    const removeFavoriteHandler = (id) => {
        dispatch(removeFromFavorite({id}));

        setIsFavorite(!isFavorite);

        document.querySelector(`.note.note-${id} .remove-from-favorite`).style.color = "#A7A7A7";
    };

    return (
        <div className={`note note-${note._id}`}>
            <div className="note-data" onClick={() => navigate(`note/${note._id}`)}>
                <div className="note-header">
                    <div className="note-user-avatar">
                        <UserAvatar user={user} className={"small"} />
                    </div>
                    <div className="note-username">
                        <h3>{user.username}</h3>
                    </div>
                </div>
                <div className="note-title">
                    <h1>
                        {note.title}
                    </h1>
                </div>
                <div className="date">
                    <span>
                        {note.normalDate}
                    </span>
                </div>
            </div>
            <div className="note-settings">
                <div className="delete" onClick={() => deleteNoteHandler(note._id)}>
                    <FontAwesomeIcon icon={faTrashCan} />
                </div>

                <div className="favorite">
                    {isFavorite ? (
                        <div className="remove-from-favorite" onClick={() => removeFavoriteHandler(note._id)}>
                            <FontAwesomeIcon icon={faBookmark} />
                        </div>
                    ) : (
                        <>
                            {note.isFavorite === "true" ? (
                                <div className="remove-from-favorite" onClick={() => removeFavoriteHandler(note._id)}>
                                    <FontAwesomeIcon icon={faBookmark} />
                                </div>
                            ) : (
                                <div className="add-to-favorite" onClick={() => addFavoriteHandler(note._id)}>
                                    <FontAwesomeIcon icon={faBookmark} />
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyNote;
