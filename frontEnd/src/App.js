import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import AppointmentList from './AppointmentList';
import AddAppointment from './AddAppointment';
import EditAppointment from './EditAppointment';
import DeleteAppointment from './DeleteAppointment';
import ComplaintList from './ComplaintList'


function App() {
  return (
    <Router>
      <Routes>
          {/* <Route path="/" element={<LoginForm />} >Login </Route> */}
          <Route path="/signup/signup" element={<SignupForm />} >signup</Route>
          <Route path="/home" element={<div>Welcome to the Home Page!</div>} />
      </Routes>
    
        <nav>
            <Link to="/get_appointments">Appointments</Link> | 
       
            <Link to="/add_appointment">Add Appointment</Link> | 
            <Link to ="/edit_appointment/:id">Edit Appointment</Link>
            <Link to = "/delete_appointment/:id">Delete Appointment</Link>
        </nav>
        <nav>
          <Link to="/complain">All Complain</Link>
        </nav>
        <Routes>
            <Route path="/get_appointments" element={<AppointmentList />} />
            
            <Route path="/add_appointment" element={<AddAppointment />} />
            <Route path="/edit_appointment/:id" element={<EditAppointment appointmentId="21"/>} />
            <Route path="/delete_appointment/:id" element={<DeleteAppointment />} />
            <Route path="/complain" element={<ComplaintList />} />
        </Routes>
    </Router>
  );
}

export default App;
