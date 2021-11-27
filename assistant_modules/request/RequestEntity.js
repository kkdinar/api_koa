const Entity = require('./Entity.js');

module.exports = class RequestEntity extends Entity  {
    constructor(...args) {
        super(...args);
    }

    get ColumnList() {
        return ['id', 'rct', 'rut', 'rcu', 'ruu', 'rco', 'ruo', 'form', 'Name', 'Parent', 'DateBegin', 'DateEnd', 'User_id', 'Storage_id', 'Contractor_id', 'RequestStatus_id', 'User_Name', 'RequestStatus_Name', 'Form_Name'];
    }
    get TableName() {
        return 'Entity';
    }
    get FormName() {
        return 'RequestEntity';
    }
    get FormDescription() {
        return 'Табличная часть формы ввода заявок';
    }
    get EntityForm() {
        return 'Appendix';
    }
}