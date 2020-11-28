import React, {Component} from 'react';
import firebase from "firebase";
import fire from "./Fire";

const db = firebase.firestore(fire);

class NoteForm extends Component {

    constructor() {
        super();

        this.state = {
            responsible: '',
            date: '',
            description: ''
        }

        this.createNote = this.createNote.bind(this);
    }

    onChangeHandler (e, data) {
        this.setState({
            [data]: e.target.value
        })
    }

    createNote () {
        if (this.state.responsible !== '' && this.state.date !== '' && this.state.description !== '') {
            db.collection("notes").add({
                responsible: this.state.responsible,
                date: this.state.date,
                description: this.state.description,
            })
        }
    }

    render() {
        return (
            <div className="cadContainer">
                <h2>New Note Register</h2>

                <label>Responsible</label>
                <input type="text" autoFocus required value={this.state.responsible} onChange={(e) => this.onChangeHandler(e, 'responsible')}/>
                <p className="errorMsg">{}</p>

                <label>Date</label>
                <input type="date" autoFocus required value={this.state.date} onChange={(e) => this.onChangeHandler(e, 'date')}/>
                <p className="errorMsg">{}</p>

                <label>Description</label>
                <textarea value={this.state.description} onChange={(e) => this.onChangeHandler(e, 'description')}/>
                <p className="errorMsg">{}</p>

                <div className="btnContainer">
                    <button onClick={this.createNote}>Save</button>
                </div>
            </div>
        );
    }
}

export default NoteForm;