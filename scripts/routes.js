const pg = require('./pg.js');
const fs = require('fs');
const path = require('path');
//const util = require('util');
//const exec = util.promisify(require('child_process').exec);
const config = require('.././config.js');
const crypto = require('crypto');
//const {    Module} = require('module');

const superUser = config.superUser;

/**
 * route module.
 * @module route
 */
module.exports.get_api = (ctx) => {
    ctx.body =
        `<html>
    <head>
     <meta http-equiv="content-type" content="text/html; charset=utf-8">
     <title>Ассистент сервер</title>
    </head>
    <body>
     <p>"Ассистент - удобный доступ к Вашим данным"</p>
     <p>"Сервер Ассистент запущен"</p>
     <p>При добавлении столбцов обновить column.js,basetable.js</p>
     <p><a href="api">Тест get</a></p>
     <p><a href="migrateDB">Создание таблиц</a></p>
     <p><a href="btreeFromWeb">Обновление BTree с сайта</a></p>
     <p><a href="visualization">Визуализация таблиц</a></p>
    </body>
   </html>`
};

/**
 * Получение данных из БД
 * @param {string} module - Наименование модуля(схемы)
 * @param {string} form - Наименование формы (module.FormList)
 * @param {BigInt} id - Порядковый номер документа 
 */
module.exports.get = async (ctx) => {
    console.log('get.query=', ctx.query);
    //let where = {};
    let response = {
        DocMovement: {},
        Entity: []
    };

    //try {
    const module = ctx.query.module;
    const form = ctx.query.form;
    const id = ctx.query.id;
    const UserAuthID = ctx.query.UserAuthID ? ctx.query.UserAuthID : null;
    const params = {
        module,
        form,
        id,
        UserAuthID
    };
    //Информация о сессии пользователя
    const UserInfo = await UserInfo_get(params);
    //console.log('UserInfo=', UserInfo);

    if (UserInfo.Error) response.Error = UserInfo.Error
    else if (!module) {
        //Список установленных модулей
        const moduleReestr = await getModuleReestr();
        if (moduleReestr.Error) response.Error = moduleReestr.Error
        else if (UserInfo.superUser) response = moduleReestr
        else {
            //Фильтр по модулям
            moduleReestr.Entity.forEach((row) => {
                //console.log('UserInfo.modulesHaveRightToRead=',UserInfo.modulesHaveRightToRead);
                //console.log('row=',row);
                const haveRightTomodule = UserInfo.modulesHaveRightToRead.some(r => r == row.module);
                if (haveRightTomodule && row) response.Entity.push(row);
            });
        };
    } else {
        //Данные форм модуля
        const Form = await getForm(params);
        if (Form.Error) response.Error = Form.Error
        else if (UserInfo.superUser) response = Form
        else { //Фильтр по формам
            const filteredForm = await filterByRights(Form, UserInfo);
            //console.log('filteredForm=',filteredForm);
            if (filteredForm.Error) response.Error = filteredForm.Error;
            else {
                const filteredFormAndData = await filterByDataRights(filteredForm, UserInfo);
                response = filteredFormAndData;
            }
        };
    }
    // console.log('response=', response);
    //} catch (error) {
    //    response.Error = error.message;
    //};

    //Преобразуем JSON в текст
    ctx.response.body = JSON.stringify(response);
};

async function getModuleReestr() {
    let Entity = [];
    let id = 1;
    const assistant_modules = config.assistant_modules;
    for await (const module of assistant_modules) {
        const Module = require('./../assistant_modules/' + module + '/module.js');
        const obj = {
            id,
            Name: Module.Description,
            Description: module,
            module: module
        }
        id = id + 1;
        Entity.push(obj);
    };
    const response = {
        DocMovement: {},
        Entity: Entity
    };
    return response;
}

