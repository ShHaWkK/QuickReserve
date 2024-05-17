// backend/src/models/ResourceModel.ts
import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    availability: { type: Boolean, required: true, default: true }
});

const Resource = mongoose.model('Resource', resourceSchema);
export default Resource;
