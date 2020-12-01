import React from "react";
import Notes from "./Notes";

const Homepage = ({handleLogout}) => {
    return (
        <section className="hero">

            {/*navbar*/}
            <nav>
                <h2>Welcome</h2>
                <button onClick={handleLogout}>Logout</button>
            </nav>

            {/*Note block component*/}
            <Notes />

        </section>
    )
}

export default Homepage;
