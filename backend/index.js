// express web server //
const express = require('express');
const app = express();

// env vars //
require('dotenv').config();
const PORT = process.env.PORT;

// middlewares //
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require('cors');
app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true
    })
);

const helmet = require('helmet'); // cookie-parser can be used
app.use(helmet());

const cookieParser = require('cookie-parser'); // cookies can be used
app.use(cookieParser());

const morgan = require('morgan');
app.use(morgan('tiny'));
  
// routes //
const consumerRoutes = require('./routes/consumerRoutes.js');
app.use('/api/v1/consumer', consumerRoutes);

const nutritionRoutes = require('./routes/nutritionRoutes.js');
app.use('/api/v1/nutrition', nutritionRoutes);

// server //
app.listen(PORT, () => {
    console.log(`Server listening on Port ${PORT} ...`);
});