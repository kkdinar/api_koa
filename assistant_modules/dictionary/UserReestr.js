const Column = require('./../column.js');
const User = require('./User.js');

module.exports = class UserReestr extends User {
    constructor(...args) {
        super(...args);
    }

    get ColumnList() {
        return ['id', 'Name', 'Description'];
    }
    get TableName() {
        //super.TableName();
        return 'User';
    }
    //get EntityForm() {
    //    return 'UserEntity';
    //}
    //get ChildForms() {
    //  return ['UserEntity'];
    //}
    get FormName() {
        return 'UserReestr';
    }
    get FormDescription() {
        return 'Реестр Справочника сотрудников';
    }
    //Отображать форму в меню
    get DisplayForm() {
        return true;
    }
    //Это Реестр для формы
    get ReestrForForm(){
        return 'UserForm';
    }
}
/*
module.exports = class UserForm {
    constructor({
        id = null,
        Name = null,
        Description = null
    } = {}) {
        this.id = id;
        this.Name = Name;
        this.Description = Description;
        this.FormName = 'Request';
    }

    get ColumnList() {
        return ['id', 'Name', 'Description'];
    }
    get TableName() {
        return 'User';
    }
    get EntityForm() {
        return 'UserEntity';
    }
    //get ChildForms() {
    //  return ['UserEntity'];
    //}
    get FormDescription() {
        return 'Форма справочника сотрудников';
    }
    //Отображать форму в меню
    get DisplayForm(){
        return true;
    }
    //Поля формы
    get id() {
        return this._id;
    }
    set id(value = 0) {
        this._id = new Column.id({
            Value: value
        });
    }
    get Name() {
        return this._Name;
    }
    set Name(value) {
        this._Name = new Column.Name({
            Value: 'Справочник сотрудников',
            AllowNull: 'false'
        });
    }
    get Description() {
        return this._Description;
    }
    set Description(value) {
        this._Description = new Column.Description({
            Value: value
        });
    }
}
*/
/*
module.exports = class User {
    constructor({
        id = null,
        Name = null,
        Description = null,
        Login = null,
        Password = null,
        DateBegin = null,
        DateEnd = null,
        StaffJob_id = null,
        StaffJob_Name = null
    } = {}) {
        this.id = id;
        this.Name = Name;
        this.Description = Description;
        this.Login = Login;
        this.Password = Password;
        this.DateBegin = DateBegin;
        this.DateEnd = DateEnd;
        this.StaffJob_id = StaffJob_id;
        this.StaffJob_Name = StaffJob_Name;
    }

    get ColumnList() {
        return ['id', 'Name', 'Description', 'Login', 'Password', 'DateBegin', 'DateEnd', 'StaffJob_id', 'StaffJob_Name'];
    }
    get TableName() {
        return 'User';
    }
    get FormDescription() {
        return 'Справочник сотрудников';
    }

    get id() {
        return this._id;
    }
    set id(value = 0) {
        this._id = new Column.id({
            Value: value
        });
    }

    get Name() {
        return this._Name;
    }
    set Name(value) {
        this._Name = new Column.Name({
            Value: value,
            AllowNull: 'false'
        });
    }
    get Description() {
        return this._Description;
    }
    set Description(value) {
        this._Description = new Column.Description({
            Value: value
        });
    }
    get Login() {
        return this._Login;
    }
    set Login(value) {
        this._Login = new Column.Login({
            Value: value
        });
    }
    get Password() {
        return this._Password;
    }
    set Password(value) {
        this._Password = new Column.Password({
            Value: value
        });
    }
    get DateBegin() {
        return this._DateBegin;
    }
    set DateBegin(value) {
        this._DateBegin = new Column.DateBegin({
            Value: value,
            Default: 'NOW()'
        });
    }
    get DateEnd() {
        return this._DateEnd;
    }
    set DateEnd(value) {
        this._DateEnd = new Column.DateEnd({
            Value: value
        });
    }
    get StaffJob_id() {
        return this._StaffJob_id;
    }
    set StaffJob_id(value) {
        this._StaffJob_id = new Column.StaffJob_id({
            Value: value,
            References: ' "dictionary"."StaffJob" ("id")',
            ReferenceModule: "dictionary",
            ReferenceForm: "StaffJob",
            ReferenceColumn: "id"
        });
    }
    get StaffJob_Name() {
        return this._StaffJob_Name;
    }
    set StaffJob_Name(value) {
        this._StaffJob_Name = new Column.StaffJob_Name({
            Value: value
        });
    }

*/