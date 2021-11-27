const DocMovement = require('./DocMovement.js');

module.exports = class UserRightReestr extends DocMovement {
    constructor(...args) {
        super(...args);
    }

    get ColumnList() {
        return ['id', 'Name', 'User_Name'];
    }
    get TableName() {
        return 'DocMovement';
    }
    get FormDescription() {
        return 'Права пользователя на документ';
    }
    //Отображать форму в меню
    get DisplayForm() {
        return true;
    }
    //Это Реестр для формы
    get ReestrForForm(){
        return 'UserRight';
    }
}