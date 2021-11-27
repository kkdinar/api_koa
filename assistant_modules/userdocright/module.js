const Forms = require('./forms.js');
const Tables = require('./tables.js');
const pg = require('./../../scripts/pg.js');
const Func = require('./../function.js');

const ModuleName = 'userdocright';
const Description = 'Модуль администрирования доступа пользователей к документам';

function getFormList() {
    return Object.keys(Forms);
};

async function getFormsReestr() {
    const formList = getFormList();

    return Func.getFormsReestr({
        Forms,
        formList
    });

    /* let list = [];
     let id = 1;
     //Собираем информацию о справочниках модуля
     formList.forEach((formName) => {
         const Form = new Forms[formName]({
             id: 1
         });
         //console.log('Form=',Form);
         const obj = {
             id: id,
             Name: Form.FormDescription,
             form: formName,
             DisplayForm: Form.DisplayForm //Отображать форму в меню
         };
         list.push(obj);
         id = id + 1;
     });

     return list;*/
};

async function getDocReestr(formName) {
    return await Func.getDocReestr({
        moduleName: ModuleName,
        Forms,
        formName
    });
    /*const Form = new Forms[form]({
        id: 1
    });
    const response = await pg.findAll({
        Schema: ModuleName,
        TableName: Form.TableName,
        ColumnList: Form.ColumnList
    });

    return response;*/
}

async function getDoc(formName, id) {
    return await Func.getDoc({
        moduleName: ModuleName,
        Forms,
        formName,
        id
    });
    /*let DocMovement = {};
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
    });
    /*
    let response = {};
    let DocMovement = {};
    let Entity = {};

    if (!form) return response.Error = 'have not form';

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
    return response;*/
};

async function deleteDoc(formName, data) {
    return await Func.deleteDoc({
        moduleName: ModuleName,
        Forms,
        formName,
        data
    })
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
    getFormList, //Получить список форм модуля в виде массива 
    getFormsReestr, //Получить id, Name, form форм в виде массива 
    getDocReestr, //Получить реестр данных из таблицы по form
    getDoc, //Получить документ по id и form в виде DocMovement, Entity
    getTableList, //Таблицы модуля
    setDoc, //Записать документ в БД
    deleteDoc, //Удалить документ
    Forms
};