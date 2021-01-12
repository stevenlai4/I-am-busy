const moment = require('moment');

module.exports = {
    getWeatherApi(weatherArr, date) {
        let dateDiff = moment(date.toISOString().split('T')[0]).diff(
            moment(new Date().toISOString().split('T')[0]),
            'days'
        );

        if (weatherArr.length > 0 && dateDiff + 1 < 8) {
            return weatherArr[dateDiff + 1].weather[0].description;
        } else {
            return 'Unknown';
        }
    },
};
