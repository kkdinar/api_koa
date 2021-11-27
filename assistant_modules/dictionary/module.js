const Forms = require('./forms.js');
const Tables = require('./tables.js');
const pg = require('./../../scripts/pg.js');
const Func = require('./../function.js');

const ModuleName = 'dictionary';
const Description = 'Модуль справочников';
//Для создания новых справочников - добавьте сюда значения
const DictionaryTypeList = {
    'User': 'Справочник пользователей',
    'Storage': 'Справочник складов',
    'Contractor': 'Справочник контрагентов',
    'Material': 'Справочник номенклатуры',
    'Period': 'Справочник периодичности',
    'WeekDay': 'Справочник дней недели',

    'StaffJob': 'Справочник должностей',
    'RequestStatus': 'Справочник статусов заявок',
    'Category': 'Справочник категорий'
};
const DictionaryFormNameList = {
    'User': 'UserReestr',
    'Storage': 'StorageReestr',
    'Contractor': 'ContractorReestr',
    'Material': 'MaterialReestr',
    'Period': 'PeriodReestr',
    'WeekDay':'WeekDayReestr',

    'StaffJob': 'DictionaryForm',
    'RequestStatus': 'DictionaryForm',
    'Category': 'DictionaryForm'
};

function getFormList() {
    let formList = Object.keys(Forms);
    //Дополняем простыми справочниками
    const dicTypeList = Object.keys(DictionaryTypeList);
    dicTypeList.forEach(row => formList.push(row));
    return formList;
};

async function getFormsReestr() {
    const Form = new Forms.DictionaryForm({
        id: 1
    });
    let response = await pg.findAll({
        Schema: ModuleName,
        TableName: Form.TableName,
        ColumnList: Form.ColumnList
    });

    response.forEach((row) => {
        row.form = DictionaryFormNameList[row.DictionaryType];
        row.DisplayForm = true;
        row.FormName = DictionaryFormNameList[row.DictionaryType];
    });
    //console.log('response=',response);

    /*
    const formList = getFormList();
    //console.log('formList=',formList);

    let response = [];
    let id = 1;
    //Собираем информацию о справочниках модуля
    formList.forEach((formName) => {
        const Form = new Forms[formName]({
            id: 1
        });
        //console.log('Form=',Form);
        //console.log('Form.Name.Value=', formName, Form.FormDescription);
        
            const obj = {
                id: id,
                Name: '(' + formName + ')' + Form.FormDescription,
                form: formName
            };
            response.push(obj);
            id = id + 1;        
    });
    //console.log('dictionary.getFormsReestr.response=',response);

    return response;
    */
    return response;
};

async function getDocReestr(form) {
    //console.log('form=',form);
    let response = [];

    //Список типов справочников
    const dicTypeList = Object.keys(DictionaryTypeList);
    if (dicTypeList.some(r => r == form)) { //Прислали тип справочника, а не форму - ищем содержимое справочника
        const DictionaryForm = new Forms.DictionaryForm({
            id: 1
        });
        const docMovementRows = await pg.findAll({
            Schema: ModuleName,
            TableName: DictionaryForm.TableName,
            ColumnList: DictionaryForm.ColumnList
        });
        //console.log('docMovementRows=',docMovementRows);
        const ParentForm = docMovementRows.find(r => r.DictionaryType == form);

        //Само содержимое Справочника содержится в Entity
        const DictionaryEntity = new Forms.DictionaryEntity({
            id: 1
        });
        const entityRows = await pg.findAll({
            Schema: ModuleName,
            TableName: DictionaryEntity.TableName,
            ColumnList: DictionaryEntity.ColumnList
        });
        //console.log('entityRows=',entityRows);

        response = entityRows.filter(r => r.Parent == ParentForm.id);
    } else {
        const Form = new Forms[form]({
            id: 1
        });

        const list = await pg.findAll({
            Schema: ModuleName,
            TableName: Form.TableName,
            ColumnList: Form.ColumnList
        });
        //console.log('list=',list);
        //Переопределяем названия FormName
        response = list.map((row) => {
            row.FormName = DictionaryFormNameList[row.DictionaryType] ? DictionaryFormNameList[row.DictionaryType] : row.FormName;
            return row;
        });
    };
    //console.log('dictionary.getDocReestr.response=',response);

    return response;
}

async function getDoc(formName, id) {
    //console.log('formName=', formName);
    return await Func.getDoc({
        moduleName: ModuleName,
        Forms,
        formName,
        id
    });
    /*
    let DocMovement = {};
    let Entity = [];
    let rows = [];

    let Form = new Forms[form]({
        id: 1
    });
    rows = await pg.findByID({
        Schema: ModuleName,
        TableName: Form.TableName,
        ColumnList: Form.ColumnList,
        id
    });
    const docMovement = new Forms[form](rows);
    Form.ColumnList.forEach((key) => {
        DocMovement[key] = docMovement[key].Value;
    });
    //console.log('DocMovement=', DocMovement);

    const EntityForm = docMovement.EntityForm;
    //console.log('EntityForm=',EntityForm);
    if (EntityForm) {
        Form = new Forms[EntityForm]({
            id: 1
        });
        rows = await pg.findAll({
            Schema: ModuleName,
            TableName: Form.TableName,
            ColumnList: Form.ColumnList
        });
        //console.log('rows=',rows);
        rows = rows.filter(row => row.Parent == id);
        rows.forEach((row) => {
            const entity = new Forms[EntityForm](row);
            let _Entity = {};
            Form.ColumnList.forEach((key) => {
                _Entity[key] = entity[key].Value;
            });
            Entity.push(_Entity);
        });
    };
    return {
        DocMovement,
        Entity
    };*/
};

