import React from 'react'
import '../../styles/modal.css';

export default function Modal({HeaderComponent, BodyComponent, FooterComponent}) {
    return (
        <section id="modal" className="modal">
            <main className="modal-content">
                <header className="modal-header">
                    <span className="close">&times;</span>
                    <HeaderComponent/>
                </header>
                <main className="modal-body">
                    <BodyComponent/>
                </main>
                <footer className="modal-footer">
                    <FooterComponent/>
                </footer>
            </main>
        </section>
    )
}
