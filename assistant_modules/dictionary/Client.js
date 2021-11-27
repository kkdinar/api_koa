const Column = require('./../column.js');
const BaseTable = require('./../basetable.js');

module.exports = class Client extends BaseTable{
    constructor(...args) {
        super(...args);       
    }

    get ColumnList() {
        return ['id', 'rct', 'rut', 'rcu', 'ruu', 'rco', 'ruo', 'Name', 'Description', 'Login', 'Password', 'DateBegin', 'DateEnd'];
    }
    get TableName() {
        return 'Client';
    }
    get FormDescription() {
        return 'Справочник клиентов';
    }
    get TableType(){
        return 'table';
    }
}