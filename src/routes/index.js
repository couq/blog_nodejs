const newsRouter = require('./news');
const siteRouter = require('./site');
const coursesRouter = require('./courses');
const merouter = require('./me');
function route(app) {
    app.use('/me', merouter);
    app.use('/courses', coursesRouter);
    app.use('/news', newsRouter);
    app.use('/', siteRouter);
}

module.exports = route;
