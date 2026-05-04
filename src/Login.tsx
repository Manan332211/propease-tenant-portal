import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    
    // React Router's navigation hook
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Replace the hardcoded string with this:
const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/login`, {
                email,
                password
            });

            // 1. Save the token to the browser's local storage
            localStorage.setItem('token', response.data.token);
            
            // 2. Redirect the user to the dashboard
            navigate('/dashboard');
            
        } catch (err: any) {
            // Display the error message sent from our Laravel AuthController
            setError(err.response?.data?.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-berry-900 via-berry-800 to-forest-900 flex flex-col justify-center items-center p-4 font-sans">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl border border-ice-200 p-8">
                <div className="text-center mb-8">
                    {/* Logo */}
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-berry-800 text-white font-bold text-xl rounded-xl mb-4 shadow-lg">
                        PE
                    </div>
                    <h1 className="text-2xl font-bold text-berry-900">PropEase Portal</h1>
                    <p className="text-forest-600 mt-2 text-sm">Sign in to manage your lease</p>
                </div>

                {error && (
                    <div className="bg-berry-50 text-berry-800 p-3 rounded-lg mb-4 text-sm text-center border border-berry-200">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-berry-900 mb-1">Email Address</label>
                        <input 
                            type="email" 
                            required
                            className="w-full px-4 py-2.5 border border-ice-200 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent outline-none bg-ice-50 transition-all"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-berry-900 mb-1">Password</label>
                        <input 
                            type="password" 
                            required
                            className="w-full px-4 py-2.5 border border-ice-200 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent outline-none bg-ice-50 transition-all"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-forest-600 text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-forest-700 transition-colors disabled:opacity-50 shadow-md cursor-pointer"
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
            </div>

            <p className="text-ice-200 text-xs mt-6 opacity-75">&copy; 2026 PropEase. All rights reserved.</p>
        </div>
    );
}