const id = class {
    constructor({
        Value = null
    } = {}) {
        this.Value = Value;
    }

    get ColumnName() {
        return 'id'
    }
    get DataType() {
        return 'Bigint';
    }
    get AllowNull() {
        return 'false';
    }
    get Unique() {
        return 'true';
    }
    get Default() {
        return 'No Default';
    }
    get References() {
        return 'No References';
    }
    get Value() {
        return this._Value;
    }
    set Value(value = 0) {
        if (value <= 0) throw new Error("Ошибка: id <= 0");
        this._Value = value;
    }
};

//Базовые свойства поля
class Column {
    constructor({
        Value = null,
        AllowNull = true,
        Unique = false,
        Default = '',
        References = '',
        ReferenceModule = '',
        ReferenceForm = '',
        ReferenceColumn = '',
        DictionaryType = ''
    } = {}) {
        if ((Unique == true) && (Default != '')) throw new Error("Ошибка: Default - Unique Поля взаимоисключающие");
        this.Value = Value;
        this.AllowNull = AllowNull;
        this.Unique = Unique;
        this.Default = Default;
        this.References = References;
        this.ReferenceModule = ReferenceModule;
        this.ReferenceForm = ReferenceForm;
        this.ReferenceColumn = ReferenceColumn;
        this.DictionaryType = DictionaryType;
    }
    get AllowNull() {
        return this._AllowNull;
    }
    set AllowNull(value = 'true') {
        this._AllowNull = value;
    }
    get Unique() {
        return this._Unique;
    }
    set Unique(value) {
        this._Unique = value;
    }
    get Default() {
        return this._Default;
    }
    set Default(value) {
        this._Default = value;
    }
    get References() {
        return this._References;
    }
    set References(value = '') {
        this._References = value;
    }
    get Value() {
        return this._Value;
    }
    set Value(value = '') {
        this._Value = value;
    }
    get ReferenceModule() {
        return this._ReferenceModule;
    }
    set ReferenceModule(value = '') {
        this._ReferenceModule = value;
    }
    get ReferenceForm() {
        return this._ReferenceForm;
    }
    set ReferenceForm(value = '') {
        this._ReferenceForm = value;
    }
    get ReferenceColumn() {
        return this._ReferenceColumn;
    }
    set ReferenceColumn(value = '') { 
        this._ReferenceColumn = value;
    }
    get DictionaryType() {
        return this._DictionaryType;
    }
    set DictionaryType(value = '') {
        this._DictionaryType = value;
    }
};

const Name = class extends Column {
    constructor(...args) {
        super(...args);
    }
    get ColumnName() {
        return 'Name';
    }
    get DataType() {
        return 'Text';
    }
};

const Description = class extends Column {
    constructor(...args) {
        super(...args);
    }
    get ColumnName() {
        return 'Description';
    }
    get DataType() {
        return 'Text';
    }
};

const Login = class extends Column {
    constructor(...args) {
        super(...args);
    }
    get ColumnName() {
        return 'Login';
    }
    get DataType() {
        return 'Text';
    }
};

const Password = class extends Column {
    constructor(...args) {
        super(...args);
    }
    get ColumnName() {
        return 'Password';
    }
    get DataType() {
        return 'Text';
    }
};

const DateBegin = class extends Column {
    constructor(...args) {
        super(...args);
    }
    get ColumnName() {
        return 'DateBegin';
    }
    get DataType() {
        return 'Timestamp ';
    }
};

const DateEnd = class extends Column {
    constructor(...args) {
        super(...args);
    }
    get ColumnName() {
        return 'DateEnd';
    }
    get DataType() {
        return 'Timestamp ';
    }
};

const Type = class extends Column {
    constructor(...args) {
        super(...args);
    }
    get ColumnName() {
        return 'Type';
    }
    get DataType() {
        return 'Text ';
    }
};

const Parent = class extends Column {
    constructor(...args) {
        super(...args);
    }
    get ColumnName() {
        return 'Parent';
    }
    get DataType() {
        return 'Bigint ';
    }
};

const User_id = class extends Column {
    constructor(...args) {
        super(...args);
    }
    get ColumnName() {
        return 'User_id';
    }
    get DataType() {
        return 'Bigint ';
    }
};

