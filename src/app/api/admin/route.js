import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Vehicle from '@/lib/models/Vehicle';
import Activity from '@/lib/models/Activity';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        await connectDB();

        // Time calculations
        const now = new Date();
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        // Fetch counts
        const totalVehicles = await Vehicle.countDocuments();
        const vehiclesThisMonth = await Vehicle.countDocuments({ createdAt: { $gte: startOfMonth } });

        const scans30Days = await Activity.countDocuments({
            type: 'SCANNED',
            createdAt: { $gte: thirtyDaysAgo }
        });

        const lastScanActivity = await Activity.findOne({ type: 'SCANNED' }).sort({ createdAt: -1 });

        // Total contacts (unique phone numbers)
        const uniquePhones = await Vehicle.distinct('phone');
        const totalContacts = uniquePhones.length;

        // Fetch list of vehicles
        const vehicles = await Vehicle.find().sort({ createdAt: -1 });

        // Fetch recent activities
        const recentActivities = await Activity.find().sort({ createdAt: -1 }).limit(10);

        return NextResponse.json({
            success: true,
            data: {
                metrics: {
                    totalVehicles,
                    vehiclesThisMonth,
                    scans30Days,
                    lastScan: lastScanActivity ? lastScanActivity.createdAt : null,
                    totalContacts
                },
                vehicles,
                recentActivities
            }
        });

    } catch (error) {
        console.error('Admin API error:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
