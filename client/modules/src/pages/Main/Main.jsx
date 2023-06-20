import React from 'react';
import "./Main.css";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { checkAuth } from '../../redux/features/AuthSlice';
import NotAuth from '../../components/NotAuth/NotAuth';
import { getMe } from '../../redux/features/AuthSlice';
import { getMyNotes, noteSlice } from "../../redux/features/NoteSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotate, faBookmark, faBook } from '@fortawesome/free-solid-svg-icons';
import MyNote from '../../components/MyNoteItem/MyNote';
import { resetFullNoteState, getFavorites } from '../../redux/features/NoteSlice';
import Skeleton from '../../components/Loader/Skeleton';

const Main = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isAuth = useSelector(checkAuth);

    const { myNotes, message, favoriteNotes, loading } = useSelector(state => state.note);

    const [notes, setNotes] = React.useState(true);

    React.useEffect(() => {
        dispatch(getMe());
        
        setTimeout(() => {
            dispatch(getMyNotes());
        }, 100);

        dispatch(resetFullNoteState(""));
    }, [isAuth, navigate]); 

    const getFavoriteNotesHandler = () => {
        dispatch(getFavorites());
        dispatch(getMyNotes());
    };

    return (
        <main>
            {window.localStorage.getItem("token") ? (
                <div className="main">
                    <div className="main-header">
                        <div className="main-title">
                            {notes ? (
                                <h1>Мої нотатки</h1>
                            ) : (
                                <h1>Улюблені нотатки</h1>
                            )}
                        </div>
                        <div className="main-notes-settings">
                            <div className="update-notes">
                                <span onClick={() => dispatch(getMyNotes())}>
                                    <FontAwesomeIcon icon={faRotate} />
                                </span>
                            </div>

                            <div className="filter-notes">
                                <div className="favorites" onClick={() => setNotes(!notes)}>
                                    <span title="Улюблені" onClick={getFavoriteNotesHandler}>
                                        <FontAwesomeIcon icon={faBookmark} />
                                    </span>
                                </div>
                            </div>

                            <div className="add-note">
                                <span onClick={() => navigate("addNote")}>
                                    +
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="my-notes">
                        {loading ? (
                            <>
                                <div className="skeleton-wrapper">
                                    <div className="skeleton-header">
                                        <Skeleton w={"50px"} h={"50px"} className={"rounded"} color={"#b7b7b7"} />

                                        <Skeleton w={"80px"} h={"20px"} color={"#b7b7b7"} />
                                    </div>

                                    <div className="skeleton-title">
                                        <Skeleton w={"160px"} h={"25px"} color={"#b7b7b7"} />
                                    </div>

                                    <div className="skeleton-date">
                                        <Skeleton w={"130px"} h={"15px"} color={"#b7b7b7"} />
                                    </div>
                                </div>

                                <div className="skeleton-wrapper">
                                    <div className="skeleton-header">
                                        <Skeleton w={"50px"} h={"50px"} className={"rounded"} color={"#b7b7b7"} />

                                        <Skeleton w={"80px"} h={"20px"} color={"#b7b7b7"} />
                                    </div>

                                    <div className="skeleton-title">
                                        <Skeleton w={"160px"} h={"25px"} color={"#b7b7b7"} />
                                    </div>

                                    <div className="skeleton-date">
                                        <Skeleton w={"130px"} h={"15px"} color={"#b7b7b7"} />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                {notes ? (
                                    <>
                                        {myNotes?.map(note => (
                                            <MyNote note={note} key={note._id} />
                                        ))}
                                    </>
                                ) : (
                                        <>
                                            {favoriteNotes?.map(noteArray => (
                                                noteArray.map(note => (
                                                    <MyNote note={note} key={note._id} />
                                                ))
                                            ))}
                                        </>
                                )}

                                { message }
                            </>
                        )}
                    </div>
                </div>
            ) : (
                <NotAuth />
            )}
        </main>
    );
};

export default Main;