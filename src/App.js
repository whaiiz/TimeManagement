import React from 'react';
import Navbar from './components/Navbar'; 
import TaskList from './pages/TaskList'; 
import Planning from './pages/Planning';
import './styles/normalize.css';
import './styles/common.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" exact element={<TaskList/>}/>
        <Route path="/Planning" element={<Planning/>}/>
      </Routes>
    </Router>
  );
}

export default App;
