const express = require('express');
const dotenv = require('dotenv');
dotenv.config(); 

const userRoute = require('./routes/userRoute.js');
const siswaRoute = require('./routes/siswaRoute.js');
const authRoute = require('./routes/authRoute.js');
const dashboardRoute = require('./routes/dashboardRoute.js');
const middlewareLogRequest = require('./middleware/logs.js');
const dbpool = require('./config/databaseConfig.js'); 

const app = express();

app.use(express.json());
app.use(middlewareLogRequest);


app.use('/api/siswa', siswaRoute);
app.use('/api/auth', authRoute);
app.use('/api/dashboard', dashboardRoute);

app.get('/', (req, res) => {
    res.send('Welcome to the Presensi API Backend!');
});

app.use('/api/users', userRoute);

app.get('/name', (req, res) => {
    res.json({
        nama: 'azra',
        email: 'azra@gmail.com'
    });
});

app.listen(3000, () => {
    console.log('✅ Server berjalan di http://localhost:3000');
});
