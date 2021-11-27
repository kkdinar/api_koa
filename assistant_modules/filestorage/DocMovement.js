const BaseTable = require('./../basetable.js');

module.exports = class DocMovement extends BaseTable {
    constructor(...args) {
        super(...args);
    }

    get ColumnList() {
        return ['id', 'rct', 'rut', 'rcu', 'ruu', 'rco', 'ruo', 'form', 'Name', 'Size', 'Type', 'Description', 'Form_Name', 'Contractor_id', 'User_id', 'Contractor_Name', 'User_Name', 'ParentModuleName', 'ParentFormName', 'ParentForm_id'];
    }
    get TableName() {
        return 'DocMovement';
    }
    get TableType() {
        return 'table';
    }
}