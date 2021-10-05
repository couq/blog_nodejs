const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const CourseSchema = new Schema(
    {
        _id: { type: Number },
        name: { type: String, required: true },
        description: { type: String },
        image: { type: String, maxLength: 255 },
        videoId: { type: String, maxLength: 255 },
        level: { type: String, maxLength: 255 },
        slug: { type: String, slug: 'name', unique: true },
        createdAt: { type: 'Date', default: Date.now() },
        updatedAt: { type: 'Date', default: Date.now() },
    },
    {
        _id: false,
        timestamp: true,
    },
);

// increment
CourseSchema.plugin(AutoIncrement);

// Custom query helpers
CourseSchema.query.sortable = function (req) {
    if (req.query.hasOwnProperty('_sort')) {
        const isValidType = ['asc', 'desc'].includes(req.query.type);
        return this.sort({
            [req.query.col]: isValidType ? req.query.type : 'asc',
        }); //
    }
    return this; // this(CoursesChema)
};

// add plugins
mongoose.plugin(slug);
CourseSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Course', CourseSchema); // (modelName, collectionName)
