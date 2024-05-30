const express = require('express');
const cors = require('cors');
const passport = require('passport');
const logger = require('morgan');
const path = require('path');

const db = require('./db');

const staff = require('./src1/api/staff');
const driver = require('./src1/api/driver');
const companiesA = require('./src1/api/companiesA');
const statusOrder = require('./src1/api/statusOrder');
const order = require('./src1/api/order'); 

const PORT = process.env.PORT || 3011;

const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json({ extended: true }));
app.use(passport.initialize());
app.use('/admin', express.static(path.join(__dirname, 'admin-frontend-dist')));
app.use('/static', express.static(path.join(__dirname, 'admin-frontend-dist', 'static')));

app.use('/api/v1/staff', staff);
app.use('/api/v1/driver', driver);
app.use('/api/v1/companiesa', companiesA);
app.use('/api/v1/statusorder', statusOrder);
app.use('/api/v1/orders', order);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin-frontend-dist', 'index.html'));
});

db.testConnection()
  .then(() => db.sequelize.sync())
  // .then(() => db.sequelize.sync({ force: true, logging: false }))
  .then(
    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`);
    }),
  );
