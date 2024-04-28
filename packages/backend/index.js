const express = require('express');
const cors = require('cors');
const passport = require('passport');
const logger = require('morgan');
const path = require('path');

const db = require('./db');

// const setupJwtStrategy = require('./src/middleware/jwtStrategy');
// const jwtAdminStrategy = require('./src/middleware/jwtAdminStrategy');

// const healthcheckApi = require('./src/api/healthcheck');
// const practicesApi = require('./src/api/practices');
// const webVoteApi = require('./src/api/webVote');
// const authApi = require('./src/api/auth');
// const starProfileApi = require('./src/api/starProfile');
// const newReleasesApi = require('./src/api/newReleases');
// const topChartApi = require('./src/api/topChart');
// const notificationsApi = require('./src/api/notifications');
// const juryApi = require('./src/api/jury');
// const trainerApi = require('./src/api/trainer');

// new
const driver = require('./src1/api/driver');
// const driver = require('./src1/api/driver');
// const driver = require('./src1/api/driver');
// const driver = require('./src1/api/driver');
// const driver = require('./src1/api/driver');
// const driver = require('./src1/api/driver');
// const driver = require('./src1/api/driver');
//

const PORT = process.env.PORT || 3011;

const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json({ extended: true }));
app.use(passport.initialize());
app.use('/admin', express.static(path.join(__dirname, 'admin-frontend-dist')));
app.use('/static', express.static(path.join(__dirname, 'admin-frontend-dist', 'static')));

// setupJwtStrategy(passport);
// jwtAdminStrategy(passport);

app.use('/api/v1/driver', driver);
// app.use('/api/v1/practices', practicesApi);
// app.use('/api/v1/webVote', webVoteApi);
// app.use('/api/v1/auth', authApi);
// app.use('/api/v1/starProfile', starProfileApi);
// app.use('/api/v1/new-releases', newReleasesApi);
// app.use('/api/v1/top-chart', topChartApi);
// app.use('/api/v1/notifications', notificationsApi);
// app.use('/api/v1/jury', juryApi);
// app.use('/api/v1/trainer', trainerApi);

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
