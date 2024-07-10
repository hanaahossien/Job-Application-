import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  fN: { type: String, required: true },
  lN: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unqiue: true,
    trim: true,
  },
  pass: {
    type: String,
    required: true,
  },
  recoveryEmail: {
    type: String,
    trim: true,
  },
  DOB: { type: Date },
  moNum: {
    type: String,
    unqiue: true,
    minLength: [11, "no should have minimum 10 digits"],
    maxLength: [11, "no should have maximum 10 digits"],
    match: [/\d{10}/, "no should only have digits"]
  },

  role: {
    type: String,
    default: "user",
    enum: ['user', 'Company_HR'] 
  },
  status: {
    type: String,
    default: "offline",
    enum: ['online', 'offline']
  }

},{versionKey:false , timestamps :true});

export const usermodel= mongoose.model('user', userSchema);