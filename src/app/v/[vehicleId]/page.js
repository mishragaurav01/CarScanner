"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { use } from 'react';

export default function ContactPage({ params }) {
    const unwrappedParams = use(params);
    const { vehicleId } = unwrappedParams;

    const [vehicle, setVehicle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!vehicleId) return;

        fetch(`/api/vehicle/${vehicleId}`)
            .then(res => res.json())
            .then(data => {
                if (!data.success) {
                    throw new Error(data.error || 'Invalid QR');
                }
                setVehicle(data.vehicle);
            })
            .catch(err => {
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [vehicleId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-gray-900">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-full mb-4"></div>
                    <div className="w-32 h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="w-48 h-4 bg-gray-200 rounded"></div>
                </div>
            </div>
        );
    }

    if (error || !vehicle) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center text-gray-900">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Invalid QR</h1>
                <p className="text-gray-500 max-w-sm mb-6">
                    We couldn't find any vehicle associated with this QR code.
                </p>
                <Link href="/" className="px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition">
                    Go Home
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-gray-900">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
                <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                </div>

                <h1 className="text-2xl font-bold mb-3 text-gray-900">Contact Vehicle Owner</h1>

                <p className="text-gray-600 mb-8 border-b border-gray-100 pb-8 text-sm">
                    If this vehicle is causing an issue, please call the owner directly. For privacy, their number is hidden.
                </p>

                <a
                    href={`tel:${vehicle.phone}`}
                    className="w-full flex justify-center py-4 px-4 rounded-xl shadow-sm text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 hover:scale-[1.02] transition-all"
                >
                    Call Owner
                </a>
            </div>

            <div className="mt-12 text-center text-sm">
                <p className="text-gray-400 mb-2">Powered by ScanMyCar</p>
                <Link href="/create" className="text-blue-600 hover:underline font-medium">
                    Get your own vehicle QR
                </Link>
            </div>
        </div>
    );
}
