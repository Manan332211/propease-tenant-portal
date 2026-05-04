import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// 1. The TypeScript Interface: Proves you know how to strictly type API responses
interface TenantData {
    tenant_name: string;
    contact_number: string;
    // THE UPGRADE: This is now an Array of objects `[]` instead of just one object
    active_leases: {
        id: number;
        unit_name: string;
        rent_amount: string | number;
        end_date: string;
        contract_url: string | null;
    }[];
}

export default function Dashboard() {
    // 2. State Management
    const [data, setData] = useState<TenantData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();
    const TOKEN = localStorage.getItem('token');

    // 3. The API Call
    useEffect(() => {
        // If there is no token in memory, kick them back to login instantly
        if (!TOKEN) {
            navigate('/');
            return;
        }

        axios.get(`${import.meta.env.VITE_API_BASE_URL}/tenant/dashboard`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${TOKEN}`
            }
        })
            .then(response => {
                setData(response.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("API Error:", err);
                // If Laravel rejects the token (401), clear memory and kick to login
                if (err.response?.status === 401) {
                    localStorage.removeItem('token');
                    navigate('/');
                } else {
                    setError("Could not load data. Ensure your Laravel server is running.");
                    setLoading(false);
                }
            });
    }, [navigate, TOKEN]);


    // 4. Loading & Error UI
    if (loading) return <div className="min-h-screen flex items-center justify-center text-xl text-forest-600 bg-ice-50">Loading your portal...</div>;
    if (error) return <div className="min-h-screen flex items-center justify-center text-berry-700 font-bold bg-ice-50">{error}</div>;
    if (!data) return null;

    // 5. The Main SaaS UI (Using Tailwind CSS for rapid styling)
    return (
        <div className="min-h-screen bg-ice-50 font-sans">
            
            {/* 1. The PropEase Top Navigation Bar */}
            <nav className="bg-berry-800 border-b border-berry-900 shadow-lg">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center gap-3">
                            {/* PropEase Brand Logo Area */}
                            <div className="bg-white text-berry-800 font-bold text-xl px-3 py-1 rounded-lg shadow-sm">
                                PE
                            </div>
                            <div>
                                <h1 className="text-white font-bold text-xl tracking-wide">PropEase</h1>
                                <p className="text-ice-200 text-xs uppercase tracking-wider font-semibold">Tenant Portal</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="hidden md:block text-right">
                                <p className="text-white text-sm font-medium">{data.tenant_name}</p>
                                <p className="text-ice-200 text-xs">Logged In</p>
                            </div>
                            
                            <button 
                                onClick={() => {
                                    localStorage.removeItem('token');
                                    navigate('/');
                                }}
                                className="bg-berry-900 text-white text-sm px-4 py-2 rounded-lg border border-berry-700 hover:bg-berry-950 transition-colors cursor-pointer"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* 2. The Main Content Area */}
            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                
                <header className="mb-6 flex justify-between items-end">
                    <div>
                        <h2 className="text-2xl font-bold text-berry-900">Your Property Overview</h2>
                        <p className="text-forest-700">View your current lease details and important documents.</p>
                    </div>
                    {/* Show a badge with the total number of properties */}
                    <div className="bg-forest-100 text-forest-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide border border-forest-200">
                        {data.active_leases.length} Active {data.active_leases.length === 1 ? 'Lease' : 'Leases'}
                    </div>
                </header>

                {/* THE UPGRADE: Check if the array has items, then map through them */}
                {data.active_leases.length > 0 ? (
                    <div className="space-y-6">
                        {data.active_leases.map((lease) => (
                            <div key={lease.id} className="bg-white rounded-xl shadow-sm border border-ice-200 overflow-hidden">
                                <div className="bg-berry-50 border-b border-berry-100 px-6 py-4">
                                    <h3 className="text-berry-800 font-bold text-lg flex items-center gap-2">
                                        📍 Unit: {lease.unit_name}
                                    </h3>
                                </div>
                                
                                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="bg-forest-50 p-4 rounded-lg border border-forest-100">
                                        <p className="text-xs text-forest-600 uppercase tracking-wider font-bold mb-1">Annual Rent Amount</p>
                                        <p className="text-3xl font-extrabold text-berry-900">
                                            AED {Number(lease.rent_amount).toLocaleString()}
                                        </p>
                                    </div>
                                    
                                    <div className="p-4">
                                        <p className="text-xs text-ice-700 uppercase tracking-wider font-bold mb-1">Contract Expiration</p>
                                        <p className="text-xl text-berry-900 font-medium">
                                            {new Date(lease.end_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                                        </p>
                                        
                                        <div className="mt-4 pt-4 border-t border-ice-200">
                                            {lease.contract_url ? (
                                                <a 
                                                    href={lease.contract_url} 
                                                    target="_blank" 
                                                    rel="noreferrer"
                                                    className="inline-flex items-center text-sm font-bold text-forest-600 hover:text-forest-800 transition-colors"
                                                >
                                                    📄 View Signed Contract &rarr;
                                                </a>
                                            ) : (
                                                <span className="text-sm text-ice-500 italic">No contract uploaded</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-ice-100 border border-ice-300 rounded-xl p-6 text-ice-800">
                        You do not currently have any active leases assigned to your profile.
                    </div>
                )}
            </main>
        </div>
    );
}