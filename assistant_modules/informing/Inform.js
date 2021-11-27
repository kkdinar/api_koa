const DocMovement = require('./DocMovement.js');

module.exports = class Inform extends DocMovement {
    constructor(...args) {
        super(...args);
    }

    get ColumnList() {
        return ['id', 'rct', 'rut', 'rcu', 'ruu', 'rco', 'ruo', 'form', 'Subject', 'Text', 'Description', 'Active', 'NextSendTime', 'Period_id', 'Period_Name', 'WeekDay_id', 'WeekDay_Name', 'Time', 'SendingMethod'];
    }
    get TableName() {
        return 'DocMovement';
    }
    get FormName() {
        return 'Inform';
    }
    get FormDescription() {
        return 'Форма информирования';
    }
    get EntityForm() {
        return 'InformEntity';
    }
}