function getTableList() {
    return Object.keys(Tables);
};

async function setDoc(formName, data, UserInfo) {
    return await Func.setDoc({
        moduleName: ModuleName,
        Forms,
        formName,
        data,
        UserInfo
    })
    /*
    let response = {};
    let DocMovement = {};
    let Entity = {};

    if (!form) return response.Error = 'have not form';

    //console.log('form=',form);
    const Form = new Forms[form]({
        id: 1
    });
    if (!data) {
        let docMovement = new Forms[form]({
            id: 1
        });
        const id = await pg.getNextID({
            Schema: ModuleName,
            TableName: docMovement.TableName
        });
        docMovement = new Forms[form]({
            id
        });
        const Content = {
            Schema: ModuleName,
            TableName: docMovement.TableName,
            Form: docMovement
        };
        //console.log('docMovement=', docMovement);
        DocMovement = await pg.insertRow(Content);
    } else {
        if (data.DocMovement) {
            if (!data.DocMovement.id) {
                let docMovement = new Forms[form]({
                    id: 1
                });
                const id = await pg.getNextID({
                    Schema: ModuleName,
                    TableName: docMovement.TableName
                });
                data.DocMovement.id = id;
                docMovement = new Forms[form](data.DocMovement);
                const Content = {
                    Schema: ModuleName,
                    TableName: docMovement.TableName,
                    Form: docMovement
                };
                //console.log('docMovement=', docMovement);
                DocMovement = await pg.insertRow(Content);
            } else {
                const docMovement = new Forms[form](data.DocMovement);
                const Content = {
                    Schema: ModuleName,
                    TableName: docMovement.TableName,
                    ColumnList: docMovement
                };
                //console.log('Content=',Content);
                DocMovement = await pg.updateRow(Content);
            };
        };
        if (data.Entity) {
            const EntityForm = Form.EntityForm;
            for await (const row of data.Entity) {
                row.Parent = DocMovement.id ? DocMovement.id : row.Parent;
                if (!row.Parent) return response.Error = 'have not Entity.Parent';

                if (!row.id) {
                    let entity = new Forms[EntityForm]({
                        id: 1
                    });
                    const id = await pg.getNextID({
                        Schema: ModuleName,
                        TableName: entity.TableName
                    });
                    row.id = id;
                    entity = new Forms[EntityForm](row);
                    const Content = {
                        Schema: ModuleName,
                        TableName: entity.TableName,
                        Form: entity
                    };
                    Entity = await pg.insertRow(Content);
                } else {
                    const entity = new Forms[EntityForm](row);
                    const Content = {
                        Schema: ModuleName,
                        TableName: entity.TableName,
                        ColumnList: entity
                    };
                    Entity = await pg.updateRow(Content);
                };
            };
        };
    };
    response = {
        DocMovement,
        Entity
    };
    return response;
    */
};

async function deleteDoc(formName, data) {
     return await Func.deleteDoc({
        moduleName: ModuleName,
        Forms,
        formName,
        data
    });
    /*
    let response = {};
    if (!form) return response.Error = 'have not form';

    const docMovement = new Forms[form]({
        id: 1
    });
    const EntityForm = docMovement.EntityForm;

    if (data.DocMovement) {
        if (EntityForm) { //Если у модуля есть Entity, сначала удаляем строки оттуда    
            const entity = new Forms[EntityForm]({
                id: 1
            });
            const entityRows = await pg.findAll({
                Schema: ModuleName,
                TableName: entity.TableName,
                ColumnList: entity.ColumnList
            });
            if (entityRows) {
                let entityRowsToDelete = [];
                data.DocMovement.forEach((row) => {
                    entityRows.forEach((r) => {
                        if (r.Parent == row.id) entityRowsToDelete.push(r);
                    });
                });
                //console.log('entityRowsToDelete=',entityRowsToDelete);
                const Content = {
                    Schema: ModuleName,
                    TableName: entity.TableName,
                    ColumnList: entityRowsToDelete
                };
                //console.log('Content=', Content);
                await pg.deleteRow(Content);
            };
        };
        const Content = {
            Schema: ModuleName,
            TableName: docMovement.TableName,
            ColumnList: data.DocMovement
        };
        response = await pg.deleteRow(Content);
    };
    if (data.Entity) {
        const entity = new Forms[EntityForm]({
            id: 1
        });
        const Content = {
            Schema: ModuleName,
            TableName: entity.TableName,
            ColumnList: data.Entity
        };
        response = await pg.deleteRow(Content);
    };
    return response;*/
};

module.exports = {
    ModuleName,
    Description,
    DictionaryTypeList,
    getFormList, //Получить список форм модуля в виде массива 
    getFormsReestr, //Получить id, Name, form форм в виде массива 
    getDocReestr, //Получить реестр данных из таблицы по form
    getDoc, //Получить документ по id и form в виде DocMovement, Entity
    getTableList,
    setDoc,
    deleteDoc,
    Forms
};