import mongoose from 'mongoose';

const ActivitySchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['CREATED', 'SCANNED'],
        required: true,
    },
    vehicleId: {
        type: String,
        required: true,
        index: true,
    },
    message: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Activity || mongoose.model('Activity', ActivitySchema);
