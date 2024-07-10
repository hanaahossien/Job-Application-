import mongoose from 'mongoose';
const { Schema } = mongoose;

const companeySchema = new Schema({

    comName: {
        type: String,
        required: true,
        unqiue: true
    },

    des: {
        type: String,
        maxLength: 200,
        required: true
    },

    industry: {
        type: String,
        trim: true,
        maxLength: 30
    },

    address: {
        type: String,
        required: true
    },

    numOfEmp: {
        type: Number,
        min: 11,
        max: 20
    },

    comEmail: {
        type: String,
        unqiue: true,
        trim: true,
    },

    HR_id: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }

}, { versionKey: false, timestamps: true });

export const comModel = mongoose.model('companey', companeySchema);