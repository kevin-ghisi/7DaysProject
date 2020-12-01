import React, {useEffect, useState} from 'react';
import firebase from "firebase";
import Note from "./Note";
import { makeStyles } from '@material-ui/core/styles';
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";

function Notes() {
    const [ responsible, setResponsible ] = useState('');
    const [ date, setDate ] = useState('0000-00-00');
    const [ description, setDescription ] = useState('');
    const [ err, setErr ] = useState('');
    const [ loading, setLoading ] = useState(true);
    const [ notes, setNotes ] = useState([]);

    // Database reference
    const ref = firebase.firestore().collection('notes');

    // Modal States
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    // Styles
    const useStyles = makeStyles((theme) => ({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            backgroundColor: '#28a745',
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            color: '#FFF'
        },
    }));
    const classes = useStyles();

    async function addNote() {

        if (responsible.length > 0 && date.length > 0 && description.length > 0){
            await ref.add({
                responsible: responsible,
                date: date,
                description: description,
            });
            setResponsible('');
            setDate('');
            setDescription('');
            handleOpen();
        } else {
            setErr('All the camps must be filled');
        }

    }

    // Realtime get from firestore
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
        return null;
    }

    // template
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
                        <label>{err}</label>
                    </div>
                    <h4>Registered Notes down below... Scroll down the page</h4>
                </div>

                <div className="grid">
                    <Note data={notes} />
                </div>

                {/*Modal Template*/}
                <div>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={open}
                        onClose={handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <div className={classes.paper}>
                            <h2 id="transition-modal-title">New note Saved!</h2>
                            <p id="transition-modal-description">You can just click anywhere outside me to close.</p>
                        </div>
                    </Modal>
                </div>
            </div>
        </section>
)

}

export default Notes;