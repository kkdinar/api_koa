const Column = require('./../column.js');
const Contractor = require('./Contractor.js');

module.exports = class ContractorReestr extends Contractor {
    constructor(...args) {
        super(...args);
    }
    get ColumnList() {
        return ['id', 'Name', 'Description'];
    }
    get TableName() {
        return 'Contractor';
    }
    get FormName() {
        return 'ContractorReestr';
    }
    get FormDescription() {
        return 'Реестр Справочника контрагентов';
    }
    //Отображать форму в меню
    get DisplayForm() {
        return true;
    }
    //Это Реестр для формы
    get ReestrForForm(){
        return 'ContractorForm';
    }
}