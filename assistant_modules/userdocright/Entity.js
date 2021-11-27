const BaseTable = require('./../basetable.js');

module.exports = class Entity extends BaseTable {
    constructor(...args) {
        super(...args);
    }

    get ColumnList() {
        return ['id', 'rct', 'rut', 'rcu', 'ruu', 'rco', 'ruo', 'form', 'Name', 'Write', 'Parent', 'DateBegin', 'DateEnd', 'ModuleName', 'Form_Name', 'User_id', 'User_Name', 'Active'];
    }
    get TableName() {
        return 'Entity';
    }
    get TableDescription() {
        return 'Табличная часть модуля Прав пользователя';
    }
    get TableType() {
        return 'table';
    }
}