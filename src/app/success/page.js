"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import QRCode from 'qrcode';

function SuccessScreen() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const router = useRouter();
    const [qrCodeUrl, setQrCodeUrl] = useState('');

    useEffect(() => {
        if (id) {
            // In production, this should be the absolute URL
            const contactUrl = `${window.location.origin}/v/${id}`;
            QRCode.toDataURL(contactUrl, {
                width: 300,
                margin: 2,
                color: {
                    dark: '#000000',
                    light: '#ffffff'
                }
            })
                .then(url => {
                    setQrCodeUrl(url);
                })
                .catch(err => {
                    console.error('QR Generator Error:', err);
                });
        }
    }, [id]);

    if (!id) {
        return (
            <div className="text-center">
                <p>No Vehicle ID provided.</p>
                <button onClick={() => router.push('/')} className="mt-4 text-blue-600">Go Home</button>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center max-w-sm mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
            </div>

            <h2 className="text-2xl font-bold mb-2 text-gray-900">QR Generated!</h2>
            <p className="text-gray-500 mb-6 text-sm">Your vehicle QR is ready.</p>

            {qrCodeUrl ? (
                <div className="bg-gray-50 p-4 rounded-xl mb-6 flex justify-center w-full">
                    <img src={qrCodeUrl} alt="Vehicle QR Code" className="w-48 h-48 object-contain rounded-lg" />
                </div>
            ) : (
                <div className="w-48 h-48 bg-gray-100 animate-pulse rounded-lg mx-auto mb-6"></div>
            )}

            <div className="uppercase tracking-wider font-mono text-xs font-bold text-gray-400 mb-8 border border-gray-100 py-2 px-4 rounded-full">
                ID: {id}
            </div>

            <div className="w-full space-y-3">
                {qrCodeUrl && (
                    <a
                        href={qrCodeUrl}
                        download={`vehicle-qr-${id}.png`}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition"
                    >
                        Download QR Code
                    </a>
                )}

                <button
                    onClick={() => router.push('/create')}
                    className="w-full flex justify-center py-3 px-4 rounded-xl text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 transition"
                >
                    Create Another
                </button>
            </div>
        </div>
    );
}

export default function SuccessPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-gray-900">
            <Suspense fallback={<div className="animate-pulse">Loading...</div>}>
                <SuccessScreen />
            </Suspense>
        </div>
    );
}
