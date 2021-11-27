const DocMovement = require('./DocMovement.js');

module.exports = class InformReestr extends DocMovement {
    constructor(...args) {
        super(...args);
    }

    get ColumnList() {
        return ['id', 'Subject', 'Description', 'Active'];
    }
    get TableName() {
        return 'DocMovement';
    }
    get FormName() {
        return 'InformReestr';
    }
    get FormDescription() {
        return 'Реестр Формы информирования';
    }
    //Отображать форму в меню
    get DisplayForm() {
        return true;
    }
    //Это Реестр для формы
    get ReestrForForm(){
        return 'Inform';
    }
}