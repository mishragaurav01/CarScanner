import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Vehicle from '@/lib/models/Vehicle';

export async function GET(request, { params }) {
    try {
        const { vehicleId } = await params;

        if (!vehicleId) {
            return NextResponse.json({ error: 'Vehicle ID is required' }, { status: 400 });
        }

        await connectDB();

        const vehicle = await Vehicle.findOne({ vehicleId });

        if (!vehicle) {
            return NextResponse.json({ error: 'Vehicle not found' }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            vehicle: {
                vehicleId: vehicle.vehicleId,
                ownerName: vehicle.ownerName,
                phone: vehicle.phone,
                vehicleNumber: vehicle.vehicleNumber
            }
        });

    } catch (error) {
        console.error('Fetch vehicle error:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