async function filterByRights(Form, UserInfo) {
    let DocMovement = {};
    let Entity = [];
    let haveRightToForm;

    //console.log('filterByRights_FORM=',Form);

    if (Form.DocMovement) {
        haveRightToForm = UserInfo.formsHaveRightToRead.some(r => r == Form.DocMovement.FormName);
        if (haveRightToForm) DocMovement = Form.DocMovement;
    };
    if (Form.Entity) {
        Form.Entity.forEach((row) => {
            haveRightToForm = UserInfo.formsHaveRightToRead.some(r => r == row.form);
            if (haveRightToForm) Entity.push(row);            
            haveRightToForm = UserInfo.formsHaveRightToRead.some(r => r == row.FormName);
            if (haveRightToForm) Entity.push(row);
        });
    };
    //console.log('Entity=',Entity);
    const response = {
        DocMovement,
        Entity
    };
    return response;
};

async function filterByDataRights(Form, UserInfo) {
    let DocMovement = {};
    let Entity = [];
    //console.log('Form=', Form);

    if (Form.DocMovement) {
        haveRightToForm = UserInfo.dataCanRead.some(r => r.form == Form.DocMovement.FormName);
        if (haveRightToForm) DocMovement = Form.DocMovement;
    };
    if (Form.Entity) {
        Form.Entity.forEach((row) => {
            UserInfo.dataCanRead.forEach((Data) => {
                //console.log('Data=',Data);
                if (Data.Active) {//Если фильтр включен
                    //Список столбцов, к которым нужно добавить '_id'
                    const columnHaveID = ['Contractor'];
                    let Column_Name = Data.Column_Name;
                    if (columnHaveID.some(r => r = Data.Column_Name)) Column_Name = Column_Name + '_id';
                    //форма точно разрешена,проверить только поля
                    const keys = Object.keys(row);
                    //if (row.form == Data.form && (keys.some(r => r = Column_Name))) {
                    //Если В этой форме есть разрешённое поле, то можно по нему фильтровать
                    if (row.form == Data.form && row[Column_Name]) {
                        //console.log('Column_Name=',row[Column_Name],'Column_Value=',Data.Column_Value);
                        //проверяем значение поля
                        if (Data.Operation == '=' && row[Column_Name] == Data.Column_Value) Entity.push(row);
                        if (Data.Operation == '>' && row[Column_Name] > Data.Column_Value) Entity.push(row);
                        if (Data.Operation == '<' && row[Column_Name] < Data.Column_Value) Entity.push(row);
                    } else Entity.push(row);
                } else Entity.push(row);
            });
        });
    };
    const response = {
        DocMovement,
        Entity
    };
    return response;
}

module.exports.post = async (ctx) => {
    console.log("post_body:", ctx.request.body);
    let response = {};

    try {
        const module = ctx.request.body.module;
        const form = ctx.request.body.form;
        const data = ctx.request.body.data; //{} с полями и их значениями
        const UserAuthID = ctx.request.body.UserAuthID;
        const params = {
            module,
            form,
            UserAuthID,
            data,
            UserInfo: null
        };

        if (module == 'session') response = await auth(data);
        else {
            const UserInfo = await UserInfo_get(params);
            params.UserInfo = UserInfo;
            if (UserInfo.Error) response.Error = UserInfo.Error
            else {
                const haveRight = UserInfo.formsHaveRightToWrite.some(r => r == form);

                if (!haveRight && !UserInfo.superUser) response.Error = 'Нет прав';
                else if (module && form) response = await addData(params);
                else response.Error = 'no module or form';
            };
        };
    } catch (error) {
        response.Error = error.message;
    }

    //Преобразуем JSON в текст
    ctx.response.body = JSON.stringify(response);
};

