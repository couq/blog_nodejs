module.exports = {
    // Convert muptipleMongoose to arrays
    mutipleMongooseToObject: function (mongoose) {
        return mongoose.map((mongoose) => mongoose.toObject());
    },
    // Convert 1 mongoose
    mongooseToObject: function (mongoose) {
        return mongoose ? mongoose.toObject() : mongoose;
    },
};
