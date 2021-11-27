const Column = require('./column.js');

module.exports = class BaseTable {
    constructor({
        id = null,
        rct = null,
        rut = null,
        rcu = null,
        ruu = null,
        rco = null,
        ruo = null,
        form = null,
        Name = null,
        Description = null,
        Adress = null,
        Telefon = null,
        DateBegin = null,
        DateEnd = null,
        Category_id = null,
        Category_Name = null,
        Login = null,
        Password = null,
        Parent = null,
        Type = null,
        User_id = null,
        User_Name = null,
        Client_id = null,
        Token = null,
        Contractor_id = null,
        Contractor_Name = null,
        Nomer = null,
        Date = null,
        PartNumber = null,
        Storage_id = null,
        Storage_Name = null,
        Quantity = null,
        Summa = null,
        Form_Name = null,
        RequestStatus_id = null,
        RequestStatus_Name = null,
        StaffJob_id = null,
        StaffJob_Name = null,
        Write = null,
        ModuleName = null,
        DictionaryType = null,
        Size = null,
        DocMovement_id = null,
        Entity_id = null,
        FileStorage_id = null,
        ParentModuleName = null,
        ParentFormName = null,
        ParentForm_id = null,
        Subject = null,
        Text = null,
        Active = null,
        NextSendTime = null,
        Time = null,
        Period_id = null,
        Period_Name = null,
        WeekDay_id = null,
        WeekDay_Name = null,
        InformGroup_id = null,
        InformGroup_Name = null,
        SendingMethod = null,
        Column_Name = null,
        Column_Value = null,
        Operation = null,
        TypeNode = null,
        BTree_id = null,
        Email = null
    } = {}) {
        this.id = id;
        this.rct = rct;
        this.rut = rut;
        this.rcu = rcu;
        this.ruu = ruu;
        this.rco = rco;
        this.ruo = ruo; 
        this.form = form;
        this.Name = Name;
        this.Description = Description;
        this.Adress = Adress;
        this.Telefon = Telefon;
        this.DateBegin = DateBegin;
        this.DateEnd = DateEnd;
        this.Category_id = Category_id;
        this.Category_Name = Category_Name;
        this.Login = Login;
        this.Password = Password;
        this.Parent = Parent;
        this.Type = Type;
        this.User_id = User_id;
        this.User_Name = User_Name;
        this.Client_id = Client_id;
        this.Token = Token;
        this.Contractor_id = Contractor_id;
        this.Contractor_Name = Contractor_Name;
        this.Nomer = Nomer;
        this.Date = Date;
        this.PartNumber = PartNumber;
        this.Storage_id = Storage_id;
        this.Storage_Name = Storage_Name;
        this.Quantity = Quantity;
        this.Summa = Summa;
        this.Form_Name = Form_Name;
        this.RequestStatus_id = RequestStatus_id;
        this.RequestStatus_Name = RequestStatus_Name;
        this.StaffJob_id = StaffJob_id;
        this.StaffJob_Name = StaffJob_Name;
        this.Write = Write;
        this.ModuleName = ModuleName;
        this.DictionaryType = DictionaryType;
        this.Size = Size;
        this.DocMovement_id = DocMovement_id;
        this.Entity_id = Entity_id;
        this.FileStorage_id = FileStorage_id;
        this.ParentModuleName = ParentModuleName;
        this.ParentFormName = ParentFormName;
        this.ParentForm_id = ParentForm_id;
        this.Subject = Subject;
        this.Text = Text;
        this.Active = Active;
        this.NextSendTime = NextSendTime;
        this.Time = Time;
        this.Period_id = Period_id;
        this.Period_Name = Period_Name;
        this.WeekDay_id = WeekDay_id;
        this.WeekDay_Name = WeekDay_Name;
        this.InformGroup_id = InformGroup_id;
        this.InformGroup_Name = InformGroup_Name;
        this.SendingMethod = SendingMethod;
        this.Column_Name = Column_Name;
        this.Column_Value = Column_Value;
        this.Operation = Operation;
        this.TypeNode = TypeNode,
        this.BTree_id = BTree_id,
        this.Email = Email
    }

    get id() {
        return this._id;
    }
    set id(value) {
        this._id = new Column.id({
            Value: value
        });
    }
    get rct() {
        return this._rct;
    }
    set rct(value) {
        this._rct = new Column.rct({
            Value: value,
            Default: 'NOW()'
        });
    }
    get rut() {
        return this._rut;
    }
    set rut(value) {
        this._rut = new Column.rut({
            Value: value,
            Default: 'NOW()'
        });
    }
    get rcu() {
        return this._rcu;
    }
    set rcu(value) {
        this._rcu = new Column.rcu({
            Value: value
        });
    }
    get ruu() {
        return this._ruu;
    }
    set ruu(value) {
        this._ruu = new Column.ruu({
            Value: value
        });
    }
    get rco() {
        return this._rco;
    }
    set rco(value) {
        this._rco = new Column.rco({
            Value: value
        });
    }
    get ruo() {
        return this._ruo;
    }
    set ruo(value) {
        this._ruo = new Column.ruo({
            Value: value
        });
    }
    get form() {
        return this._form;
    }
    set form(value) {
        this._form = new Column.form({
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
    get Description() {
        return this._Description;
    }
    set Description(value) {
        this._Description = new Column.Description({
            Value: value
        });
    }
    get Adress() {
        return this._Adress;
    }
    set Adress(value) {
        this._Adress = new Column.Adress({
            Value: value
        });
    }
    get Telefon() {
        return this._Telefon;
    }
    set Telefon(value) {
        this._Telefon = new Column.Telefon({
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
    get Category_id() {
        return this._Category_id;
    }
    set Category_id(value) {
        this._Category_id = new Column.Category_id({
            Value: value,
            ReferenceModule: "dictionary",
            ReferenceForm: "Category",
            ReferenceColumn: "id"
        });
    }
    get Category_Name() {
        return this._Category_Name;
    }
    set Category_Name(value) {
        this._Category_Name = new Column.Category_Name({
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
    get DictionaryType() {
        return this._DictionaryType;
    }
    set DictionaryType(value) {
        this._DictionaryType = new Column.DictionaryType({
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
    get Client_id() {
        return this._Client_id;
    }
    set Client_id(value) {
        this._Client_id = new Column.Client_id({
            Value: value
        });
    }
    get Contractor_id() {
        return this._Contractor_id;
    }
    set Contractor_id(value) {
        this._Contractor_id = new Column.Contractor_id({
            Value: value,
            ReferenceModule: "dictionary",
            ReferenceTable: "Contractor",
            ReferenceColumn: "id"
        });
    }
    get Contractor_Name() {
        return this._Contractor_Name;
    }
    set Contractor_Name(value) {
        this._Contractor_Name = new Column.Contractor_Name({
            Value: value
        });
    }
    get StaffJob_id() {
        return this._StaffJob_id;
    }
    set StaffJob_id(value) {
        this._StaffJob_id = new Column.StaffJob_id({
            Value: value,
            ReferenceModule: "dictionary",
            ReferenceTable: "StaffJob",
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
    get Size() {
        return this._Size;
    }
    set Size(value) {
        this._Size = new Column.Size({
            Value: value
        });
    }
    get Type() {
        return this._Type;
    }
    set Type(value) {
        this._Type = new Column.Type({
            Value: value
        });
    }
    get Form_Name() {
        return this._Form_Name;
    }
    set Form_Name(value = 0) {
        this._Form_Name = new Column.Form_Name({
            Value: value
        });
    }
    get User_id() {
        return this._User_id;
    }
    set User_id(value) {
        this._User_id = new Column.User_id({
            Value: value,
        });
    }
    get User_Name() {
        return this._User_Name;
    }
    set User_Name(value = 0) {
        this._User_Name = new Column.User_Name({
            Value: value
        });
    }
    get ParentModuleName() {
        return this._ParentModuleName;
    }
    set ParentModuleName(value = 0) {
        this._ParentModuleName = new Column.ParentModuleName({
            Value: value
        });
    }
    get ParentFormName() {
        return this._ParentFormName;
    }
    set ParentFormName(value = 0) {
        this._ParentFormName = new Column.ParentFormName({
            Value: value
        });
    }
    get ParentForm_id() {
        return this._ParentForm_id;
    }
    set ParentForm_id(value = 0) {
        this._ParentForm_id = new Column.ParentForm_id({
            Value: value
        });
    }
    get Subject() {
        return this._Subject;
    }
    set Subject(value) {
        this._Subject = new Column.Subject({
            Value: value
        });
    }
    get Text() {
        return this._Text;
    }
    set Text(value) {
        this._Text = new Column.Text({
            Value: value
        });
    }
    get Active() {
        return this._Active;
    }
    set Active(value) {
        this._Active = new Column.Active({
            Value: value,
        });
    }
    get NextSendTime() {
        return this._NextSendTime;
    }
    set NextSendTime(value) {
        this._NextSendTime = new Column.NextSendTime({
            Value: value
        });
    }
    get Period_id() {
        return this._Period_id;
    }
    set Period_id(value) {
        this._Period_id = new Column.Period_id({
            Value: value
        });
    }
    get Period_Name() {
        return this._Period_Name;
    }
    set Period_Name(value) {
        this._Period_Name = new Column.Period_Name({
            Value: value
        });
    }
    get WeekDay_id() {
        return this._WeekDay_id;
    }
    set WeekDay_id(value) {
        this._WeekDay_id = new Column.WeekDay_id({
            Value: value
        });
    }
    get WeekDay_Name() {
        return this._WeekDay_Name;
    }
    set WeekDay_Name(value = 0) {
        this._WeekDay_Name = new Column.WeekDay_Name({
            Value: value
        });
    }
    get Time() {
        return this._Time;
    }
    set Time(value = 0) {
        this._Time = new Column.Time({
            Value: value
        });
    }
    get SendingMethod() {
        return this._SendingMethod;
    }
    set SendingMethod(value = 0) {
        this._SendingMethod = new Column.SendingMethod({
            Value: value
        });
    }
    get InformGroup_id() {
        return this._InformGroup_id;
    }
    set InformGroup_id(value) {
        this._InformGroup_id = new Column.InformGroup_id({
            Value: value
        });
    }
    get InformGroup_Name() {
        return this._InformGroup_Name;
    }
    set InformGroup_Name(value) {
        this._InformGroup_Name = new Column.InformGroup_Name({
            Value: value
        });
    }
    get FileStorage_id() {
        return this._FileStorage_id;
    }
    set FileStorage_id(value) {
        this._FileStorage_id = new Column.FileStorage_id({
            Value: value
        });
    }
    get Nomer() {
        return this._Nomer;
    }
    set Nomer(value) {
        this._Nomer = new Column.Nomer({
            Value: value
        });
    }
    get Date() {
        return this._Date;
    }
    set Date(value) {
        this._Date = new Column.Date({
            Value: value
        });
    }
    get Storage_id() {
        return this._Storage_id;
    }
    set Storage_id(value) {
        this._Storage_id = new Column.Storage_id({
            Value: value,
            References: ' "dictionary"."Storage" (id)'
        });
    }
    get Storage_Name() {
        return this._Storage_Name;
    }
    set Storage_Name(value = 0) {
        this._Storage_Name = new Column.Storage_Name({
            Value: value
        });
    }
    get RequestStatus_id() {
        return this._RequestStatus_id;
    }
    set RequestStatus_id(value) {
        this._RequestStatus_id = new Column.RequestStatus_id({
            Value: value
        });
    }
    get RequestStatus_Name() {
        return this._RequestStatus_Name;
    }
    set RequestStatus_Name(value) {
        this._RequestStatus_Name = new Column.RequestStatus_Name({
            Value: value
        });
    }
    get Write() {
        return this._Write;
    }
    set Write(value) {
        this._Write = new Column.Write({
            Value: value
        });
    }
    get ModuleName() {
        return this._ModuleName;
    }
    set ModuleName(value) {
        this._ModuleName = new Column.ModuleName({
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
    get DocMovement_id() {
        return this._DocMovement_id;
    }
    set DocMovement_id(value) {
        this._DocMovement_id = new Column.DocMovement_id({
            Value: value
        });
    }
    get Entity_id() {
        return this._Entity_id;
    }
    set Entity_id(value) {
        this._Entity_id = new Column.Entity_id({
            Value: value
        });
    } 
    get Column_Name() {
        return this._Column_Name;
    }
    set Column_Name(value) {
        this._Column_Name = new Column.Column_Name({
            Value: value
        });
    }
    get Column_Value() {
        return this._Column_Value;
    }
    set Column_Value(value) {
        this._Column_Value = new Column.Column_Value({
            Value: value
        });
    } 
    get Operation() {
        return this._Operation;
    }
    set Operation(value) {
        this._Operation = new Column.Operation({
            Value: value
        });
    }

    get TypeNode() {
        return this._TypeNode;
    }
    set TypeNode(value = 0) {
        this._TypeNode = new Column.TypeNode({
            Value: value
        });
    }
    get BTree_id() {
        return this._BTree_id;
    }
    set BTree_id(value) {
        this._BTree_id = new Column.BTree_id({
            Value: value
        });
    }
    get Email() {
        return this._Email;
    }
    set Email(value) {
        this._Email = new Column.Email({
            Value: value
        });
    }
}