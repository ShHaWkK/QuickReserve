// backend/src/models/ReservationModel.ts
import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    resource: { type: mongoose.Schema.Types.ObjectId, ref: 'Resource', required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true }
});

const Reservation = mongoose.model('Reservation', reservationSchema);
export default Reservation;
