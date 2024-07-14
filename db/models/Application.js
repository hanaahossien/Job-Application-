import mongoose from 'mongoose';
const { Schema } = mongoose;

const AppSchema = new Schema({
    jobId : {
         type: Schema.Types.ObjectId,
        ref: 'job'
    },

    userId : {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },

    teqSkill: {
        type: [String],
        required: true
    },
    softskill: {
        type: [String],
        unqiue: true,
    },

    userResume : {
        type: String,
    }

}, { versionKey: false, timestamps: true });

export const ApplicationModel = mongoose.model('Application', AppSchema);