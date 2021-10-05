const Course = require('../models/CourseModel');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class CoursesController {
    // [get] /me/stored/courses
    storedCourses(req, res, next) {
        // gộp 2 promise vào 1 để send được deletedCount
        Promise.all([
            Course.find({}).sortable(req),
            Course.countDocumentsDeleted(),
        ]).then(([courses, deletedCount]) => {
            res.render('me/stored-courses', {
                deletedCount,
                courses: mutipleMongooseToObject(courses),
            });
        });
    }

    // [get] /me/courses/trash
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then((courses) =>
                res.render('me/trash-courses', {
                    courses: mutipleMongooseToObject(courses),
                }),
            )
            .catch(next);
    }

    // [get] /me/stored/blog   
}

module.exports = new CoursesController();
