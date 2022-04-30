const moment = require('moment');

const currentDate = () => moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

const longLatValidation = (lat, long) => {
    const latRegExp = /^(\+|-)?((90(\.0{6}))|([0-9]|[1-8][0-9])(\.[0-9]{5,6}?))$/;
    const longRegExp = /^(\+|-)?((180(\.0{6}))|([0-9]|[1-9][0-9]|1[1-7][0-9])(\.[0-9]{5,6}?))$/;
    let temp = [false, false]
    if (latRegExp.test(lat)) temp = [true, temp[1]]
    if (longRegExp.test(long)) temp = [temp[0], true]
    return temp;
}

module.exports = { currentDate, longLatValidation };
