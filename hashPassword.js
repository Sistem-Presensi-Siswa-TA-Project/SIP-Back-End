const bcrypt = require('bcryptjs');

// Ganti password ini dengan password yang ingin kamu hash
<<<<<<< HEAD
const plainPassword = 'testpw';
=======
const plainPassword = 'test2';
>>>>>>> d19e81286ea10feace4256f98044584aa5c41317

// Jumlah salt rounds (standar: 10)
const saltRounds = 10;

// Proses hash
bcrypt.hash(plainPassword, saltRounds, (err, hash) => {
  if (err) {
    console.error('Gagal melakukan hashing:', err);
    return;
  }
  console.log('Password asli :', plainPassword);
  console.log('Password hash:', hash);
});
