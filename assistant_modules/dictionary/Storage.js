const Column = require('./../column.js');
const BaseTable = require('./../basetable.js');

module.exports = class Storage extends BaseTable {
    constructor(...args) {
        super(...args);
    }

    get ColumnList() {
        return ['id', 'rct', 'rut', 'rcu', 'ruu', 'rco', 'ruo', 'form', 'Name', 'Description', 'Adress', 'Telefon', 'DateBegin', 'DateEnd'];
    }
    get TableName() {
        return 'Storage';
    }
    get TableType() {
        return 'table';
    }
}