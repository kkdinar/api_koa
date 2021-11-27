const Entity = require('./Entity.js');

module.exports = class UserDataRight extends Entity {
    constructor(...args) {
        super(...args);
    }

    get ColumnList() {
        return ['id', 'rct', 'rut', 'rcu', 'ruu', 'rco', 'ruo', 'form', 'Name', 'Write', 'Parent', 'DateBegin', 'DateEnd', 'ModuleName', 'Form_Name', 'User_id', 'User_Name', 'Active'];
    }
    get TableName() {
        return 'Entity';
    }
    get EntityForm() {
        return 'UserDataRightEntity';
    }
    get FormName() {
        return 'UserDataRight';
    }
    get FormDescription() {
        return 'Форма изменения прав пользователя на данные';
    }
}