async function auth(data = {}) {
    let response = {};
    let _data = {};

    let Module = require('./../assistant_modules/dictionary/module.js');
    const UserForm = await Module.getDocReestr('UserForm');
    //Ищем id в таблице User по Login и Password
    const correctUser = UserForm.find(row => row.Login == data.Login && row.Password == data.Password);
    if (!correctUser) throw new Error('Error login or password');

    //Ищем код DocMovement по данному correctUser
    Module = require('./../assistant_modules/session/module.js');
    const sessionDocMovement = await Module.getDocReestr('DocMovement');
    //console.log('sessionDocMovement=',sessionDocMovement);
    let rowDocMovement = sessionDocMovement.find(row => row.User_id == correctUser.id);

    //Генрируем токен
    const Token = await crypto.randomBytes(64).toString('hex');
    const DateBegin = (new Date()).getTime();
    const timeToLife = 10000000000;
    let DateEnd = DateBegin + timeToLife;
    DateEnd = toDate(new Date(DateEnd));

    //Если в таблице DocMovement нет такого correctUser - создаём
    if (!rowDocMovement) {
        _data = {
            DocMovement: {
                User_id: correctUser.id,
                Type: 'User',
                Name: correctUser.Login
            },
            Entity: [{
                Token: Token,
                User_id: correctUser.id,
                DateEnd: DateEnd
            }]
        };
        rowDocMovement = await Module.setDoc('DocMovement', _data, correctUser);
        //console.log('rowDocMovement=',rowDocMovement);
    }
    _data = {
        Entity: [{
            Parent: rowDocMovement.id,
            Token: Token,
            User_id: correctUser.id,
            DateEnd: DateEnd
        }]
    };
    //Можно не ждать записи, без await
    rowDocMovement = Module.setDoc('DocMovement', _data, correctUser);
    //console.log('rowDocMovement=',rowDocMovement);

    response.Token = Token;

    return response;
};

toDate = (d) => {
    let date = new Date(d);
    let month = date.getMonth() + 1;
    //console.log('date=', date.getDate() + '.' + month + '.' + date.getFullYear());
    return date.getFullYear() + '-' + month + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
};

async function addData({
    module,
    form,
    data,
    UserInfo
} = {}) {
    let response = {};

    const Module = require('./../assistant_modules/' + module + '/module.js');
    const haveForm = Module.getFormList().some(r => r == form);
    if (!haveForm) return response.Error = 'have not form';

    response = await Module.setDoc(form, data, UserInfo);
    //console.log('response=',response);
    return response;
};

module.exports.delete = async (ctx) => {
    console.log("delete.query:", ctx.request.body);
    let response = {};
    //try {
    const module = ctx.request.body.module;
    const form = ctx.request.body.form;
    const data = ctx.request.body.data; //{DocMovement:[], Entity:[]} 
    const UserAuthID = ctx.request.body.UserAuthID;

    const UserInfo = await UserInfo_get({
        UserAuthID
    });

    if (UserInfo.Error) response.Error = UserInfo.Error
    else {
        const haveRight = UserInfo.formsHaveRightToWrite.some(r => r == form);

        if (!haveRight && !UserInfo.superUser) response.Error = 'Нет прав';
        else {

            const Module = require('./../assistant_modules/' + module + '/module.js');
            const haveForm = Module.getFormList().some(r => r == form)
            if (!haveForm) return response.Error = 'have not form';

            response = await Module.deleteDoc(form, data);
        };

    };
    //} catch (error) {
    //    response.Error = error.message;
    //}

    //console.log("delete_response:", response);
    ctx.response.body = response;
};

