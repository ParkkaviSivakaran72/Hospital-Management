import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './LoginForm';


function App() {
  return (
    <Router>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/home" element={<div>Welcome to the Home Page!</div>} />
            </Routes>
        </Router>
  );
}

export default App;
