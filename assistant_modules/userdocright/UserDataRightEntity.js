const Appendix = require('./Appendix.js');

module.exports = class UserDataRightEntity extends Appendix {
    constructor(...args) {
        super(...args);
    }

    get ColumnList() {
        return ['id', 'rct', 'rut', 'rcu', 'ruu', 'rco', 'ruo', 'form', 'Name', 'Parent', 'Column_Name', 'Column_Value', 'Operation'];
    }
    get TableName() {
        return 'Appendix';
    }
    get FormName() {
        return 'UserDataRightEntity';
    }
    get FormDescription() {
        return 'Табличная часть формы изменения прав пользователя на данные';
    }
}