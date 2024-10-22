const express = require('express');
const mongoose = require('mongoose');
const transactionRoutes = require('./routes/transactionRoutes');


const app = express();
const PORT = 5000;

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://naveen:kumar@cluster0.f7wmb0k.mongodb.net/expenseTracker?retryWrites=true&w=majority')
    .then(() => {
        console.log('MongoDB Connected');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });

// Use routes

app.use('/api', transactionRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
