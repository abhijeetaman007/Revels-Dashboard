const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected`);
        if(connection.connection.name == "Revels22TestingDashboard")
        {
            console.log('Connected to PRODUCTION DB')
        }
    } catch (error) {
        console.log(`Error Connectiing DB : ${error}`);
    }
};
module.exports = connectDB;
