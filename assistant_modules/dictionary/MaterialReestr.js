const Column = require('./../column.js');
const Material = require('./Material.js');

module.exports = class MaterialReestr extends Material {
    constructor(...args) {
        super(...args);
    }
    get ColumnList() {
        return ['id', 'Name', 'Description'];
    }
    get TableName() {
        return 'Material';
    }
    get FormName() {
        return 'MaterialReestr';
    }
    get FormDescription() {
        return 'Реестр Справочника номенклатуры';
    }
    //Отображать форму в меню
    get DisplayForm() {
        return true;
    }
    //Это Реестр для формы
    get ReestrForForm(){
        return 'MaterialForm';
    }
}