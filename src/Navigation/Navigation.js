import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

import {  ExploreLibrary, HomePage } from "../components/HomePage/HomePage";
import { Login } from "../components/Login/Login";
import { AdminLogin } from '../components/Login/AdminLogin';
import { AdminDashboard} from '../components/Dashboards/AdminDashboard';
import {UserDashboard } from '../components/Dashboards/UserDashboard';


export const Navigation = () => {

    return (
        <div>
            <Router>
                <Routes>
                    <Route path='/' exact element={ <HomePage /> } />
                    <Route path='/loginpage' element={ <Login /> } />
                    <Route path='/browselibrary' element={ <ExploreLibrary /> } />
                    <Route path='/adminLogin' element={ <AdminLogin /> } />
                    
                    <Route path='/user/dashboard' exact element={ <ProvideAuth children={ <UserDashboard /> } /> } />
                    <Route path='/adminpage' element={ <ProvideAuth children={ <AdminDashboard /> } /> } />
                </Routes>
            </Router>
        </div>
    );
};

const ProvideAuth = ({ children }) => {
    const token = localStorage.getItem('USER');
    const navigate = useNavigate()
    if (!token) {
        alert('Redirecting to Login')
        navigate('/loginpage')
        return (<Login />)

    } else {
        return (
            <div>
                { children }
            </div>
        )
    }
};



