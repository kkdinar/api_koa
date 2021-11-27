const pg = require('./../scripts/pg.js');

function getFormsReestr({
    Forms,
    formList
}) {
    let response = [];
    let id = 1;
    //Собираем информацию о формах модуля
    formList.forEach((formName) => {
        const Form = new Forms[formName]({
            id: 1
        });
        const obj = {
            id: id,
            Name: Form.FormDescription,
            form: formName,
            DisplayForm: Form.DisplayForm //Отображать форму в меню
        };
        response.push(obj);
        id = id + 1;
    });
    return response;
};

async function getDocReestr({
    moduleName,
    Forms,
    formName
}) {
    let _formName = formName;
    try {
        const Form = new Forms[formName]({
            id: 1
        });
        //Если это форма реестра
        if (Form.ReestrForForm) _formName = Form.ReestrForForm;
        const Where = [{
            Column_Name: 'form',
            Column_Value: _formName,
            Operation: '='
        }]
        let rows = await pg.findAll({
            Schema: moduleName,
            TableName: Form.TableName,
            ColumnList: Form.ColumnList,
            Where: Where
        });
        rows.forEach(row => row.form = formName);
        return rows;
    } catch (error) {
        throw new Error(error.message);
    };
};


async function getDoc({
    moduleName,
    Forms,
    formName,
    id
}) {
    //console.log('moduleName,formName,id=', moduleName, formName, id);
    let DocMovement = {};
    let Entity = [];
    try {

        let rows = [];

        let Form = new Forms[formName]({
            id: 1
        });
        const row = await pg.findByID({
            Schema: moduleName,
            TableName: Form.TableName,
            ColumnList: Form.ColumnList,
            id
        });
        //console.log('row=',row);
        if (row) {
            const docMovement = new Forms[formName](row);
            Form.ColumnList.forEach((key) => {
                DocMovement[key] = docMovement[key].Value;
            });
            DocMovement.FormName = docMovement.FormName;
            //console.log('DocMovement=', DocMovement);

            const entityForm = docMovement.EntityForm;
            //console.log('entityForm=',entityForm);
            if (entityForm) {
                const EntityForm = new Forms[entityForm]({
                    id: 1
                });
                rows = await pg.findAll({
                    Schema: moduleName,
                    TableName: EntityForm.TableName,
                    ColumnList: EntityForm.ColumnList
                });
                //console.log('rows=', rows);
                rows = rows.filter(row => row.Parent == id);
                rows.forEach((row) => {
                    const entity = new Forms[entityForm](row);
                    let _Entity = {};
                    EntityForm.ColumnList.forEach((key) => {
                        _Entity[key] = entity[key].Value;
                    });
                    _Entity.FormName = entity.FormName;
                    Entity.push(_Entity);
                });
            };
        };

    } catch (error) {
        throw new Error(error.message);
    }
    return {
        DocMovement,
        Entity
    };
};


