const Column = require('./../column.js');
const DocMovement = require('./DocMovement.js');

module.exports = class DictionaryForm extends DocMovement {
    constructor(...args) {
        super(...args);
    }
    get ColumnList() {
        return ['id', 'rct', 'rut', 'rcu', 'ruu', 'rco', 'ruo', 'form', 'Name', 'Description', 'DictionaryType'];
    }
    get TableName() {
        //super.TableName();
        return 'DocMovement';
    }
    get EntityForm() {
        return 'DictionaryEntity';
    }
    get FormName() {
        return 'DictionaryForm';
    }
    get FormDescription() {
        return 'Основная форма для простых справочников';
    }   
}