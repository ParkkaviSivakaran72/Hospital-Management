import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import AppointmentList from './AppointmentList';
import AddAppointment from './AddAppointment';
import EditAppointment from './EditAppointment';
import DeleteAppointment from './DeleteAppointment';

function App() {
  return (
    <Router>
      <Routes>
          {/* <Route path="/" element={<LoginForm />} >Login </Route> */}
          <Route path="/signup/signup" element={<SignupForm />} >signup</Route>
          <Route path="/home" element={<div>Welcome to the Home Page!</div>} />
      </Routes>
    
        <nav>
            <Link to="/">Appointments</Link> | 
            <Link to="/add_appointment">Add Appointment</Link> | 
            <Link to ="/edit_appointment/:id">Edit Appointment</Link>
        </nav>
        <Routes>
            <Route path="/" element={<AppointmentList />} />
            <Route path="/add_appointment" element={<AddAppointment />} />
            <Route path="/edit_appointment/:id" element={<EditAppointment />} />
            <Route path="/delete_appointment/:id" element={<DeleteAppointment />} />
        </Routes>
    </Router>
  );
}

export default App;
