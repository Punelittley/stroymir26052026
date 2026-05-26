const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Разрешаем статические файлы только для локальной разработки
if (process.env.NODE_ENV !== 'production') {
    app.use(express.static('.', {
        extensions: ['html', 'htm']
    }));
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // На Vercel файловая система только для чтения, кроме папки /tmp
        const dir = process.env.NODE_ENV === 'production' ? '/tmp' : './img/products';

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } 
});

app.use(express.json());

app.post('/api/upload', upload.array('photos', 3), (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'Файлы не загружены' });
        }

        const filenames = req.files.map(file => 'products/' + file.filename);
        res.json({ filenames });
    } catch (err) {
        res.status(500).json({ error: 'Ошибка сервера при загрузке' });
    }
});

// Запуск сервера только при локальном запуске (node api/upload.js)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Сервер запущен на http://localhost:${PORT}`);
    });
}

module.exports = app;
