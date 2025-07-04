const express = require('express');
const usersRoutes = require('./routes/users.js');
const middlewareLogRequest = require('./middleware/logs.js');
const siswaRoute = require('./routes/siswaRoute.js');

const app = express();

app.use(middlewareLogRequest);

app.use('/users', usersRoutes);
app.use('/api', siswaRoute);

app.get('/', (req,res) => {
    dbpool.execute('SELECT * FROM admin', (err, rows) => {
        if(err){
            return res.json({
                message: 'koneksi gagal'
            })
        }
        res.json({
            message: 'koneksi berhasil',
            data: rows
        })
    })
})

app.get("/name", (req,res) => {
    res.json({
        nama: "azra",
        email: "azra@gmail.com"
    });
});

app.post("/", (req,res) => {
    res.send('hello post method');
});

app.listen(4000, () => {
    console.log('server berhasil di running di port 4000');
})