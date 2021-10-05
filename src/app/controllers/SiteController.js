const Course = require('../models/CourseModel');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
    // [get] /
    index(req, res, next) {
        Course.find({})
            .then((courses) => {
                courses = mutipleMongooseToObject(courses); // handlebars
                res.render('home', { courses });
            })
            .catch(next);
    }

    // [get] /news:slug
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
