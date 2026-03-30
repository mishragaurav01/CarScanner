"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showAllVehicles, setShowAllVehicles] = useState(false);

    useEffect(() => {
        fetch('/api/admin')
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    setData(res.data);
                }
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const timeAgo = (dateStr) => {
        if (!dateStr) return 'Never';
        const seconds = Math.floor((new Date() - new Date(dateStr)) / 1000);
        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + "y ago";
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + "mo ago";
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + "d ago";
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + "h ago";
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + "m ago";
        return "Just now";
    };

    if (loading) {
        return <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center text-gray-500">Loading Dashboard...</div>;
    }

    if (!data) {
        return <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center text-red-500">Failed to load dashboard.</div>;
    }

    const { metrics, vehicles, recentActivities } = data;

    return (
        <div className="min-h-screen bg-[#F8F9FA] text-gray-900 font-sans pb-10">
            {/* Header */}
            <header className="px-6 py-5 flex items-center justify-between bg-white/50 backdrop-blur-md sticky top-0 z-10 border-b border-gray-100">
                <div className="text-xl font-bold tracking-tight">
                    <span className="text-blue-600">Scan</span>
                    <span className="text-gray-900">Park</span>
                </div>
                <button className="text-gray-700">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </header>

            <main className="px-4 py-6 max-w-lg mx-auto">
                {/* Stats Cards - Horizontal Scroll on mobile */}
                <div className="flex space-x-4 overflow-x-auto pb-4 snap-x hide-scrollbar">
                    {/* Vehicles Registered */}
                    <div className="flex-none w-[70%] sm:w-[42%] bg-white rounded-2xl p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-gray-100 snap-start">
                        <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Vehicles Registered</h3>
                        <p className="text-3xl font-bold text-gray-900 mb-2">{metrics.totalVehicles}</p>
                        <p className="text-xs text-green-600 font-medium">+{metrics.vehiclesThisMonth} this month</p>
                    </div>

                    {/* QR Scans */}
                    <div className="flex-none w-[70%] sm:w-[42%] bg-white rounded-2xl p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-gray-100 snap-start">
                        <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">QR Scans (30D)</h3>
                        <p className="text-3xl font-bold text-gray-900 mb-2">{metrics.scans30Days}</p>
                        <p className="text-xs text-green-600 font-medium">Last scan: {timeAgo(metrics.lastScan)}</p>
                    </div>

                    {/* Contact */}
                    <div className="flex-none w-[70%] sm:w-[42%] bg-white rounded-2xl p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-gray-100 snap-start">
                        <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Contact</h3>
                        <p className="text-3xl font-bold text-gray-900 mb-2">{metrics.totalContacts}</p>
                        <p className="text-xs text-green-600 font-medium">Privacy protected</p>
                    </div>
                </div>

                {/* Your Vehicles */}
                <section className="mt-6">
                    <div className="flex items-center justify-between mb-4 px-1">
                        <h2 className="text-xl font-bold text-gray-900">Your Vehicles</h2>
                        {vehicles.length > 3 && (
                            <button
                                onClick={() => setShowAllVehicles(!showAllVehicles)}
                                className="text-sm text-blue-600 font-medium hover:text-blue-700 transition"
                            >
                                {showAllVehicles ? 'Show Less' : 'View All'}
                            </button>
                        )}
                    </div>
                    <div className="space-y-3">
                        {vehicles.length === 0 ? (
                            <p className="text-sm text-gray-500 text-center py-4">No vehicles registered yet.</p>
                        ) : (
                            (showAllVehicles ? vehicles : vehicles.slice(0, 3)).map((v) => (
                                <div key={v.vehicleId} className="bg-white rounded-2xl p-4 flex items-center shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)] border border-gray-100">
                                    <div className="bg-orange-50 w-12 h-12 rounded-xl flex items-center justify-center mr-4 shrink-0 overflow-hidden shrink-0">
                                        {/* Mock vehicle image */}
                                        <img src="https://img.icons8.com/color/96/000000/suv.png" alt="car" className="w-10 h-10 object-contain" />
                                    </div>
                                    <div className="flex-grow min-w-0">
                                        <h3 className="text-[15px] font-bold text-gray-900 truncate">{v.ownerName}'s Car</h3>
                                        <p className="text-xs text-gray-500 font-medium tracking-wide mt-0.5">{v.vehicleNumber}</p>
                                    </div>
                                    <div className="flex items-center space-x-3 ml-2 shrink-0">
                                        <span className="bg-[#E4EDE0] text-[#4A6B5C] text-[10px] font-bold px-2.5 py-1 rounded-full">Active</span>
                                        <div className="w-8 h-8 rounded shrink-0 opacity-80 pl-1 border-l border-gray-100">
                                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M3 3H9V9H3V3Z" fill="currentColor" />
                                                <path d="M15 3H21V9H15V3Z" fill="currentColor" />
                                                <path d="M3 15H9V21H3V15Z" fill="currentColor" />
                                                <path d="M11 3H13V5H11V3Z" fill="currentColor" />
                                                <path d="M11 7H13V9H11V7Z" fill="currentColor" />
                                                <path d="M3 11H5V13H3V11Z" fill="currentColor" />
                                                <path d="M7 11H9V13H7V11Z" fill="currentColor" />
                                                <path d="M15 11H17V13H15V11Z" fill="currentColor" />
                                                <path d="M19 11H21V13H19V11Z" fill="currentColor" />
                                                <path d="M11 15H13V17H11V15Z" fill="currentColor" />
                                                <path d="M11 19H13V21H11V19Z" fill="currentColor" />
                                                <path d="M15 15H17V17H15V15Z" fill="currentColor" />
                                                <path d="M19 15H21V17H19V15Z" fill="currentColor" />
                                                <path d="M15 19H17V21H15V19Z" fill="currentColor" />
                                                <path d="M19 19H21V21H19V19Z" fill="currentColor" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </section>

                <div className="mt-5 mb-8">
                    <Link href="/create" className="flex items-center justify-center w-full py-3.5 bg-[#4A6B5C] hover:bg-[#3d5a4d] text-white rounded-xl text-sm font-semibold transition-colors shadow-sm">
                        +Register a new vehicle
                    </Link>
                </div>

                {/* Recent Activity */}
                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-4 px-1">Recent Activity</h2>
                    <div className="space-y-3">
                        {recentActivities.length === 0 ? (
                            <p className="text-sm text-gray-500 text-center py-4">No recent activities.</p>
                        ) : (
                            recentActivities.map((activity, idx) => (
                                <div key={idx} className="bg-[#E7E7E7] rounded-xl p-4 flex items-center min-h-[80px]">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-2 mb-1">
                                            {activity.type === 'CREATED' ? (
                                                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                            ) : (
                                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                            )}
                                            <p className="text-sm font-bold text-gray-700">{activity.type === 'CREATED' ? 'New Registration' : 'QR Scanned'}</p>
                                        </div>
                                        <p className="text-xs text-gray-500 ml-4">{activity.message}</p>
                                    </div>
                                    <div className="text-[10px] text-gray-400 font-medium">
                                        {timeAgo(activity.createdAt)}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}

// Global CSS to hide scrollbar
if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.innerHTML = `
        .hide-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
    `;
    document.head.appendChild(style);
}
