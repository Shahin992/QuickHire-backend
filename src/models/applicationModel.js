const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
    {
        job: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Job',
        },
        name: {
            type: String,
            required: [true, 'Please add your name'],
        },
        email: {
            type: String,
            required: [true, 'Please add your email'],
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please add a valid email',
            ],
        },
        resumeLink: {
            type: String,
            required: [true, 'Please add a link to your resume'],
        },
        coverLetter: {
            type: String,
            required: [true, 'Please add a cover letter'],
        },
    },
    {
        timestamps: true,
    }
);

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
