const WeekDay = require('./WeekDay.js');

module.exports = class WeekDayReestr extends WeekDay {
    constructor(...args) {
        super(...args);
    }

    get ColumnList() {
        return ['id', 'Name'];
    }
    get TableName() {
        return 'WeekDayView';
    }
    get FormName() {
        return 'WeekDayReestr';
    }
    get FormDescription() {
        return 'Справочник периодов';
    }
}