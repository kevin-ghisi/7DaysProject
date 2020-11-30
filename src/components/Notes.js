import React, {useEffect, useState} from 'react';
import firebase from "firebase";
import Note from "./Note";

function Notes() {
    const [ responsible, setResponsible ] = useState('');
    const [ date, setDate ] = useState('0000-00-00');
    const [ description, setDescription ] = useState('');


    const [ loading, setLoading ] = useState(true);
    const [ notes, setNotes ] = useState([]);

    const ref = firebase.firestore().collection('notes');

    async function addNote() {
        await ref.add({
            responsible: responsible,
            date: date,
            description: description,
        });
        // setResponsible('');
        // setDate('');
        // setDescription('');
    }

    useEffect(() => {
        return ref.orderBy('date', 'desc').onSnapshot(querySnapshot => {
            const list = [];
            querySnapshot.forEach(doc => {
                const { responsible, date, description} = doc.data();
                list.push({
                    id: doc.id,
                    responsible,
                    date,
                    description
                });
            });

            setNotes(list);

            if (loading) {
                setLoading(false);
            }
        });
    }, []);

    if (loading) {
        return null; // or a spinner
    }

    return (
        <section>
            <div className="content">
                <div className="cadContainer">
                    <h2>New Note Register</h2>

                    <label>Responsible</label>
                    <input type="text" autoFocus required value={responsible} onChange={(e) => setResponsible(e.target.value)}/>

                    <label>Date</label>
                    <input type="date" required value={date} onChange={(e) => setDate(e.target.value)}/>

                    <label>Description</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)}/>

                    <div className="btnContainer">
                        <button onClick={addNote}>Save</button>
                    </div>
                </div>

                <div className="grid">
                    <Note data={notes} />
                </div>
            </div>
        </section>
)

}

export default Notes;