import React from 'react';
import "./FullNote.css";
import { useDispatch, useSelector } from "react-redux";
import { getFullNote, resetMyNoteState } from "../../redux/features/NoteSlice";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { deleteNote, getMyNotes, addToFavorite, removeFromFavorite } from '../../redux/features/NoteSlice';
import Skeleton from '../../components/Loader/Skeleton';

const FullNote = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();

    const { id } = params;

    const { fullNote } = useSelector(state => state.note);

    const [isFavorite, setIsFavorite] = React.useState(false);

    React.useEffect(() => {
        dispatch(getFullNote({id}));
        dispatch(resetMyNoteState());
    }, []);

    const deleteNoteHandler = (id) => {
        dispatch(deleteNote({id}));

        navigate("/");
    };

    const addFavoriteHandler = (id) => {
        dispatch(addToFavorite({id}));

        setIsFavorite(!isFavorite);

        document.querySelector(`.add-to-favorite`).style.color = "#ffc400";
    };

    const removeFavoriteHandler = (id) => {
        dispatch(removeFromFavorite({id}));

        setIsFavorite(!isFavorite);

        document.querySelector(`.remove-from-favorite`).style.color = "#A7A7A7";
    };

    return (
        <div className="fullnote">
            <div className="fullnote-wrapper">
                <div className="fullnote-header">
                    <div className="fullnote-title">
                        <h1>
                            {fullNote.title}
                        </h1>
                    </div>
                    <div className="fullnote-date">
                        <span>
                            {fullNote.normalDate}
                        </span>
                    </div>
                </div>

                <div className="fullnote-body">
                    <h3>
                        {fullNote.body}
                    </h3>
                </div>

                <div className="fullnote-footer">
                    <div className="container">
                        <div className="favorite">
                            {isFavorite ? (
                                <div className="remove-from-favorite" onClick={() => removeFavoriteHandler(fullNote._id)}>
                                    <FontAwesomeIcon icon={faBookmark} />
                                </div>
                            ) : (
                                <>
                                    {fullNote.isFavorite === "true" ? (
                                        <div className="remove-from-favorite" onClick={() => removeFavoriteHandler(fullNote._id)}>
                                            <FontAwesomeIcon icon={faBookmark} />
                                        </div>
                                    ) : (
                                        <div className="add-to-favorite" onClick={() => addFavoriteHandler(fullNote._id)}>
                                            <FontAwesomeIcon icon={faBookmark} />
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                        
                        <div className="delete" onClick={() => deleteNoteHandler(fullNote._id)}>
                            <FontAwesomeIcon icon={faTrashCan} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FullNote;