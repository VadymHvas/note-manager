import React from 'react';
import "./Main.css";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { checkAuth } from '../../redux/features/AuthSlice';
import NotAuth from '../../components/NotAuth/NotAuth';
import { getMe } from '../../redux/features/AuthSlice';
import { getMyNotes } from "../../redux/features/NoteSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotate } from '@fortawesome/free-solid-svg-icons';
import MyNote from '../../components/MyNoteItem/MyNote';
import { resetFullNoteState } from '../../redux/features/NoteSlice';

const Main = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isAuth = useSelector(checkAuth);

    const { myNotes } = useSelector(state => state.note);

    React.useEffect(() => {
        dispatch(getMe());
        
        setTimeout(() => {
            dispatch(getMyNotes());
        }, 300);

        dispatch(resetFullNoteState(""));
    }, [isAuth, navigate]); 

    return (
        <main>
            {window.localStorage.getItem("token") ? (
                <div className="main">
                    <div className="main-header">
                        <div className="main-title">
                            <h1>Мої нотатки</h1>
                        </div>
                        <div className="main-notes-settings">
                            <div className="update-notes">
                                <span onClick={() => dispatch(getMyNotes())}>
                                    <FontAwesomeIcon icon={faRotate} />
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="my-notes">
                        {myNotes?.map(note => (
                            <MyNote note={note} />
                        ))}
                    </div>
                </div>
            ) : (
                <NotAuth />
            )}
        </main>
    );
};

export default Main;