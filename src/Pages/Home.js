import React from "react";
import Header from "../Components/Header";

function Home() {
    return (
    <>
        <Header page="home" />
        <main className="vh-100 text-center text-sm-start d-flex align-items-center">
            <div className="container ps-4 pe-4">
                <div className="d-sm-flex align-items-center justify-content-between">
                    <div>
                        <h1 className="animate__animated animate__fadeInLeft">Something came up... can we 
                            <span className="text-info"> Not this week</span>
                        </h1>
                        <p className="lead my-4 animate__animated animate__fadeInLeft">
                            Not this week is a text based approach to the dice slinging game we all know and love. Life happens and things come up, <span className="text-success h5">Not this week</span>  is the solution to keep the adventure alive when life gets in the way.
                        </p>
                        <p className="lead my-4 animate__animated animate__fadeInUp">Come and join us!</p>
                        <a href="/signup" className="animate__animated animate__fadeInUp btn btn-outline-success btn-lg shadow"> Sign up!</a>
                    </div>
                    <img src="%PUBLIC_URL%/imgs/board.jpg" className="animate__animated animate__fadeInRight ms-4 rounded img-fluid w-50 d-none d-sm-block shadow" alt="DND board"/>
                </div>
            </div>
        </main>
    </>
  )
}

export default Home