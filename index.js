import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HotelRegister from './HotelRegister';
import NgoRegister from './NgoRegister';
import HotelDashboard from './HotelDashboard';
import HotelLogin from './Login';
import NgoDashboard from './NgoDashboard';
import Who from './who';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
      <Route path='/who' element={<Who/>}/>
        <Route path='/register/hotel' element={<HotelRegister/>}/>
        <Route path='/register/ngo' element={<NgoRegister/>}/>
        <Route path='/login' element={<HotelLogin/>}/>
        <Route path='/dashboard/hotel/:hotelId/make_request' element={<HotelDashboard/>}/>
        <Route path='/dashboard/ngo/:ngoId/all_requests' element={<NgoDashboard/>}/>
      </Routes>
    </Router>
  </React.StrictMode>
);


