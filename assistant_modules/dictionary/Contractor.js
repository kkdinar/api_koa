const Column = require('./../column.js');
const BaseTable = require('./../basetable.js');

module.exports = class Contractor extends BaseTable {
    constructor(...args) {
        super(...args);       
    }

    get ColumnList() {
        return ['id', 'rct', 'rut', 'rcu', 'ruu', 'rco', 'ruo', 'form', 'Name', 'Description', 'Adress', 'Telefon', 'DateBegin', 'DateEnd', 'Category_id', 'Category_Name'];
    }
    get TableName() {
        return 'Contractor';
    }
    get FormDescription() {
        return 'Справочник контрагентов';
    }
    get TableType() {
        return 'table';
    }    
}