const Forms = require('./forms.js');
const Tables = require('./tables.js');
const pg = require('./../../scripts/pg.js');

const ModuleName = 'session';
const Description = 'Модуль администрирования сессий пользователей и клиентов';

function getFormList() {
    return Object.keys(Forms);
};

async function getFormsReestr() {
    return [];
};

async function getDocReestr(form) {
    const Form = new Forms[form]({
        id: 1
    });
    const response = await pg.findAll({
        Schema: ModuleName,
        TableName: Form.TableName,
        ColumnList: Form.ColumnList
    });

    return response;
};

async function getDoc(form, id) {

}

function getTableList() {
    return Object.keys(Tables);
};

async function setDoc(form, data, UserInfo) {
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
    return response;
};

async function deleteDoc(form, data) {};

async function getUserSessionInfo(UserAuthID) {
    //Ищем токен в БД
    const Form = new Forms.Entity({
        id: 1
    });
    const sessionRows = await pg.findAll({
        Schema: ModuleName,
        TableName: 'Entity',
        ColumnList: Form.ColumnList
    });
    //console.log('sessionRows=', sessionRows);
    const sessionRow = sessionRows.find(row => row.Token == UserAuthID);
    //console.log('sessionRow=',sessionRow);

    return sessionRow;
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
    getUserSessionInfo, //Информация о сессии пользователя
    Forms
}