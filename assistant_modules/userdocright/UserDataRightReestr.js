const Entity = require('./Entity.js');

module.exports = class UserDataRightReestr extends Entity {
    constructor(...args) {
        super(...args);
    }

    get ColumnList() {
        return ['id', 'Name', 'User_Name', 'ModuleName', 'Form_Name'];
    }
    get TableName() {
        return 'Entity';
    }
    get FormName() {
        return 'UserDataRightReestr';
    }
    get FormDescription() {
        return 'Права пользователя на данные';
    }
    //Отображать форму в меню
    get DisplayForm() {
        return true;
    }
    //Это Реестр для формы
    get ReestrForForm(){
        return 'UserDataRight';
    }
}