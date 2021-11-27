const Column = require('./../column.js');
const Entity = require('./Entity.js');

module.exports = class DictionaryEntity extends Entity {
    constructor(...args) {
        super(...args);
    }
    get ColumnList() {
        return ['id', 'rct', 'rut', 'rcu', 'ruu', 'rco', 'ruo', 'form', 'Name', 'Parent', 'DateBegin', 'DateEnd'];
    }
    get TableName() {
        return 'Entity';
    }
    get FormName() {
        return 'DictionaryEntity';
    }
    get FormDescription() {
        return 'Табличная форма для простых справочников';
    }
}