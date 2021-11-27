const Column = require('./../column.js');
const Storage = require('./Storage.js');

module.exports = class StorageReestr extends Storage {
    constructor(...args) {
        super(...args);
    }
    get ColumnList() {
        return ['id', 'Name', 'Description'];
    }
    get TableName() {
        return 'Storage';
    }
    get FormName() {
        return 'StorageReestr';
    }
    get FormDescription() {
        return 'Реестр Справочника складов';
    }
    //Отображать форму в меню
    get DisplayForm() {
        return true;
    }
    //Это Реестр для формы
    get ReestrForForm(){
        return 'StorageForm';
    }
}