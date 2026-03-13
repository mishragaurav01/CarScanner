import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Vehicle from '@/lib/models/Vehicle';
import { nanoid } from 'nanoid';

export async function POST(request) {
    try {
        const { ownerName, phone, vehicleNumber } = await request.json();

        if (!ownerName || !phone || !vehicleNumber) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        await connectDB();

        const vehicleId = nanoid(8); // Generate 8-character unique ID

        const newVehicle = await Vehicle.create({
            vehicleId,
            ownerName,
            phone,
            vehicleNumber,
        });

        return NextResponse.json({ success: true, vehicleId: newVehicle.vehicleId });
    } catch (error) {
        console.error('Create vehicle error:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
