const DocMovement = require('./DocMovement.js');

module.exports = class UserRight extends DocMovement {
    constructor(...args) {
        super(...args);
    }

    get ColumnList() {
        return ['id', 'rct', 'rut', 'rcu', 'ruu', 'rco', 'ruo', 'form', 'Type', 'Name', 'User_id', 'User_Name', 'Client_id', 'DateBegin', 'DateEnd'];
    }
    get TableName() {
        return 'DocMovement';
    }
    get EntityForm() {
        return 'UserDataRight';
    }
    get FormDescription() {
        return 'Форма изменения прав пользователя на документ';
    }
}