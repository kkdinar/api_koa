const RequestReestrView = require('./RequestReestrView.js');

module.exports = class RequestReestr extends RequestReestrView {
    constructor(...args) {
        super(...args);
    }

    get ColumnList() {
        return ['id', 'Name', 'Nomer', 'Date', 'Description', 'RequestStatus_id', 'RequestStatus_Name', 'Contractor_id'];
    }
    get TableName() {
        return 'RequestReestrView';
    }
    get FormName() {
        return 'RequestReestr';
    }
    get FormDescription() {
        return 'Заявки';
    }
    //Отображать форму в меню
    get DisplayForm() {
        return true;
    }
    //Это Реестр для формы
    get ReestrForForm(){
        return 'Request';
    }
}