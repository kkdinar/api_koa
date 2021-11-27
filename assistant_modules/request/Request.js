const DocMovement = require('./DocMovement.js');

module.exports = class Request extends DocMovement {
    constructor(...args) {
        super(...args);
    }

    get ColumnList() {
        return ['id', 'rct', 'rut', 'rcu', 'ruu', 'rco', 'ruo', 'form', 'Name', 'Nomer', 'Date', 'Description', 'DateBegin', 'DateEnd', 'Form_Name', 'Contractor_id', 'Storage_id', 'Contractor_Name', 'Storage_Name'];
    }
    get TableName() {
        return 'DocMovement';
    }
    get FormName() {
        return 'Request';
    }
    get EntityForm() {
        return 'RequestEntity';
    }
    get FormDescription() {
        return 'Форма ввода Заявок';
    }
}