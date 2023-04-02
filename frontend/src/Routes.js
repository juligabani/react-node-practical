import React, { Component } from 'react';
import { BrowserRouter, Route, Routes as Router } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";

class Routes extends Component {
    render() {
        return (
            <BrowserRouter>
                <Router>
                    <Route path='/' element={<Login />} />
                    <Route path='/register' element={<Signup />} />
                    <Route path='/dashboard' element={<Dashboard />} />
                </Router>
            </BrowserRouter>
        )
    }
}

export default Routes;