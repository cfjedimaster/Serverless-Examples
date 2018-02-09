module.exports = function (cb) {
	console.log('began the task');
	cb(null, 'Hello '+ new Date().getFullYear());
}