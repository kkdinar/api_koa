const Column = require('./../column.js');
const BaseTable = require('./../basetable.js');

module.exports = class Material extends BaseTable {
    constructor(...args) {
        super(...args);
    }

    get ColumnList() {
        return ['id', 'rct', 'rut', 'rcu', 'ruu', 'rco', 'ruo', 'form', 'Name', 'Description', 'Client_id', 'Contractor_id', 'DateBegin', 'DateEnd'];
    }
    get TableName() {
        return 'Material';
    }
    get TableType() {
        return 'table';
    }
}