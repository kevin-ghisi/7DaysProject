import React from "react";
import NoteForm from "./NoteForm";
import CardHolder from "./CardHolder";

const Homepage = ({handleLogout}) => {
    return (
        <section className="hero">
            <nav>
                <h2>Welcome</h2>
                <button onClick={handleLogout}>Logout</button>
            </nav>

            <NoteForm />

            <CardHolder />

        </section>
    )
}

export default Homepage;
