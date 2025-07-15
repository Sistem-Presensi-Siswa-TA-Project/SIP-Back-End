const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config(); 

const userRoute = require('./routes/userRoute.js');
const siswaRoute = require('./routes/siswaRoute.js');
const authRoute = require('./routes/authRoute.js');
const dashboardRoute = require('./routes/dashboardRoute.js');
const middlewareLogRequest = require('./middleware/logs.js');
const dbpool = require('./config/databaseConfig.js'); 
const guruRoute = require('./routes/guruRoute');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(middlewareLogRequest);
app.use(cors({
  origin: '*',
  credentials: true
}));

// Parsing body
app.use(express.urlencoded({ extended: true }));

// Parsing JSON
app.use(express.json());
app.use(bodyParser.json());

// Trust proxy
app.set('trust proxy', true);

// Set view engine
app.set('view engine', 'ejs');


app.use('/api/siswa', siswaRoute);
app.use('/api/auth', authRoute);
app.use('/api/dashboard', dashboardRoute);
app.use('/api/users', userRoute);
app.use('/api/guru', guruRoute);

app.get('/', (req, res) => {
    res.send('Welcome to the Presensi API Backend!');
});

app.get('/name', (req, res) => {
    res.json({
        nama: 'azra',
        email: 'azra@gmail.com'
    });
});

app.listen(3000, () => {
    console.log('✅ Server berjalan di http://localhost:3000');
});
