const Column = require('./../column.js');
const BaseTable = require('./../basetable.js');

module.exports = class Entity extends BaseTable {
    constructor(...args) {
        super(...args);
    }

    get ColumnList() {
        return ['id', 'rct', 'rut', 'rcu', 'ruu', 'rco', 'ruo', 'form', 'Name', 'Parent', 'DateBegin', 'DateEnd'];
    }
    get TableName() {
        return 'Entity';
    }
    get TableDescription() {
        return 'Табличная часть модуля Справочники';
    }
    get TableType() {
        return 'table';
    }
}