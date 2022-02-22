import React from 'react'
import '../../styles/loading.css';

export default function Loading() {
    return (
        <main className = "loading">
            <div className="loader-wrapper">
                <span className="loader"><span className="loader-inner"></span></span>  
            </div>
        </main>
    );
}
