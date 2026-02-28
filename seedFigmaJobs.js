const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const Job = require('./src/models/jobModel');

const connectDB = async () => {
    try {
        const username = process.env.DB_USER;
        const password = process.env.DB_PASS;
        const dbName = process.env.DB_NAME;
        const uri = `mongodb+srv://${encodeURIComponent(username)}:${encodeURIComponent(password)}@cluster0.c60ctk1.mongodb.net/${encodeURIComponent(dbName)}?retryWrites=true&w=majority&appName=Cluster0`;

        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 10000,
            connectTimeoutMS: 10000,
            socketTimeoutMS: 20000,
        });
        console.log(`MongoDB Connected`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const jobs = [
    // Featured Jobs
    {
        title: "Email Marketing",
        companyName: "Revolut",
        location: "Madrid, Spain",
        jobType: "Full Time",
        category: "Marketing",
        tag2: "Design",
        description: "Revolut is looking for Email Marketing to help team ma...",
        logo: "R",
        logoColor: "bg-white border text-dark font-serif"
    },
    {
        title: "Brand Designer",
        companyName: "Dropbox",
        location: "San Francisco, US",
        jobType: "Full Time",
        category: "Design",
        tag2: "Business",
        description: "Dropbox is looking for Brand Designer to help the team t...",
        logo: "D",
        logoColor: "bg-[#0061FF]"
    },
    {
        title: "Email Marketing",
        companyName: "Pitch",
        location: "Berlin, Germany",
        jobType: "Full Time",
        category: "Marketing",
        description: "Pitch is looking for Customer Manager to join marketing t...",
        logo: "P",
        logoColor: "bg-[#0B0B0B]"
    },
    {
        title: "Visual Designer",
        companyName: "Blinkist",
        location: "Granada, Spain",
        jobType: "Full Time",
        category: "Design",
        description: "Blinkist is looking for Visual Designer to help team desi...",
        logo: "B",
        logoColor: "bg-[#1DD084]"
    },
    {
        title: "Product Designer",
        companyName: "ClassPass",
        location: "Manchester, UK",
        jobType: "Full Time",
        category: "Marketing",
        tag2: "Design",
        description: "ClassPass is looking for Product Designer to help us...",
        logo: "C",
        logoColor: "bg-[#004BFF]"
    },
    {
        title: "Lead Designer",
        companyName: "Canva",
        location: "Ontario, Canada",
        jobType: "Full Time",
        category: "Design",
        tag2: "Business",
        description: "Canva is looking for Lead Engineer to help develop n...",
        logo: "C",
        logoColor: "bg-[#00C4CC]"
    },
    {
        title: "Brand Strategist",
        companyName: "GoDaddy",
        location: "Marseille, France",
        jobType: "Full Time",
        category: "Marketing",
        description: "GoDaddy is looking for Brand Strategist to join the team...",
        logo: "G",
        logoColor: "bg-[#000000]"
    },
    {
        title: "Data Analyst",
        companyName: "Twitter",
        location: "San Diego, US",
        jobType: "Full Time",
        category: "Technology",
        description: "Twitter is looking for Data Analyst to help team desi...",
        logo: "T",
        logoColor: "bg-[#1DA1F2]"
    },

    // Latest Jobs Open
    {
        title: "Social Media Assistant",
        companyName: "Nomad",
        location: "Paris, France",
        jobType: "Full-Time",
        category: "Marketing",
        tag2: "Design",
        description: "Nomad is looking for Social Media Assistant.",
        logo: "N",
        logoColor: "bg-[#56CDAD]"
    },
    {
        title: "Social Media Assistant",
        companyName: "Netlify",
        location: "Paris, France",
        jobType: "Full-Time",
        category: "Marketing",
        tag2: "Design",
        description: "Netlify is looking for Social Media Assistant.",
        logo: "N",
        logoColor: "bg-[#38CBF3]"
    },
    {
        title: "Brand Designer",
        companyName: "Dropbox",
        location: "San Fransisco, USA",
        jobType: "Full-Time",
        category: "Marketing",
        tag2: "Design",
        description: "Dropbpox is looking for a Brand Designer.",
        logo: "D",
        logoColor: "bg-[#0061FF]" // Dropbox Blue
    },
    {
        title: "Brand Designer",
        companyName: "Maze",
        location: "San Fransisco, USA",
        jobType: "Full-Time",
        category: "Marketing",
        tag2: "Design",
        description: "Maze is looking for a Brand Designer.",
        logo: "M",
        logoColor: "bg-[#0B35FF]"
    },
    {
        title: "Interactive Developer",
        companyName: "Terraform",
        location: "Hamburg, Germany",
        jobType: "Full-Time",
        category: "Marketing",
        tag2: "Design",
        description: "Terraform interactive developer role.",
        logo: "T",
        logoColor: "bg-[#38CBF3]"
    },
    {
        title: "Interactive Developer",
        companyName: "Udacity",
        location: "Hamburg, Germany",
        jobType: "Full-Time",
        category: "Marketing",
        tag2: "Design",
        description: "Udacity interactive developer role.",
        logo: "U",
        logoColor: "bg-[#00B4CC]"
    },
    {
        title: "HR Manager",
        companyName: "Packer",
        location: "Lucern, Switzerland",
        jobType: "Full-Time",
        category: "Marketing",
        tag2: "Design",
        description: "Packer HR Manager",
        logo: "P",
        logoColor: "bg-[#FF5A5F]"
    },
    {
        title: "HR Manager",
        companyName: "Webflow",
        location: "Lucern, Switzerland",
        jobType: "Full-Time",
        category: "Marketing",
        tag2: "Design",
        description: "Webflow HR Manager",
        logo: "W",
        logoColor: "bg-[#4353FF]"
    }
];

const seedDB = async () => {
    await connectDB();
    await Job.deleteMany({});
    await Job.insertMany(jobs);
    console.log("Database Seeded!");
    process.exit(0);
};

seedDB();
