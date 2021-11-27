const Column = require('./../column.js');
const BaseTable = require('./../basetable.js');

module.exports = class Entity extends BaseTable{
    constructor(...args) {
        super(...args);
    }

    get ColumnList() {
        return ['id', 'rct', 'rut', 'rcu', 'ruu', 'rco', 'ruo', 'form', 'Parent', 'Type', 'User_id', 'User_Name', 'InformGroup_id', 'InformGroup_Name'];
    }
    get TableName() {
        return 'Entity';
    }
    get TableDescription() {
        return 'Табличная часть модуля информирования';
    }
    get TableType() {
        return 'table';
    }
}