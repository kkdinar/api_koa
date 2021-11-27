const BaseTable = require('./../basetable.js');

module.exports = class DocMovement extends BaseTable {
    constructor(...args) {
        super(...args);
    }

    get ColumnList() {
        return ['id', 'rct', 'rut', 'rcu', 'ruu', 'rco', 'ruo', 'form', 'Type', 'Name', 'User_id', 'User_Name', 'Client_id', 'DateBegin', 'DateEnd'];
    }
    get TableName() {
        return 'DocMovement';
    }
    get TableDescription() {
        return 'Основная таблица модуля Прав пользователя';
    }
    get TableType() {
        return 'table';
    }
}