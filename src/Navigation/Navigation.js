import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import {  ExploreLibrary, HomePage } from "../components/HomePage/HomePage";
import { Login } from "../components/Login/Login";
import { SignUp } from "../components/SignUp/SignUp";
import { AdminLogin } from '../components/Login/AdminLogin';
import { AdminDashboard} from '../components/Dashboards/AdminDashboard';
import {UserDashboard } from '../components/Dashboards/UserDashboard';


export const Navigation = () => {

    return (
        <div>
            <Router>
                <Routes>
                    <Route path='/' exact element={<HomePage />} />
                    <Route path='/loginpage' element={<Login />} />
                    <Route path='/signupPage' element={<SignUp />} />
                    <Route path='/browselibrary' element={<ExploreLibrary />} />
                    <Route path='/adminLogin' element={<AdminLogin />} />
                    <Route path='/user/dashboard' exact element={<UserDashboard />} />
                    <Route path='/adminpage' element={<AdminDashboard />} />
                </Routes>
            </Router>
        </div>
    );
};


