
import Planning from './pages/Planning';
import Login from './pages/Login';
import TaskList from './pages/TaskList';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import './styles/common/normalize.css';
import './styles/common/common.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/Login" exact element={<Login/>}/>
                <Route path="/Register" exact element={<Register/>}/>
                <Route path="/ForgotPassword" exact element={<ForgotPassword/>}/>
                <Route path="/ResetPassword" exact element={<ResetPassword/>}/>
                <Route path="/" exact element={<TaskList/>}/>
                <Route path="/Planning" element={<Planning/>}/>
            </Routes>
        </Router> 
  );
}

export default App;
