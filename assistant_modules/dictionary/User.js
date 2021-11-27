const Column = require('./../column.js');
const BaseTable = require('./../basetable.js');

module.exports = class User extends BaseTable {
    constructor(...args) {
        super(...args);
    }

    get ColumnList() {
        return ['id', 'rct', 'rut', 'rcu', 'ruu', 'rco', 'ruo', 'form', 'Parent', 'Name', 'Description', 'Login', 'Password', 'DateBegin', 'DateEnd', 'StaffJob_id', 'StaffJob_Name', 'Contractor_id', 'Contractor_Name', 'Email'];
    }
    get TableName() {
        return 'User';
    }
    get TableType() {
        return 'table';
    }
}