const Column = require('../column.js');
const DocMovement = require('./DocMovement.js');

module.exports = class FileStorage extends DocMovement {
    constructor(...args) {
        super(...args);
    }

    get ColumnList() {
        return ['id', 'rct', 'rut', 'rcu', 'ruu', 'rco', 'ruo', 'form', 'Name', 'Size', 'Type', 'Description', 'Contractor_id', 'User_id', 'Contractor_Name', 'User_Name', 'ParentModuleName', 'ParentFormName', 'ParentForm_id'];
    }
    get TableName() {
        return 'DocMovement';
    }
    get FormName() {
        return 'FileStorage';
    }
    get FormDescription() {
        return 'Файловый архив';
    }
}