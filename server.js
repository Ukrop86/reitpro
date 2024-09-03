const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 1234;

// Налаштування статичних файлів
app.use(express.static(path.join(__dirname, './')));

// Приклад API для отримання логіну
app.get('/api/login', (req, res) => {
    // В даному випадку логін жорстко закодований. Замініть це на фактичний метод отримання логіну.
    const userLogin = 'User123'; // Місце для отримання даних логіну
    res.json({ login: userLogin });
});

// Відповідає за основний HTML файл
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