async function setDoc({
    moduleName,
    Forms,
    formName,
    data,
    UserInfo
}) {
    let DocMovement = {};
    let Entity = {};
    //console.log('data=',data);
    //console.log('UserInfo=', UserInfo);
    try {
        const Form = new Forms[formName]({
            id: 1
        });
        //Если нет данных - просто создаём новый документ
        if (!data) {
            let docMovement = new Forms[formName]({
                id: 1
            });
            const id = await pg.getNextID({
                Schema: moduleName,
                TableName: docMovement.TableName
            });
            docMovement = new Forms[formName]({
                id
            });
            docMovement.rcu = UserInfo.id;
            docMovement.ruu = UserInfo.id;
            docMovement.rco = UserInfo.Contractor_id;
            docMovement.ruo = UserInfo.Contractor_id;
            docMovement.form = formName;
            const Content = {
                Schema: moduleName,
                TableName: docMovement.TableName,
                Form: docMovement
            };
            //console.log('docMovement=', docMovement);
            DocMovement = await pg.insertRow(Content);
        } else { //Если есть данные - записываем их в БД
            if (data.DocMovement) {
                if (!data.DocMovement.id) {
                    let docMovement = new Forms[formName]({
                        id: 1
                    });
                    const id = await pg.getNextID({
                        Schema: moduleName,
                        TableName: docMovement.TableName
                    });
                    data.DocMovement.id = id;
                    docMovement = new Forms[formName](data.DocMovement);
                    docMovement.rcu = UserInfo.id;
                    docMovement.ruu = UserInfo.id;
                    docMovement.rco = UserInfo.Contractor_id;
                    docMovement.ruo = UserInfo.Contractor_id;
                    docMovement.form = formName;
                    const Content = {
                        Schema: moduleName,
                        TableName: docMovement.TableName,
                        Form: docMovement
                    };
                    //console.log('docMovement=', docMovement);
                    DocMovement = await pg.insertRow(Content);
                    DocMovement.FormName = docMovement.FormName;
                } else {
                    const docMovement = new Forms[formName](data.DocMovement);
                    docMovement.rut = null;
                    docMovement.ruu = UserInfo.id;
                    docMovement.ruo = UserInfo.Contractor_id;
                    docMovement.form = formName;
                    const Content = {
                        Schema: moduleName,
                        TableName: docMovement.TableName,
                        ColumnList: docMovement
                    };
                    //console.log('Content=', Content);
                    DocMovement = await pg.updateRow(Content);
                    DocMovement.FormName = docMovement.FormName;
                };
            };
            const entityForm = Form.EntityForm;
            if (entityForm && data.Entity) {
                for await (const row of data.Entity) {
                    row.Parent = DocMovement.id ? DocMovement.id : row.Parent;
                    if (!row.Parent) throw new Error('have not Entity.Parent');
                    //return response.Error = 'have not Entity.Parent';

                    if (!row.id) {
                        let entity = new Forms[entityForm]({
                            id: 1
                        });
                        const id = await pg.getNextID({
                            Schema: moduleName,
                            TableName: entity.TableName
                        });
                        row.id = id;
                        entity = new Forms[entityForm](row);
                        entity.rcu = UserInfo.id;
                        entity.ruu = UserInfo.id;
                        entity.rco = UserInfo.Contractor_id;
                        entity.ruo = UserInfo.Contractor_id;
                        entity.form = entityForm;
                        const Content = {
                            Schema: moduleName,
                            TableName: entity.TableName,
                            Form: entity
                        };
                        Entity = await pg.insertRow(Content);
                        Entity.FormName = entity.FormName;
                    } else {
                        const entity = new Forms[entityForm](row);
                        entity.rut = null;
                        entity.ruu = UserInfo.id;
                        entity.ruo = UserInfo.Contractor_id;
                        entity.form = entityForm;
                        const Content = {
                            Schema: moduleName,
                            TableName: entity.TableName,
                            ColumnList: entity
                        };
                        //console.log('entity=',entity);
                        Entity = await pg.updateRow(Content);
                        Entity.FormName = entity.FormName;
                    };
                };
            };
        };

    } catch (error) {
        throw new Error(error.message);
    };
    //console.log('Entity=',Entity);
    return {
        DocMovement,
        Entity
    };
};


async function deleteDoc({
    moduleName,
    Forms,
    formName,
    data
}) {
    let response;
    let arr;
    //console.log('moduleName,formName,data=',moduleName,formName,data);
    try {
        const docMovement = new Forms[formName]({
            id: 1
        });
        const entityForm = docMovement.EntityForm;
        //TODO: доделать рекурсивное удаление всех вложенных EntityForm

        if (data.DocMovement) {
            if (entityForm) { //Если у модуля есть Entity, сначала удаляем строки оттуда    
                const entity = new Forms[entityForm]({
                    id: 1
                });
                const entityRows = await pg.findAll({
                    Schema: moduleName,
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
                        Schema: moduleName,
                        TableName: entity.TableName,
                        ColumnList: entityRowsToDelete
                    };
                    //console.log('Content=', Content);
                    await pg.deleteRow(Content);
                };
            };
            if (!Array.isArray(data.DocMovement)) arr = [data.DocMovement]
            else arr = data.DocMovement;
            const Content = {
                Schema: moduleName,
                TableName: docMovement.TableName,
                ColumnList: arr
            };
            response = await pg.deleteRow(Content);
        };
        if (data.Entity) {
            //console.log('data.Entity=', data.Entity);
            const entity = new Forms[entityForm]({
                id: 1
            });
            const Content = {
                Schema: moduleName,
                TableName: entity.TableName,
                ColumnList: data.Entity
            };
            response = await pg.deleteRow(Content);
        };
    } catch (error) {
        throw new Error(error.message);
    }
    return response;
};

module.exports = {
    getFormsReestr,
    getDocReestr,
    getDoc,
    setDoc,
    deleteDoc
};