const User_Name = class extends Column {
    constructor(...args) {
        super(...args);
    }
    get ColumnName() {
        return 'User_Name';
    }
    get DataType() {
        return 'Text ';
    }
};

const Client_id = class extends Column {
    constructor(...args) {
        super(...args);
    }
    get ColumnName() {
        return 'Client_id';
    }
    get DataType() {
        return 'Bigint ';
    }
};

const Token = class extends Column {
    constructor(...args) {
        super(...args);
    }
    get ColumnName() {
        return 'Token';
    }
    get DataType() {
        return 'Text ';
    }
};

const Contractor_id = class extends Column {
    constructor(...args) {
        super(...args);
    }
    get ColumnName() {
        return 'Contractor_id';
    }
    get DataType() {
        return 'Bigint ';
    }
};

const Adress = class extends Column {
    constructor(...args) {
        super(...args);
    }
    get ColumnName() {
        return 'Adress';
    }
    get DataType() {
        return 'Text ';
    }
};

const Telefon = class extends Column {
    constructor(...args) {
        super(...args);
    }
    get ColumnName() {
        return 'Telefon';
    }
    get DataType() {
        return 'Text ';
    }
};

const Nomer = class extends Column {
    constructor(...args) {
        super(...args);
    }
    get ColumnName() {
        return 'Nomer';
    }
    get DataType() {
        return 'Text ';
    }
};

const Date = class extends Column {
    constructor(...args) {
        super(...args);
    }
    get ColumnName() {
        return 'Date';
    }
    get DataType() {
        return 'Timestamp ';
    }
};

const PartNumber = class extends Column {
    constructor(...args) {
        super(...args);
    }
    get ColumnName() {
        return 'PartNumber';
    }
    get DataType() {
        return 'Bigint ';
    }
};

const Storage_id = class extends Column {
    constructor(...args) {
        super(...args);
    }
    get ColumnName() {
        return 'Storage_id';
    }
    get DataType() {
        return 'Bigint ';
    }
};

const Quantity = class extends Column {
    constructor(...args) {
        super(...args);
    }
    get ColumnName() {
        return 'Quantity';
    }
    get DataType() {
        return 'numeric';
    }
};

const Summa = class extends Column {
    constructor(...args) {
        super(...args);
    }
    get ColumnName() {
        return 'Summa';
    }
    get DataType() {
        return 'money';
    }
};

const Form_Name = class extends Column {
    constructor(...args) {
        super(...args);
    }
    get ColumnName() {
        return 'Form_Name';
    }
    get DataType() {
        return 'Text';
    }
};

const RequestStatus_id = class extends Column {
    constructor(...args) {
        super(...args);
    }
    get ColumnName() {
        return 'RequestStatus_id';
    }
    get DataType() {
        return 'Bigint ';
    }
};

const StaffJob_id = class extends Column {
    constructor(...args) {
        super(...args);
    }
    get ColumnName() {
        return 'StaffJob_id';
    }
    get DataType() {
        return 'Bigint';
    }
};

const StaffJob_Name = class extends Column {
    constructor(...args) {
        super(...args);
    }
    get ColumnName() {
        return 'StaffJob_Name';
    }
    get DataType() {
        return 'Text ';
    }
};

const Write = class extends Column {
    constructor(...args) {
        super(...args);
    }
    get ColumnName() {
        return 'Write';
    }
    get DataType() {
        return 'Boolean';
    }
};

const Category_id = class extends Column {
    constructor(...args) {
        super(...args);
    }
    get ColumnName() {
        return 'Category_id';
    }
    get DataType() {
        return 'Bigint ';
    }
};

const Category_Name = class extends Column {
    constructor(...args) {
        super(...args);
    }
    get ColumnName() {
        return 'Category_Name';
    }
    get DataType() {
        return 'Text';
    }
};

const ModuleName = class extends Column {
    constructor(...args) {
        super(...args);
    }
    get ColumnName() {
        return 'ModuleName';
    }
    get DataType() {
        return 'Text';
    }
};

const Contractor_Name = class extends Column {
    constructor(...args) {
        super(...args);
    }
    get ColumnName() {
        return 'Contractor_Name';
    }
    get DataType() {
        return 'Text';
    }
};

