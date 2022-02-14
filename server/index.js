const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join('.env') });
const Razorpay = require('razorpay');
const router = require('./routes/index');
const connectDB = require('./config/db');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

const razorpay = new Razorpay({
    key_id: 'rzp_test_YwEGRlKoqLToxD',
    key_secret: 'HyE84sPchHUZ2mqDOyC5j97l',
});

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Revels22 Dashboard API',
        success: true,
    });
});

app.use('/api', router);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Running on port ${PORT}`));
module.exports = { razorpay };
