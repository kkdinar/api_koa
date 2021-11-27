const Entity = require('./Entity.js');

module.exports = class UserRightEntity extends Entity {
    constructor(...args) {
        super(...args);
    }

    get ColumnList() {
        return ['id', 'rct', 'rut', 'rcu', 'ruu', 'rco', 'ruo', 'form', 'Name', 'Write', 'Parent', 'DateBegin', 'DateEnd', 'ModuleName', 'Form_Name', 'User_id', 'User_Name'];
    }
    get TableName() {
        return 'Entity';
    }
    get FormDescription() {
        return 'Табличная часть формы Права пользователя на документ';
    }
}