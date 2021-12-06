import React from 'react'
import '../../styles/modal.css';

export default function Modal({Header, Body, Footer, isVisible}) {
    return (
        <section id="modal" className={isVisible ? "modal modal-visible" : "modal"}>
            <main className="modal-content">
                <header className="modal-header">
                    <span className="close">&times;</span>
                    <Header/>
                </header>
                <main className="modal-body">
                    <Body/>
                </main>
                <footer className="modal-footer">
                    <Footer/>
                </footer>
            </main>
        </section>
    )
}
