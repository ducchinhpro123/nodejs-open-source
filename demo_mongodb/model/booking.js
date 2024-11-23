import mongoose from 'mongoose';

const { Schema } = mongoose;

export const Status =  {
  Pending   : 'Pending', 
  Confirmed : 'Confirmed', 
  Cancelled : 'Cancelled'
}

const bookings = new Schema({
  id: Number,
  customerName: String,
  date: { type: Date, defautl: Date.now },
  time: {type: Date, default: Date.now},
  status: {type: String, enum: Object.values(Status), default: Status.Pending}
});

const Booking = mongoose.model('Bookings', bookings);

export default Booking;
