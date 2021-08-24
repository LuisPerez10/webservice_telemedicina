// app.use('api/login', require('./routes/usuarios'));
// app.use('api/usuarios', require('./routes/usuarios'));


const express = require('express');
const app = express();

app.use('/login', require('./auth'));
app.use('/usuarios', require('./usuarios'));
app.use('/todo', require('./busquedas'));
app.use('/medicos', require('./medicos'));
app.use('/tickets', require('./tickets'));
app.use('/especialidad', require('./especialidad'));
app.use('/upload', require('./upload'));
app.use('/fichamedica', require('./ficha-medica'));
app.use('/notificacion', require('./notificacion'));
app.use('/horarios', require('./horario'));
app.use('/consulta', require('./consulta'));
// app.use(require('./upload_image'));

module.exports = app;