const Storage_Name = class extends Column {
    constructor(...args) {
        super(...args);
    }
    get ColumnName() {
        return 'Storage_Name';
    }
    get DataType() {
        return 'Text';
    }
};

const RequestStatus_Name = class extends Column {
    constructor(...args) {
        super(...args);
    }
    get ColumnName() {
        return 'RequestStatus_Name';
    }
    get DataType() {
        return 'Text';
    }
};

const DictionaryType = class extends Column {
    constructor(...args) {
        super(...args);
    }
    get ColumnName() {
        return 'DictionaryType';
    }
    get DataType() {
        return 'Text';
    }
};

const Size = class extends Column {
    constructor(...args) {
        super(...args);
    }
    get ColumnName() {
        return 'Size';
    }
    get DataType() {
        return 'Real';
    }
};

const DocMovement_id = class extends Column {
    constructor(...args) {
        super(...args);
    }
    get ColumnName() {
        return 'DocMovement_id';
    }
    get DataType() {
        return 'Bigint ';
    }
};

const Entity_id = class extends Column {
    constructor(...args) {
        super(...args);
    }
    get ColumnName() {
        return 'Entity_id';
    }
    get DataType() {
        return 'Bigint ';
    }
};

const FileStorage_id = class extends Column {
    constructor(...args) {
        super(...args);
    }
    get ColumnName() {
        return 'FileStorage_id';
    }
    get DataType() {
        return 'Bigint ';
    }
};

const ParentModuleName = class extends Column {
    constructor(...args) {
        super(...args);
    }
    get ColumnName() {
        return 'ParentModuleName';
    }
    get DataType() {
        return 'Text';
    }
};

const ParentFormName = class extends Column {
    constructor(...args) {
        super(...args);
    }
    get ColumnName() {
        return 'ParentFormName';
    }
    get DataType() {
        return 'Text';
    }
};

const ParentForm_id = class extends Column {
    constructor(...args) {
        super(...args);
    }
    get ColumnName() {
        return 'ParentForm_id';
    }
    get DataType() {
        return 'Bigint ';
    }
};

const Subject = class extends Column {
    constructor(...args) {
        super(...args);
    }
    get ColumnName() {
        return 'Subject';
    }
    get DataType() {
        return 'Text';
    }
};

const Text = class extends Column {
    constructor(...args) {
        super(...args);
    }
    get ColumnName() {
        return 'Text';
    }
    get DataType() {
        return 'Text';
    }
};

const Active = class extends Column {
    constructor(...args) {
        super(...args);
    }
    get ColumnName() {
        return 'Active';
    }
    get DataType() {
        return 'Boolean';
    }
};

const NextSendTime = class extends Column {
    constructor(...args) {
        super(...args);
    }
    get ColumnName() {
        return 'NextSendTime';
    }
    get DataType() {
        return 'Timestamp ';
    }
};

const Time = class extends Column {
    constructor(...args) {
        super(...args);
    }
    get ColumnName() {
        return 'Time';
    }
    get DataType() {
        return 'Timestamp ';
    }
};

const Period_id = class extends Column {
    constructor(...args) {
        super(...args);
    }
    get ColumnName() {
        return 'Period_id';
    }
    get DataType() {
        return 'Bigint ';
    }
};

const Period_Name = class extends Column {
    constructor(...args) {
        super(...args);
    }
    get ColumnName() {
        return 'Period_Name';
    }
    get DataType() {
        return 'Text';
    }
};

const WeekDay_id = class extends Column {
    constructor(...args) {
        super(...args);
    }
    get ColumnName() {
        return 'WeekDay_id';
    }
    get DataType() {
        return 'Bigint ';
    }
};

const WeekDay_Name = class extends Column {
    constructor(...args) {
        super(...args);
    }
    get ColumnName() {
        return 'WeekDay_Name';
    }
    get DataType() {
        return 'Text';
    }
};

const InformGroup_id = class extends Column {
    constructor(...args) {
        super(...args);
    }
    get ColumnName() {
        return 'InformGroup_id';
    }
    get DataType() {
        return 'Bigint ';
    }
};

