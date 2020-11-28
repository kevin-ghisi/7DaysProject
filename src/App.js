import React, {useEffect, useState} from "react";
import fire from "./components/Fire";
import Login from "./components/Login";
import Homepage from "./components/Homepage";
import './App.css';
import firebase from "firebase";

function App() {
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [hasAccount, setHasAccount] = useState(false);
    const [ loading, setLoading ] = useState(true);
    const [ todos, setTodos ] = useState([]);

    // let data = firebase.firestore().collection('notes').get()
    let db = firebase.firestore().collection('notes')

    // const [setNotes] = set('');
    // function listenForChange () {
    //
    //     db.get().then((querySnapshot) => {
    //
    //         querySnapshot.forEach(documentSnapshot => {
    //             let note = {
    //                 id: documentSnapshot.id,
    //                 responsible: documentSnapshot.data().responsible,
    //                 date: documentSnapshot.data().date,
    //                 description: documentSnapshot.data().description,
    //             }
    //
    //             let list = notes;
    //             list.push(note);
    //
    //             console.log("Note:", note);
    //             console.log("Note List:", list);
    //         });
    //
    //     })
    //
    // }

    const clearInputs = () => {
        setEmail('');
        setPassword('');
    };

    const clearErrors = () => {
        setEmailError('');
        setPasswordError('');
    };

    const handleLogin = () => {
        clearErrors();

        fire
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch(err => {
                switch (err.code) {
                    case "auth/invalid-email":
                    case "auth/user-disabled":
                    case "auth/user-not-found":
                        setEmailError(err.message);
                        break
                    case "auth/wrong-password":
                        setPasswordError(err.message);
                        break;
                    default:
                        setEmailError("Unidentified Error");
                        setPasswordError("Unidentified Error");
                        break;
                }
            })
    };

    const handleSignUp = () => {
        clearErrors();

        fire
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .catch(err => {
                switch (err.code) {
                    case "auth/email-already-in-use":
                    case "auth/invalid-email":
                        setEmailError(err.message);
                        break
                    case "auth/weak-password":
                        setPasswordError(err.message);
                        break;
                    default:
                        setEmailError("Unidentified Error");
                        setPasswordError("Unidentified Error");
                        break;
                }
            })
    };

    const handleLogOut = () => {
        fire.auth().signOut();
    };

    const authListener = () => {
        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                clearInputs();
                setUser(user);
            } else {
                setUser("");
            }
        });
    };

    useEffect(() => {
        authListener();

        return db.onSnapshot(querySnapshot => {
            const list = [];
            querySnapshot.forEach(doc => {
                const { responsible, date, description } = doc.data();
                list.push({
                    id: doc.id,
                    responsible,
                    date,
                    description
                });
            });

            setTodos(list);

            if (loading) {
                setLoading(false);
            }
        });
        // listenForChange();
    }, [])

    return (
        <div className="App">

            {user ? (
                <Homepage handleLogout={handleLogOut}/>
            ) : (
                <Login
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    handleLogin={handleLogin}
                    handleSignUp={handleSignUp}
                    hasAccount={hasAccount}
                    setHasAccount={setHasAccount}
                    emailError={emailError}
                    passwordError={passwordError}
                />
            )}
        </div>
    );
}

export default App;
