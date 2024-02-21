const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');

app.get('/', (req, res) => {
    res.send('exercise 5 by Wayne Wagiuw');
});

// Middleware untuk request body menggunakan body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware untuk file static
app.use(express.static(path.join(__dirname, 'public')));

// Middleware untuk file upload
const upload = multer({ dest: 'uploads/' });
app.post('/upload', upload.single('file'), (req, res) => {
    const file = req.file;
    if (file) {
        res.send('File berhasil diupload');
    } else {
        res.send('File gagal diupload');
    }
});

// Middleware untuk penanganan CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Contoh REST API endpoints
app.get('/users', (req, res) => {
    // Contoh data users
    const users = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
    ];
    res.json(users);
});

app.post('/users', (req, res) => {
    // Proses untuk menambah user
    const newUser = req.body;
    console.log('Menambah user:', newUser);
    res.send('User berhasil ditambahkan');
});

app.put('/users/:id', (req, res) => {
    // Proses untuk mengupdate user berdasarkan ID
    const userId = req.params.id;
    const updatedUserInfo = req.body;
    console.log('Mengupdate user dengan ID:', userId, 'Info baru:', updatedUserInfo);
    res.send('User berhasil diupdate');
});

app.delete('/users/:id', (req, res) => {
    // Proses untuk menghapus user berdasarkan ID
    const userId = req.params.id;
    console.log('Menghapus user dengan ID:', userId);
    res.send('User berhasil dihapus');
});

// Middleware untuk penanganan 404
app.use((req, res, next) => {
    res.status(404).json({
        status: 'error',
        message: 'Resource tidak ditemukan',
    });
});

// Middleware untuk penanganan error
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: 'error',
        message: 'Terjadi kesalahan pada server',
    });
});

app.listen(port, () => {
    console.log(`Server berjalan pada http://localhost:${port}`);
});