const InformGroup_Name = class extends Column {
    constructor(...args) {
        super(...args);
    }
    get ColumnName() {
        return 'InformGroup_Name';
    }
    get DataType() {
        return 'Text';
    }
};

const SendingMethod = class extends Column {
    constructor(...args) {
        super(...args);
    }
    get ColumnName() {
        return 'SendingMethod';
    }
    get DataType() {
        return 'Text ';
    }
};

const rct = class extends Column {
    constructor(...args) {
        super(...args);
    }
    get ColumnName() {
        return 'rct';
    }
    get DataType() {
        return 'Timestamp ';
    }
};

const rut = class extends Column {
    constructor(...args) {
        super(...args);
    }
    get ColumnName() {
        return 'rut';
    }
    get DataType() {
        return 'Timestamp';
    }
};

const rcu = class extends Column {
    constructor(...args) {
        super(...args);
    }
    get ColumnName() {
        return 'rcu';
    }
    get DataType() {
        return 'Text ';
    }
};

const ruu = class extends Column {
    constructor(...args) {
        super(...args);
    }
    get ColumnName() {
        return 'ruu';
    }
    get DataType() {
        return 'Text ';
    }
};

const rco = class extends Column {
    constructor(...args) {
        super(...args);
    }
    get ColumnName() {
        return 'rco';
    }
    get DataType() {
        return 'Text ';
    }
};

const ruo = class extends Column {
    constructor(...args) {
        super(...args);
    }
    get ColumnName() {
        return 'ruo';
    }
    get DataType() {
        return 'Text';
    }
};

const form = class extends Column {
    constructor(...args) {
        super(...args);
    }
    get ColumnName() {
        return 'form';
    }
    get DataType() {
        return 'Text';
    }
};

const Column_Name = class extends Column {
    constructor(...args) {
        super(...args);
    }
    get ColumnName() {
        return 'Column_Name';
    }
    get DataType() {
        return 'Text';
    }
};

const Column_Value = class extends Column {
    constructor(...args) {
        super(...args);
    }
    get ColumnName() {
        return 'Column_Value';
    }
    get DataType() {
        return 'Text';
    }
}; 

const Operation = class extends Column {
    constructor(...args) {
        super(...args);
    }
    get ColumnName() {
        return 'Operation';
    }
    get DataType() {
        return 'Text';
    }
};

const TypeNode = class extends Column {
    constructor(...args) {
        super(...args);
    }
    get ColumnName() {
        return 'TypeNode';
    }
    get DataType() {
        return 'int';
    }
};
const BTree_id = class extends Column {
    constructor(...args) {
        super(...args);
    }
    get ColumnName() {
        return 'BTree_id';
    }
    get DataType() {
        return 'Bigint';
    }
};

const Email = class extends Column {
    constructor(...args) {
        super(...args);
    }
    get ColumnName() {
        return 'Email';
    }
    get DataType() {
        return 'Text';
    }
};

module.exports = {
    id,
    Name,
    Description,
    Login,
    Password,
    DateBegin,
    DateEnd,
    Parent,
    Type,
    User_id,
    User_Name,
    Client_id,
    Token,
    Contractor_id,
    Adress,
    Telefon,
    Nomer,
    Date,
    PartNumber,
    Storage_id,
    Quantity,
    Summa,
    Form_Name,
    RequestStatus_id,
    StaffJob_id,
    StaffJob_Name,
    Write,
    Category_id,
    Category_Name,
    ModuleName,
    Contractor_Name,
    Storage_Name,
    RequestStatus_Name,
    DictionaryType,
    Size,
    DocMovement_id,
    Entity_id,
    FileStorage_id,
    ParentModuleName,
    ParentFormName,
    ParentForm_id,
    Subject,
    Text,
    Active,
    NextSendTime,    
    Time,
    Period_id,
    Period_Name,
    WeekDay_id,
    WeekDay_Name,
    InformGroup_id,
    InformGroup_Name,
    SendingMethod,
    rct,//row create time
    rut,//row update time
    rcu,//row create user
    ruu,//row update user
    rco,//row create organization
    ruo,//row update organization
    form,
    Column_Name,
    Column_Value,
    Operation,
    TypeNode,
    BTree_id,
    Email
};