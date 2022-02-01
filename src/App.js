import React from 'react';
import TaskList from './pages/TaskList'; 
import Planning from './pages/Planning';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import './styles/normalize.css';
import './styles/common.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Login/>}/>
        <Route path="/Register" exact element={<Register/>}/>
        <Route path="/ForgotPassword" exact element={<ForgotPassword/>}/>
        <Route path="/TaskList" exact element={<TaskList/>}/>
        <Route path="/Planning" element={<Planning/>}/>
      </Routes>
    </Router>
  );
}

export default App;
