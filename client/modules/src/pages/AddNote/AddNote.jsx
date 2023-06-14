import React from 'react';
import "./AddNote.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNoteSticky, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createNote } from '../../redux/features/NoteSlice';
import Spinner from "../../components/Loader/Spinner";

const AddNote = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isAuth } = useSelector(state => state.auth);
    const { loading, message } = useSelector(state => state.note);

    const [title, setTitle] = React.useState("");
    const [body, setBody] = React.useState("");

    React.useEffect(() => {
        if (!window.localStorage.getItem("token")) navigate("/");
    }, [isAuth, navigate]);

    const createNoteHandler = () => {
        dispatch(createNote({title, body}));

        if (!title || !body) return;

        navigate("/");
    };

    return (
        <div className="addNote">
            <div className="addNote-title">
                <h1>Додати нотатку</h1>
            </div>

            <form className="addNote-form" method="post" onSubmit={e => e.preventDefault()}>
                <div className="note-title">
                    <label htmlFor="title">Введіть заголовок <FontAwesomeIcon icon={faNoteSticky} /></label>

                    <br />

                    <input type="text" name="title" id="title" className="form-input"
                     value={title} onChange={e => setTitle(e.target.value)} />
                </div>

                <div className="note-body">
                    <label htmlFor="body">Введіть опис <FontAwesomeIcon icon={faCalendar} /></label>

                    <br />

                    <textarea type="text" id="body" name="body" className="form-input"
                     value={body} onChange={e => setBody(e.target.value)} />
                </div>

                <div className="errors">
                    <span>{message}</span>
                </div>

                {loading ? <Spinner id={"dark"} /> : false}

                <div className="submit-btn">
                    <button className="regular-btn" onClick={createNoteHandler}>Додати</button>
                </div>
            </form>
        </div>
    );
};

export default AddNote;