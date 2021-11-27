const Column = require('./../column.js');
const BaseTable = require('./../basetable.js');

module.exports = class WeekDay extends BaseTable {
    constructor(...args) {
        super(...args);
    }

    get ColumnList() {
        return ['id', 'Name'];
    }
    get TableName() {
        return 'WeekDayView';
    }
    get TableDescription() {
        return 'Вьюшка по дням недели(1 - Понедельник, 2 - Вторник, ... 7 – Воскресенье)';
    }
    get TableType() {
        return 'view';
    }

    get ViewSelectScript() {
        const script = `
        SELECT 
            1 AS "id", 'Понедельник' AS "Name"
        UNION SELECT
            2 AS "id", 'Вторник' AS "Name"
        UNION SELECT
            3 AS "id", 'Среда' AS "Name"
        UNION SELECT
            4 AS "id", 'Четверг' AS "Name"
        UNION SELECT
            5 AS "id", 'Пятница' AS "Name"
        UNION SELECT
            6 AS "id", 'Суббота' AS "Name"
        UNION SELECT
            7 AS "id", 'Воскресенье' AS "Name"
        `;

        return script;
    }
}