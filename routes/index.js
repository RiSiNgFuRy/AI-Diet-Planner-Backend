const express = require('express');
const app = express();

const authRoutes = require('./auth')
const genderTypeRoutes = require('./genderType')
const usersRoutes = require('./users')
const foodPreferencesRoutes = require('./foodPreferences')
const goalTypeRoutes = require('./goalType')

app.use('/', authRoutes)
app.use('/', genderTypeRoutes)
app.use('/', usersRoutes)
app.use('/', foodPreferencesRoutes)
app.use('/', goalTypeRoutes)

module.exports = app;