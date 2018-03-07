module.exports = function (options, cb) {
	console.log('compiler called', options.script);
    return cb(null, function (cb) {
      cb(null, options.script);
    });
};