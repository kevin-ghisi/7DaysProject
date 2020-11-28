import React from 'react';
// import firebase from "firebase";
// import firestore from '@react-native-firebase/firestore';
// import { List } from 'react-native-paper';
// import fire from "./Fire";

function Note({ data }) {
    return (
        <ul>
            {data.map((item, id) => {
                return <li key={id}>
                    <span>{item.responsible}</span>
                    <br/>
                    <span>{item.date}</span>
                    <br/>
                    <span>{item.description}</span>

                    <hr/>
                </li>
            })}
        </ul>
    );
}

export default Note;