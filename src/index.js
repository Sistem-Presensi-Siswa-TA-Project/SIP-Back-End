const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config(); 

const userRoute = require('./routes/userRoute.js');
const siswaRoute = require('./routes/siswaRoute.js');
const authRoute = require('./routes/authRoute.js');
const middlewareLogRequest = require('./middleware/logs.js');
const guruRoute = require('./routes/guruRoute');
const piketRoute = require('./routes/piketRoute');
const mapelRoute = require('./routes/mapelRoute');
const jadwalRoute = require('./routes/jadwalRoute');
const presensiMapelRoute = require('./routes/presensiMapelRoute.js');
const presensiPiketRoute = require('./routes/presensiPiketRoute.js');

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

// Trust proxy
app.set('trust proxy', true);

// Set view engine
app.set('view engine', 'ejs');


app.use('/api/siswa', siswaRoute);
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/guru', guruRoute);
app.use('/api/piket', piketRoute)
app.use('/api/mapel', mapelRoute);
app.use('/api/jadwal', jadwalRoute);
app.use('/api/presensi-mapel', presensiMapelRoute);
app.use('/api/presensi-piket', presensiPiketRoute);

app.get('/', (req, res) => {
    res.send('Welcome to the Presensi API Backend!');
});

app.get('/test', (req, res) => {
    res.json({
        respon: 'berhasil jalan',
    });
});

app.listen(3000, () => {
    console.log('✅ Server berjalan di http://localhost:3000');
});
