import mongoose from 'mongoose';
const {Schema} = mongoose;

const member = new Schema({
  name: String,
  age: Number,
  email: String,
});

const Member = mongoose.model('Members', member);

export default Member;
