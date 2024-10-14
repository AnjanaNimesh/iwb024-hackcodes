import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DonationForm from './components/DonationForm';
import PaymentSuccess from './components/PaymentSuccess';
import PaymentCancel from './components/PaymentCancel';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    return (
        <Router>
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} />
            <Routes>
                <Route path="/" element={<DonationForm />} />
                <Route path="/success" element={<PaymentSuccess />} />
                <Route path="/cancel" element={<PaymentCancel />} />
            </Routes>
        </Router>
    );
};

export default App;
