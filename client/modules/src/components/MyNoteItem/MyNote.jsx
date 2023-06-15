import React from 'react';
import "./MyNote.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from "react-router-dom";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import UserAvatar from "../UserAvatar/UserAvatar";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote, getMyNotes } from '../../redux/features/NoteSlice';

const MyNote = ({note}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.auth);

    const deleteNoteHandler = (id) => {
        dispatch(deleteNote({id}));

        setTimeout(() => {
            dispatch(getMyNotes())
        }, 400);
    };

    return (
        <div className="note">
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
                        {note.isComplete === "true" ? (
                            <s>{note.title}</s>
                        ) : (
                            <>
                                {note.title}
                            </>
                        )}
                    </h1>
                </div>
                <div className="date">
                    <span>
                        {note.normalDate}
                    </span>
                </div>
            </div>
            <div className="note-settings">
                <div className="complete" onClick={() => deleteNoteHandler(note._id)}>
                    x
                </div>

                <div className="favorite">
                    {note.isFavorite === "true" ? (
                        <div className="remove-from-favorite">
                            <FontAwesomeIcon icon={faBookmark} />
                        </div>
                    ): (
                        <div className="add-to-favorite">
                            <FontAwesomeIcon icon={faBookmark} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyNote;