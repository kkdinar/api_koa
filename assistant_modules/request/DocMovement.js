const Column = require('../column.js');
const BaseTable = require('./../basetable.js');

module.exports = class DocMovement extends BaseTable {
    constructor(...args) {
        super(...args);
    }

    get ColumnList() {
        return ['id', 'rct', 'rut', 'rcu', 'ruu', 'rco', 'ruo', 'form', 'Name', 'Nomer', 'Date', 'Description', 'DateBegin', 'DateEnd', 'Form_Name', 'Contractor_id', 'Storage_id', 'Contractor_Name', 'Storage_Name'];
    }
    get TableName() {
        return 'DocMovement';
    }
    get TableType() {
        return 'table';
    }
}