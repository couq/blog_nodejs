const Course = require('../models/CourseModel');
const { mongooseToObject } = require('../../util/mongoose');

class CoursesController {
    // [get] /courses/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) => {
                res.render('./courses/show', {
                    course: mongooseToObject(course),
                });
            })
            .catch(next);
    }

    // [get] /courses/create
    create(req, res, next) {
        res.render('./courses/create');
    }

    // [post] /courses/store // create course
    store(req, res, next) {
        req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const course = new Course(req.body);
        course
            .save()
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    // [post] /courses/edit/:id // edit course
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then((course) => {
                res.render('./courses/edit', {
                    course: mongooseToObject(course),
                });
            })
            .catch(next);
    }

    // [put] /courese/:id // update course
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    // [delete] /courese/:id // soft delete course
    delete(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [delete] /courese/:id/force // force delete course
    forceDelete(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [patch] /courese/:id/restore // restore course
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [post] /courese/:id/restore // restore course
    handleRestoredActions(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Course.delete({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;

            default:
                res.json({ message: 'Action invalid' });
        }
    }

    // [post] /courese/:id/restore // restore course
    handleTrashActions(req, res, next) {
        switch (req.body.action) {
            case 'restore':
                Course.restore({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'delete':
                Course.deleteMany({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;

            default:
                res.json({ message: 'Action invalid' });
        }
    }
}

module.exports = new CoursesController();
