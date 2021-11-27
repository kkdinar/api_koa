const Column = require('./../column.js');
const Material = require('./Material.js');

module.exports = class MaterialForm extends Material {
    constructor(...args) {
        super(...args);
    }
    get ColumnList() {
        return ['id', 'rct', 'rut', 'rcu', 'ruu', 'rco', 'ruo', 'form', 'Name', 'Description', 'Client_id', 'Contractor_id'];
    }
    get TableName() {
        return 'Material';
    }
    get FormName() {
        return 'MaterialForm';
    }
    get FormDescription() {
        return 'Табличная часть Справочника номенклатуры';
    }
}