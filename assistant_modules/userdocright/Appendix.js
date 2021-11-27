const BaseTable = require('./../basetable.js');

module.exports = class Appendix extends BaseTable {
    constructor(...args) {
        super(...args);
    }

    get ColumnList() {
        return ['id', 'rct', 'rut', 'rcu', 'ruu', 'rco', 'ruo', 'form', 'Parent', 'Name', 'Column_Name', 'Column_Value', 'Operation'];
    }
    get TableName() {
        return 'Appendix';
    }
    get TableDescription() {
        return 'Appendix Табличной части модуля Прав';
    }
    get TableType() {
        return 'table';
    }
}