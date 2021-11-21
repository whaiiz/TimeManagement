import React from 'react';
import Navbar from './components/Navbar'; 
import TaskList from './pages/TaskList'; 
import UpsertTask from './components/modals/UpsertTask';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" exact element={<TaskList/>}/>
        <Route path="/UpsertTask" element={<UpsertTask/>}/>
      </Routes>
    </Router>
  );
}

export default App;
