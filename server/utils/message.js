var moment = require('moment');

var createdAt = moment().valueOf();

var generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt
    };
};

var generateLocationMessage = (from, latitude, longitude) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt
    }
}

module.exports = { generateMessage, generateLocationMessage };