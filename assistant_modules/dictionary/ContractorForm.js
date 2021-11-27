const Column = require('./../column.js');
const Contractor = require('./Contractor.js');

module.exports = class ContractorForm extends Contractor{
    constructor(...args) {
        super(...args);
    }
    get ColumnList() {
        return ['id', 'rct', 'rut', 'rcu', 'ruu', 'rco', 'ruo', 'form', 'Name', 'Description', 'Adress', 'Telefon', 'Category_id', 'Category_Name'];
    }
    get TableName() {
        return 'Contractor';
    }
    get FormName() {
        return 'ContractorForm';
    }
    get FormDescription() {
        return 'Форма Справочника контрагентов';
    }
}