module.exports.post_upload = async (ctx) => {
    //console.log('ctx.file=', ctx);
    let response = {};

    const UserAuthID = ctx.request.header.userauthid;
    const UserInfo = await UserInfo_get({
        UserAuthID
    });

    if (UserInfo.Error) response.Error = UserInfo.Error
    else {
        //Определяем тип загружаемого файла
        const fileName = ctx.file.originalname;
        let type = 'file';
        const extname = path.extname('./../uploads/' + fileName);
        const doc = ['.doc', '.docx', '.txt', '.pdf', '.rtf', '.xls', '.xlsx', '.html', '.odt', '.djvu', '.mobi', '.epub', '.fb2', '.pptx', '.ppt'];
        if (doc.some(r => r == extname)) type = 'document';
        const img = ['.psd', '.tiff', '.bmp', 'jpeg', '.jp2', 'j2k', 'jpf', '.jpm', '.jpg2', '.j2c', 'jpc', '.jxr', '.hdp', '.wdp', '.gif', '.eps', '.png', '.pcx', '.ico', '.cdr', '.ai', '.raw', '.svg'];
        if (img.some(r => r == extname)) type = 'image';

        const Module = require('./../assistant_modules/filestorage/module.js');
        const data = {
            DocMovement: {
                Name: fileName,
                Size: ctx.file.size,
                Type: type,
                User_id: UserInfo.id,
                User_Name: UserInfo.Name
            }
        };
        //console.log('data=', data);
        response = await Module.setDoc('FileStorage', data, UserInfo);
        //console.log('response=', response);

        const before = path.join('./uploads/', fileName);
        const newDir = path.join('./uploads/', response.DocMovement.id);
        const after = path.join(newDir, '/', fileName);

        await fs.promises.mkdir(newDir);
        //console.log('answer=', answer);
        await fs.promises.copyFile(before, after);
        //Удаляем файл
        fs.unlink(before, (err) => {
            if (err) throw err;
        });
    };
    ctx.response.body = response;
};

module.exports.download = async (ctx) => {
    console.log('ctx.query=', ctx.query);
    let response = {};

    try {
        const module = ctx.query.module;
        const form = ctx.query.form;
        const id = ctx.query.id;
        const UserAuthID = ctx.query.UserAuthID ? ctx.query.UserAuthID : null;
        const params = {
            module,
            form,
            id,
            UserAuthID
        };
        response = await getForm(params);
        //console.log('response=',response);

        //Информация о сессии пользователя
        const UserInfo = await UserInfo_get(params);
        //console.log('UserInfo=', UserInfo);

        if (UserInfo.Error) ctx.response.body = {
            Error: UserInfo.Error
        };
        else {
            const haveRightModule = UserInfo.modulesHaveRightToRead.some(r => r == module)
            const haveRightForm = UserInfo.formsHaveRightToWrite.some(r => r == form);

            if (!UserInfo.superUser && !haveRightModule && !haveRightForm) ctx.response.body = {
                Error: 'Нет прав'
            }
            else {
                //Путь к файлу на сервере
                const filePath = path.join('./uploads/', id, response.DocMovement.Name);
                //Ответ - ОК
                ctx.status = 200;
                //Читаем содержимое файла
                ctx.body = await fs.promises.readFile(filePath);
                //Устанавливаем в заголовке нужные данные для обозначения, что мы отправляем файл
                ctx.attachment(filePath);
            };
        };
    } catch (error) {
        console.log('error=', error);
    }
};

module.exports.migrateDB = async (ctx) => {
    let response = {};
    let resp = [];

    let assistant_modules = config.assistant_modules;

    for await (const _module of assistant_modules) {

        //Перебираем объекты из файла модуля module.js
        const Module = require('./../assistant_modules/' + _module + '/module.js');

        //Добавляем новую схему
        const SchemaName = Module.ModuleName;
        response = await schema_add([SchemaName]);
        resp.push(response);

        //Перебираем таблицы из модуля
        const TableList = Module.getTableList();
        const Table = require('./../assistant_modules/' + _module + '/tables.js');
        //const dicList = Object.keys(dictionaryModels);
        for await (const tableName of TableList) {
            //console.log('tableName=',tableName);
            const TableModel = new Table[tableName]({
                id: 1
            });
            //console.log('TableModel=',TableModel);

            //Добавляем таблицу в новой схеме
            response = await table_add([{
                SchemaName: SchemaName,
                TableModel: TableModel
            }]);
            resp.push(response);

            //Добавляем столбцы в новой схеме        
            response = await column_add([{
                SchemaName: SchemaName,
                TableModel: TableModel
            }]);
            resp.push(response);
        };
    };
    //Создаём справочники по умолчанию
    await createDictionary();

    //Преобразуем JSON в текст
    ctx.response.body = JSON.stringify(resp);
};

