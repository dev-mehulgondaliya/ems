import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import ProtectedRoutes from './shared/ProtectedRoutes';
import Overview from './components/Overview';
import EventList from './components/EventList';
import EventCreate from './components/EventCreate';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin/signup" element={<Signup />} />

        {/* Protected Route */}
        <Route
          path="/dashboard/overview"
          element={
            <ProtectedRoutes>
              <Overview />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/dashboard/eventList"
          element={
            <ProtectedRoutes>
              <EventList />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/dashboard/eventCreate"
          element={
            <ProtectedRoutes>
              <EventCreate />
            </ProtectedRoutes>
          }
        />


      </Routes>
    </Router>
  );
};

export default App;
