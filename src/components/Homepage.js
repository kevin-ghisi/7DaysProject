import React from "react";
// import NoteForm from "./NoteForm";
// import NotesList from "./NotesList";
import Notes from "./Notes";

const Homepage = ({handleLogout}) => {
    return (
        <section className="hero">
            <nav>
                <h2>Welcome</h2>
                <button onClick={handleLogout}>Logout</button>
            </nav>

            {/*<NoteForm />*/}

            {/*<NotesList />*/}
            <Notes />

        </section>
    )
}

export default Homepage;
