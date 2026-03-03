/* eslint-disable no-unused-vars */
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation, redirect } from 'react-router-dom';

const BugReport = () => {
    const [form, setForm] = useState({ name: '', email: '', details: '' });
    const [submitted, setSubmitted] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const API_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const location = useLocation();
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post(`${API_URL}/api/v1/ai/report-bug`, { name: form.name, email: form.email, message: form.details });
            console.log('res', res);
            if (res.status === 200 || res.status === 201) {
                setSuccess(true);
            }
        } catch (error) {
            setSuccess(false);
            console.log("error", error);
        } finally {
            setLoading(false);
        }
        setSubmitted(true);
    };

    useEffect(() => {
        if (submitted && success) {
            const timer = setTimeout(() => {
                const from = location.state?.from || '/';
                navigate(from);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [submitted, success, navigate, location]);

    if (submitted && success) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen px-4">
                <div className="w-full max-w-md bg-gradient-to-br from-green-400 via-green-200 to-white rounded-xl shadow-2xl p-8 flex flex-col items-center animate-fade-in">
                    <svg className="w-16 h-16 mb-4 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2l4-4m6 2a9 9 0 11-18 0a9 9 0 0118 0z" />
                    </svg>
                    <h2 className="text-2xl font-bold mb-2 text-green-700">Thank you!</h2>
                    <p className="text-gray-700 mb-2 text-center">Your bug report has been submitted.<br />Redirecting you back...</p>
                </div>
            </div>
        );
    }

    if (submitted && !success) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen px-4">
                <div className="w-full max-w-md bg-gradient-to-br from-red-400 via-red-200 to-white rounded-xl shadow-2xl p-8 flex flex-col items-center animate-fade-in">
                    <svg className="w-16 h-16 mb-4 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <h2 className="text-2xl font-bold mb-2 text-red-700">Oops!</h2>
                    <p className="text-gray-700 mb-2 text-center">Something went wrong. Please try again later.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
                <div className='flex flex-row items-center justify-between'>
                    <h2 className="text-xl font-bold mb-4 text-red-500">Report a Bug</h2>
                    <span onClick={() => navigate("/")} className='relative bottom-2 bg-gray-100 p-2 text-center rounded-full hover:cursor-pointer hover:bg-gray-200'>❌</span>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-black outline-none focus:outline-none"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 text-black"
                        />
                    </div>
                    <div>
                        <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-1">Bug Details</label>
                        <textarea
                            id="details"
                            name="details"
                            value={form.details}
                            onChange={handleChange}
                            required
                            rows={4}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 text-black"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-red-500 text-white font-semibold py-2 rounded-md hover:bg-red-600 transition-all hover:cursor-pointer"
                    >
                        {loading ? "Submitting..." : "Submit Bug Report"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BugReport;