// /**
//  * btreeFromWeb
//  * Заполнение BTree на оснофе объектов модулей, таблиц, web form
//  * Автор Маликов А.В. 17.11.2021
//  */
// module.exports.btreeFromWeb = async (ctx) => {
//     let response = {};
//     let resp = [];

//     let assistant_modules = config.assistant_modules;

//     for await (const _module of assistant_modules) {

//         //Перебираем объекты из файла модуля module.js
//         const Module = require('./../assistant_modules/' + _module + '/module.js');

//         //Проверяем наличие схемы 

//         let response = {};
//         let resp = [];


//         //Узнаём  информацию о схеме в БД
//         const SchemaName = Module.ModuleName;
//         const Content = {
//             Type: 'schema',
//             Name: SchemaName
//         };
//         const db_schemaInfo = await pg.dbInfo(Content);
//         //console.log('db_schemaInfo=', db_schemaInfo);
//         //Если схемы нет - дерево заполнять нечем
//         if (db_schemaInfo.Exists) {
//             // console.log('db_schemaInfo=', db_schemaInfo);       


//             // response = await schema_add([SchemaName]);
//             // resp.push(response);

// const BtreeModule = require('../assistant_modules/dictionary/BTree.js');
// const Btree = new BtreeModule();
//             const pgSQL = Btree.pgSQL;
//             Btree.func(param);
//             const pgSQL1 = `
//             DO $$
//             DECLARE s integer;
//             BEGIN
//                 select last_value into s from userdocright."BTree_id_seq";
//                 if s<100 then
//                 SELECT setval('userdocright."BTree_id_seq"',100)  into s ;
//                 end if;
//             END $$;
//             `
//             const TableList = Module.getTableList();
//             // Если в модуле есть таблица с именем BTree то приступим к ее заполнению
//             if (TableList.includes('BTree')) {
//                 //Проверим наполнение системными папками для группировки сущностей


//                 const Table = require('./../assistant_modules/' + _module + '/tables.js');
//                 let form = {} //new Table['BTree']({ id: 1 });
//                 form.ColumnList = ['id', 'TypeNode', 'BTree_id', 'Name', 'Description']
//                 form.id = {
//                     Default: '',
//                     Value: [1]
//                 };
//                 form.TypeNode = {
//                     Default: '',
//                     Value: 1
//                 };
//                 form.BTree_id = {
//                     Default: '',
//                     Value: null
//                 };
//                 form.Name = {
//                     Default: '',
//                     Value: Module.ModuleName
//                 };
//                 form.Description = {
//                     Default: '',
//                     Value: Module.Description
//                 };
//                 const Options = 'ON CONFLICT (id) DO NOTHING';
//                 // console.log('form=', form);


//                 response = await pg.insertRow({
//                     Schema: SchemaName,
//                     TableName: 'BTree',
//                     Form: form,
//                     Options: Options
//                 });
//                 // console.log('response=', response);
//                 // const UserAuthID = ctx.query.UserAuthID ? ctx.query.UserAuthID : null;
//                 // console.log('ctx=',ctx)

//                 let sqlSript = pgSQL.replace('userdocright', Module.ModuleName)
//                 response = await pg.pgExecScript({
//                     query: sqlSript
//                 });
//                 // console.log('response=', response);

//                 sqlSript = pgSQL1.replace('userdocright', Module.ModuleName)
//                 response = await pg.pgExecScript({
//                     query: sqlSript
//                 });
//                 // console.log('response=', response);

//                 //Перебираем таблицы из модуля   
//                 //const dicList = Object.keys(dictionaryModels);
//                 for await (const tableName of TableList) {
//                     //console.log('tableName=',tableName);



