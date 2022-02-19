import React, { Component } from 'react'
import '../../styles/loading.css';

export default function Loading() {
    return (
        <div className="loader-wrapper">
            <span className="loader"><span className="loader-inner"></span></span>  
        </div>
    );
}
