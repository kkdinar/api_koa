const Column = require('./../column.js');

module.exports = class Entity {
    constructor({
        id = null,
        Name = null,
        Token = null,
        Parent = null,
        DateBegin = null,
        DateEnd = null,
        User_id = null,
        Client_id = null
    } = {}) {
        this.id = id;
        this.Name = Name;
        this.Token = Token;
        this.Parent = Parent;
        this.DateBegin = DateBegin;
        this.DateEnd = DateEnd;
        this.User_id = User_id;
        this.Client_id = Client_id;
    }

    get ColumnList() {
        return ['id', 'Name', 'Token', 'Parent', 'DateBegin', 'DateEnd', 'User_id', 'Client_id'];
    }
    get TableName() {
        return 'Entity';
    }
    get FormDescription() {
        return 'Сессии пользователей';
    }
    get TableDescription() {
        return 'Табличная часть модуля Сессии';
    }
    get TableType(){
        return 'table';
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
            Value: value
        });
    }
    get Token() {
        return this._Token;
    }
    set Token(value) {
        this._Token = new Column.Token({
            Value: value
        });
    }
    get Parent() {
        return this._Parent;
    }
    set Parent(value) {
        this._Parent = new Column.Parent({
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
    get User_id() {
        return this._User_id;
    }
    set User_id(value) {
        this._User_id = new Column.User_id({
            Value: value,
            References: ' "dictionary"."User" (id)'
        });
    }
    get Client_id() {
        return this._Client_id;
    }
    set Client_id(value) {
        this._Client_id = new Column.Client_id({
            Value: value,
            References: ' "dictionary"."Client" ("id")'
        });
    }
}