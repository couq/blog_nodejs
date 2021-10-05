module.exports = function sortMiddleware(req, res, next) {
    res.locals._sort = {
        enabled: false,
        type: 'default',
    };

    if (req.query.hasOwnProperty('_sort')) {
        // res.locals._soft.enabled = true;
        // res.locals._soft.type = req.query.type;
        // res.locals._soft.col = req.query.name;

        Object.assign(res.locals._sort, {
            enabled: true,
            type: req.query.type,
            col: req.query.col,
        });
    }

    next();
};
