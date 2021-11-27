const Column = require('./../column.js');
const BaseTable = require('./../basetable.js');

module.exports = class Appendix extends BaseTable {
    constructor(...args) {
        super(...args);
    }

    get ColumnList() {
        return ['id', 'rct', 'rut', 'rcu', 'ruu', 'rco', 'ruo', 'form', 'Parent', 'FileStorage_id'];
    }
    get TableName() {
        return 'Appendix';
    }
    get TableDescription() {
        return 'Appendix Табличной части модуля Заявки';
    }
    get TableType() {
        return 'table';
    }
    get FormName() {
        return 'Appendix';
    }
    get FormDescription() {
        return 'Appendix Табличной части модуля Заявки';
    }
}