//                     const TableModel = new Table[tableName]({
//                         id: 1
//                     });
//                     //console.log('TableModel=',TableModel);

//                     //Добавляем таблицу в новой схеме
//                     response = await table_add([{
//                         SchemaName: SchemaName,
//                         TableModel: TableModel
//                     }]);
//                     resp.push(response);

//                     //Добавляем столбцы в новой схеме        
//                     response = await column_add([{
//                         SchemaName: SchemaName,
//                         TableModel: TableModel
//                     }]);
//                     resp.push(response);
//                 };
//             };
//         }
//     };
//     //Преобразуем JSON в текст
//     ctx.response.body = JSON.stringify(resp);
// };

/**
 * Проверка наличия в БД схемы и создание её при отсутствии
 * @param {Object[]} schemaModels объект класса Schema 
 * @returns {Object.<string, string>} - информация: Message или Error.
 */
async function schema_add(schemaNames = []) {
    let response = {};
    let resp = [];

    for await (const SchemaName of schemaNames) {
        //Узнаём  информацию о схеме в БД
        const Content = {
            Type: 'schema',
            Name: SchemaName
        };
        const db_schemaInfo = await pg.dbInfo(Content);
        //console.log('db_schemaInfo=', db_schemaInfo);
        //Еслисхемы нет - создаём
        if (!db_schemaInfo.Exists) {
            response = await pg.createSchema({
                Name: SchemaName
            });
            resp.push(response);
        };
    };
    return response = resp;
};

/**
 * Создание таблицы в БД если её нет
 * @param {Object[]} tableModels - объекты классов Schema и Table
 * @returns {Object.<string, string>} - информация: Message или Error.
 */
async function table_add(tableModels = []) {
    let response = {};
    let resp = [];

    for await (const tab of tableModels) {
        let tableModel = tab.TableModel;
        tableModel.SchemaName = tab.SchemaName;

        //Узнаём  информацию о таблице в БД
        const Content = {
            Type: tableModel.TableType,
            Schema: tableModel.SchemaName,
            Name: tableModel.TableName
        };
        //console.log('Content=',Content);

        const db_tableInfo = await pg.dbInfo(Content);
        //console.log('db_tableInfo=',db_tableInfo);
        //if(tableModel.SchemaName=='filestorage')console.log('db_tableInfo=',db_tableInfo);

        //Если таблицы нет - создаём
        if (!db_tableInfo.Exists) {
            const Entity = {
                Type: tableModel.TableType,
                Schema: tableModel.SchemaName,
                Name: tableModel.TableName,
                Method: 'create',
                TableModel: tableModel
            };
            //console.log('Entity=',Entity);
            response = await pg.entityChange(Entity);
            resp.push(response);
        };
    };
    return response;
};

/**
 * Создание столбцы таблицы в БД если их нет
 * @param {Object[]} tableModels - объекты классов Schema и Table
 * @returns {Object.<string, string>} - информация: Message или Error.
 */
