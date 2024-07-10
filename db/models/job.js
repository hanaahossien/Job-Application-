import mongoose from 'mongoose';
const { Schema } = mongoose;

const jobSchema = new Schema({
    JobT: {
        type: String,
        required: true
    },
    jobLoc: {
        type: String,
        required: true
    },
    workingTime: {
        type: String,
        required: true,
        default: "full-time",
        enum: ['part-time', 'full-time']
    },
    Level: {
        type: String,
        required: true,
        default: "Junior",
        enum: ["Junior", "Mid-Level", "Senior,Team-Lead"]
    },
    jobDes: {
        type: String,
        maxLength: 150,
        trim: true,
    },
    teqSkill: {
        type: [String],
        required: true
    },
    softskill: {
        type: [String],
        unqiue: true,
    },

    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'companey'       
    }


}, { versionKey: false, timestamps: true });

export const jobModel = mongoose.model('job', jobSchema);