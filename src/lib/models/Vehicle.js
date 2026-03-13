import mongoose from 'mongoose';

const VehicleSchema = new mongoose.Schema({
    vehicleId: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    ownerName: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    vehicleNumber: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Vehicle || mongoose.model('Vehicle', VehicleSchema);
