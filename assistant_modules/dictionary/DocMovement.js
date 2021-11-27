const BaseTable = require('./../basetable.js');

module.exports = class DocMovement extends BaseTable {
    constructor(...args) {
        super(...args);
    }

    get ColumnList() {
        return ['id', 'rct', 'rut', 'rcu', 'ruu', 'rco', 'ruo', 'form', 'Name', 'Description', 'DictionaryType'];
    }
    get TableName() {
        return 'DocMovement';
    }
    get TableDescription() {
        return 'Таблица основной формы модуля Справочники';
    }
    get TableType() {
        return 'table';
    }
}