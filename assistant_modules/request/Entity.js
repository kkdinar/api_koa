
const BaseTable = require('./../basetable.js');

module.exports = class Entity extends BaseTable {
    constructor(...args) {
        super(...args);
    }

    get ColumnList() {
        return ['id', 'rct', 'rut', 'rcu', 'ruu', 'rco', 'ruo', 'form', 'Name', 'Parent', 'DateBegin', 'DateEnd', 'User_id', 'Storage_id', 'Contractor_id', 'RequestStatus_id', 'User_Name', 'RequestStatus_Name', 'Form_Name'];
    }
    get TableName() {
        return 'Entity';
    }
    get TableDescription() {
        return 'Табличная часть модуля Заявки';
    }
    get TableType() {
        return 'table';
    }
}