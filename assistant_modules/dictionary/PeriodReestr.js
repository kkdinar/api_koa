const Period = require('./Period.js');

module.exports = class PeriodReestr extends Period {
    constructor(...args) {
        super(...args);
    }

    get ColumnList() {
        return ['id', 'Name'];
    }
    get TableName() {
        return 'PeriodView';
    }
    get FormName() {
        return 'PeriodReestr';
    }
    get FormDescription() {
        return 'Справочник периодов';
    }
}