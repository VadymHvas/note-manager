import React from 'react';
import "./FullNote.css";
import { useDispatch, useSelector } from "react-redux";
import { getFullNote } from "../../redux/features/NoteSlice";
import { useParams } from "react-router-dom";

const FullNote = () => {
    const dispatch = useDispatch();
    const params = useParams();

    const { id } = params;

    const { fullNote } = useSelector(state => state.note);

    React.useEffect(() => {
        dispatch(getFullNote({id}));
    }, []);

    return (
        <div className="fullnote">
            <div className="fullnote-title">
                <h1>
                    {fullNote.title}
                </h1>
            </div>
            <div className="fullnote-body">
                <h3>
                    {fullNote.body}
                </h3>
            </div>
        </div>
    );
};

export default FullNote;