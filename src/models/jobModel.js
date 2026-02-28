const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please add a job title'],
            trim: true,
        },
        companyName: {
            type: String,
            required: [true, 'Please add a company name'],
        },
        location: {
            type: String,
            required: [true, 'Please add a location'],
        },
        jobType: {
            type: String,
            required: [true, 'Please add a job type'],
        },
        salary: {
            type: String,
            default: 'Not Specified'
        },
        category: {
            type: String,
            required: [true, 'Please add a category'],
        },
        logo: { type: String },
        logoColor: { type: String },
        tag2: { type: String },
        description: {
            type: String,
            required: [true, 'Please add a job description'],
        },
    },
    {
        timestamps: true,
    }
);

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
