var mongoose = require('mongoose');

/**
 * Represents a connection to a database. Currently uses/requires MongoDB and
 * leverages Mongoose. This connection should be used exclusively for model
 * data.
 * @type {Connection}
 */
module.exports = mongoose.createConnection('mongodb://localhost/models');
