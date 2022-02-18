import React, { Component } from 'react'
import '../../styles/loading.css';

export default class Loading extends Component {
    render() {
        return (
            <div class="loader-wrapper">
                <span class="loader"><span class="loader-inner"></span></span>  
            </div>
        )
    }
}
