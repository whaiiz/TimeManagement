import React from 'react';
import Navbar from './components/Navbar'; 
import TaskList from './components/TaskList'; 

function App() {
  return (
    <React.Fragment>
      <Navbar></Navbar>
      <TaskList></TaskList>
    </React.Fragment>
  );
}

export default App;
