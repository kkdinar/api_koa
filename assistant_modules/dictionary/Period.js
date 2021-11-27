const Column = require('./../column.js');
const BaseTable = require('./../basetable.js');

module.exports = class Period extends BaseTable{
    constructor(...args) {
        super(...args);       
    }

    get ColumnList() {
        return ['id', 'Name'];
    }
    get TableName() {
        return 'PeriodView';
    }
    get TableDescription() {
        return 'Вьюшка по периодичности(1 - Однократно, 2 – Ежедневно, 3 – Еженедельно, 4 – Ежемесячно, 5 – Ежегодно)';
    }
    get TableType(){
        return 'view';
    }

    get ViewSelectScript(){
        const script = `
        SELECT 
            1 AS "id", 'Однократно' AS "Name"
        UNION SELECT
            2 AS "id", 'Ежедневно' AS "Name"
        UNION SELECT
            3 AS "id", 'Еженедельно' AS "Name"
        UNION SELECT
            4 AS "id", 'Ежемесячно' AS "Name"
        UNION SELECT
            5 AS "id", 'Ежегодно' AS "Name"
        `;

        return script;
    }
}