async function column_add(tableModels = []) {
    let response = {};
    let resp = [];
    let columnList = [];

    for await (const tableModel of tableModels) {
        //TODO: доделать альтер вьюшек.
        //Для вьюшек поля не проверяем.
        if (tableModel.TableModel.TableType == 'view') return;
        //Узнаём информацию какие столбцы надо создать
        const columnList_needAdd = tableModel.TableModel.ColumnList;
        //console.log('tableModel.TableModel.TableName=',tableModel.TableModel.TableName);

        //Узнаём  информацию о таблице в БД и о её полях
        const Content = {
            Type: 'table',
            Schema: tableModel.SchemaName,
            Name: tableModel.TableModel.TableName
        };

        //if(tableModel.TableModel.TableName == 'Form_Name')console.log('Content=',Content);

        const db_tableInfo = await pg.dbInfo(Content);
        //if(tableModel.SchemaName == 'request')console.log('db_tableInfo=',db_tableInfo);

        for await (const column of columnList_needAdd) {
            //Есть ли столбец в таблице в БД
            const haveColumn = db_tableInfo.columnList.some(row => row.column_name == column);
            //Если столбца в таблице в БД нет - добавляем
            if (!haveColumn) columnList.push(column);
        };

        // console.log('tableModel.TableName=',tableModel.TableModel.TableName);
        //if(tableModel.TableModel.TableName == 'User')console.log('tableModel.TableName=',tableModel.TableModel.Email);

        const Entity = {
            Type: 'table',
            Method: 'alter',
            Schema: tableModel.SchemaName,
            Name: tableModel.TableModel.TableName,
            columnList: columnList,
            TableModel: tableModel.TableModel
        };
        //console.log('Entity=',Entity);
        response = await pg.entityChange(Entity);
        resp.push(response);
    };

    return response = resp;
};


async function getForm({
    module = null,
    form = null,
    id = null
} = {}) {
    let DocMovement = {};
    let Entity = [];
    let Error = null

    const Module = require('./../assistant_modules/' + module + '/module.js');
    if (form) {
        const haveForm = Module.getFormList().some(r => r == form);
        if (!haveForm) Error = 'have not form';
    }

    if (!form) { //Список форм 
        const entity = await Module.getFormsReestr();
        if (entity.Error) Error = entity.Error
        else Entity = entity;

    } else if (form && !id) { //Реестр 
        const entity = await Module.getDocReestr(form);
        if (entity.Error) Error = entity.Error
        else Entity = entity;

    } else if (form && id > 0) { //Документ
        const data = await Module.getDoc(form, id);
        //console.log('data=',data);
        if (data.Error) Error = data.Error
        else {
            DocMovement = data.DocMovement;
            Entity = data.Entity;
        };
    };
    const response = {
        DocMovement,
        Entity,
        Error
    };
    //console.log('response=',response);

    return response;
};


