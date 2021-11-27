const Entity = require('./Entity.js');

module.exports = class InformEntity extends Entity {
    constructor(...args) {
        super(...args);
    }

    get ColumnList() {
        return ['id', 'rct', 'rut', 'rcu', 'ruu', 'rco', 'ruo', 'form', 'Parent', 'Type', 'User_id', 'User_Name', 'InformGroup_id', 'InformGroup_Name'];
    }
    get TableName() {
        return 'Entity';
    }
    get FormName() {
        return 'InformEntity';
    }
    get FormDescription() {
        return 'Табличная часть Формы информирования';
    }
}