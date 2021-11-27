const Column = require('../column.js');
const DocMovement = require('./DocMovement.js');

module.exports = class FileStorageReestr extends DocMovement {
    constructor(...args) {
        super(...args);
    }

    get ColumnList() {
        return ['id', 'Name', 'Size', 'Type', 'Description', 'Contractor_Name', 'User_Name'];
    }
    get TableName() {
        return 'DocMovement';
    }
    get FormName() {
        return 'FileStorageReestr';
    }
    get FormDescription() {
        return 'Реестр Файлового архива';
    }
    //Отображать форму в меню
    get DisplayForm() {
        return true;
    }
    //Это Реестр для формы
    get ReestrForForm(){
        return 'FileStorage';
    }
}