async function UserInfo_get({
    UserAuthID = null
} = {}) {
    let response = {};
    if (!UserAuthID) return response = {
        Error: 'Token is expired'
    };
    //throw new Error('Token is expired');

    let Module = require('./../assistant_modules/session/module.js');
    const sessionRow = await Module.getUserSessionInfo(UserAuthID);

    //Проверяем просрочен ли переданный токен
    if (!sessionRow) return response = {
        Error: 'Token is expired'
    };
    //throw new Error('Token is expired');

    const now = (new Date()).getTime();
    const DateEnd = (sessionRow || {}).DateEnd.getTime();
    if (DateEnd > now) {
        //Обновляем DateEnd
        /*
        const DateBegin = (new Date()).getTime();
        const timeToLife = 10000000000;
        let DateEnd = DateBegin + timeToLife;
        DateEnd = toDate(new Date(DateEnd)); 
        sessionRow.DateEnd = DateEnd;
        //Записываем токен в БД в Entity
        Form = new ModuleSession.Entity(sessionRow);
        const Content = {
            Schema: ModuleSession.ModuleName,
            TableName: 'Entity',
            ColumnList: Form
        };
        response = await pg.updateRow(Content);
        */

        //Записываем сопоставление в глобальную переменную UserToken
        //UserToken[UserAuthID] = sessionRow.User_id;
        //console.log('UserToken[UserAuthID]=',UserToken[UserAuthID]);
    } else return response = {
        Error: 'Token is expired'
    };
    //throw new Error('Token is expired');

    Module = require('./../assistant_modules/dictionary/module.js');
    const UserDocMovement = await Module.getDoc('UserForm', sessionRow.User_id);
    let User = UserDocMovement.DocMovement;
    //console.log('User=',User);

    Module = require('./../assistant_modules/userdocright/module.js');
    const UserRights = await Module.getDocReestr('UserRight');
    //console.log('UserRights=',UserRights);
    const UserRight = UserRights.find(r => (r || {}).User_id == User.id);
    //console.log('UserRight=',UserRight);
    const UserRightEntity = await Module.getDocReestr('UserDataRight');
    //console.log('UserRightEntity=',UserRightEntity);

    const Rights = UserRightEntity.filter(r => r.Parent == (UserRight || {}).id);
    //console.log('Rights=',Rights);

    let modulesHaveRightToRead = [];
    let formsHaveRightToRead = [];
    let formsHaveRightToWrite = [];
    let dataCanRead = [];

    //Права пользователя на формы
    Rights.forEach((row) => {
        const haveModule = modulesHaveRightToRead.some(r => r == row.ModuleName);
        if (!haveModule) modulesHaveRightToRead.push(row.ModuleName);

        if (row.Write) {
            formsHaveRightToWrite.push(row.Form_Name);
            formsHaveRightToRead.push(row.Form_Name)
        } else formsHaveRightToRead.push(row.Form_Name);
    });

    //Права пользователя на данные
    const UserDataRights = await Module.getDocReestr('UserDataRight');
    //console.log('UserDataRights=',UserDataRights);
    const UserDataRight = UserDataRights.find(r => (r || {}).User_id == User.id);

    if (UserDataRight) { //Если фильтрация включена
        //console.log('UserDataRight=', UserDataRight);
        const UserDataRightEntitys = await Module.getDocReestr('UserDataRightEntity');
        const UserDataRightEntity = UserDataRightEntitys.filter(r => r.Parent == UserDataRight.id);
        //console.log('UserDataRightEntity=', UserDataRightEntity);
        if (UserDataRightEntity[0]) {
            UserDataRightEntity.forEach((row) => {
                dataCanRead.push({
                    form: UserDataRight.Form_Name,
                    Column_Name: row.Column_Name,
                    Operation: row.Operation,
                    Column_Value: row.Column_Value,
                    Active: UserDataRight.Active
                });
            });
        };
    };

    User.superUser = superUser.some(r => r == User.Login);
    User.modulesHaveRightToRead = modulesHaveRightToRead;
    User.formsHaveRightToRead = formsHaveRightToRead;
    User.formsHaveRightToWrite = formsHaveRightToWrite;
    User.dataCanRead = dataCanRead;

    //console.log('User=', User);
    return User;
};

async function createDictionary() {
    const dictionaryType = await pg.findAll({
        Schema: 'dictionary',
        TableName: 'DocMovement',
        ColumnList: ['DictionaryType']
    });
    const Module = require('./../assistant_modules/dictionary/module.js');
    const DictionaryTypeList = Module.DictionaryTypeList;
    const dictionaryTypeList = Object.keys(DictionaryTypeList);

    for await (dicType of dictionaryTypeList) {
        //console.log('dicType=',dicType, dictionaryType);
        const haveDictionaryType = dictionaryType.find(row => row.DictionaryType == dicType);
        if (!haveDictionaryType) {
            const form = 'DictionaryForm';
            const data = {
                DocMovement: {
                    DictionaryType: dicType,
                    Name: DictionaryTypeList[dicType]
                }
            };
            await Module.setDoc(form, data, {});
        };
    };
};

module.exports.visualization = async (ctx) => {
    //Читаем информацию из файла
    const style = await fs.promises.readFile("./visual/style.css");
    const treeData = await fs.promises.readFile("./visual/treeData.js");
    const fullTreeScriptLib = await fs.promises.readFile("./visual/fullTreeScriptLib.js");
    ctx.body =
        `<html>
<head>
 <meta http-equiv="content-type" content="text/html; charset=utf-8">
 <title>Ассистент сервер</title>
</head>
<style>` + style + `</style>
<body>
<script src="http://d3js.org/d3.v3.min.js"></script>
<script>` + treeData + `</script>
<script>` + fullTreeScriptLib + `</script>
</body>
</html>`
};