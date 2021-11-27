const Column = require('./../column.js');
const Storage = require('./Storage.js');

module.exports = class StorageForm extends Storage {
    constructor(...args) {
        super(...args);
    }
    get ColumnList() {
        return ['id', 'rct', 'rut', 'rcu', 'ruu', 'rco', 'ruo', 'form', 'Name', 'Description', 'Adress', 'Telefon',];
    }
    get TableName() {
        return 'Storage';
    }
    get FormName() {
        return 'StorageForm';
    }
    get FormDescription() {
        return 'Форма Справочника складов';
    }
}