const moment = require('moment');

module.exports = {
    getWeatherApi(weatherData, date) {
        let dateDiff = moment(date.toISOString().split('T')[0]).diff(
            moment(),
            'days'
        );

        if (dateDiff == 0) {
            return weatherData.current.weather[0].description;
        } else if (dateDiff > 0 && dateDiff < 8) {
            return weatherData.daily[dateDiff].weather[0].description;
        } else {
            return 'Unknown';
        }
    },
};
