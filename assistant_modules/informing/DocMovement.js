const Column = require('../column.js');
const BaseTable = require('./../basetable.js');

module.exports = class DocMovement extends BaseTable {
    constructor(...args) {
        super(...args);
    }

    get ColumnList() {
        return ['id', 'rct', 'rut', 'rcu', 'ruu', 'rco', 'ruo', 'form', 'Subject', 'Text', 'Description', 'Active', 'NextSendTime', 'Period_id', 'Period_Name', 'WeekDay_id', 'WeekDay_Name', 'Time', 'Name', 'SendingMethod'];
    }
    get TableName() {
        return 'DocMovement';
    }
    get TableType() {
        return 'table';
    }
}